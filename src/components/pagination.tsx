"use client";
import React, { useEffect } from "react";
import Fixture from "./fixture";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const Pagination = ({ fixtureArr }: PaginationProps) => {
  const [page, setPage] = React.useState(1);
  const [fixtures, setFixtures] = React.useState(fixtureArr.slice(0, 10));
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredFixtures = fixtureArr
      .filter((fixture) => {
        return (
          fixture.teams.home.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          fixture.teams.away.name.toLowerCase().includes(search.toLowerCase())
        );
      })
      .slice(0, 10);
    setFixtures(filteredFixtures);

    if (search === "") {
      setFixtures(fixtureArr.slice(0, 10));
    }
  };

  useEffect(() => {
    setFixtures(fixtureArr.slice(page * 10 - 10, page * 10));
  }, [page]);

  const handlePage = (page: number) => {
    if (page % 1 === 0.5) {
      page = page + 0.5;
    }
    if (page < 1) setPage(1);
    else if (page > fixtureArr.length / 10) setPage(fixtureArr.length / 10);
    else setPage(page);
  };

  return (
    <div>
      <div className="md:w-1/3 w-8/12 mx-auto my-2">
        <input
          className="text-black w-full p-2 rounded-sm"
          type="text"
          placeholder="Search fixtures by team"
          onChange={(e) => {
            handleSearch(e);
          }}
        ></input>
      </div>
      <div className="md:w-1/2 flex flex-wrap mx-auto  justify-around overflow-hidden">
        <AnimatePresence>
          {fixtures.map((event, i) => {
            if (i < 10) {
              return (
                <motion.div
                  initial={{
                    // x: 10,
                    backdropFilter: "blur(0px)",
                    filter: "blur(8px)",
                    zIndex: -1,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    // x: 0,
                    backdropFilter: "blur(4px)",
                    zIndex: 0,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  key={event.fixture.id}
                  className=" shadow-md shadow-black/20 md:w-5/12 w-8/12 rounded-md my-1 cursor-pointer overflow-hidden bg-[#77ACA2]/50 border border-white/30 h-[17vh] hover:bg-yellow-200/10 duration-200 ease-in-out transition"
                >
                  <Link
                    href={`/fixtures/${event.fixture.id}`}
                    className=" inline-block w-full h-full"
                  >
                    <Fixture
                      fixture={event.fixture}
                      teams={event.teams}
                      goals={event.goals}
                      key={i}
                    />
                  </Link>
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
      </div>
      <div className="md:w-3/12 w-7/12 flex justify-between mx-auto">
        <button
          className="bg-[#77ACA2]/50 border-2 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md px-3 py-1 "
          onClick={() => {
            handlePage(page - 1);
          }}
        >
          Page -
        </button>
        <h3 className="bg-[#77ACA2]/50 border-2 border-white/30  rounded-md px-3 py-1">
          {page}
        </h3>
        <button
          className="bg-[#77ACA2]/50 border-2 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md px-3 py-1"
          onClick={() => {
            handlePage(page + 1);
          }}
        >
          Page +
        </button>
      </div>
    </div>
  );
};

export default Pagination;
