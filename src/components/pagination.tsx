"use client";
import React, { use, useEffect, useState } from "react";
import Fixture from "./fixture";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const Pagination = ({ fixtureArr }: PaginationProps) => {
  const [page, setPage] = React.useState(1);
  const [fixtures, setFixtures] = React.useState(fixtureArr.slice(0, 10));
  const [leagueFilter, setLeagueFilter] = React.useState<string[]>([]);
  const [applyFilter, setApplyFilter] = React.useState<boolean>(false);
  const [searchBar, setSearchBar] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    let tempApplyFilter = false;
    if (leagueFilter.length > 0) {
      tempApplyFilter = true;
    }

    const filteredFixtures = fixtureArr
      .filter((fixture) => {
        if (fixture.league == null) return;
        if (!tempApplyFilter) return true;
        if (leagueFilter.includes(fixture.league.name)) {
          return true;
        } else {
          return false;
        }
      })
      .slice(0, 10);
    setApplyFilter(tempApplyFilter);
    setFixtures(filteredFixtures);
  }, [leagueFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchBar(search);
    // const filteredFixtures = fixtureArr
    // .filter((fixture) => {
    //   return (
    //     fixture.teams.home.name
    //       .toLowerCase()
    //       .includes(search.toLowerCase()) ||
    //     fixture.teams.away.name.toLowerCase().includes(search.toLowerCase())
    //   );
    // })
    //   .slice(0, 10);
    // setFixtures(filteredFixtures);

    // if (search === "") {
    //   setFixtures(fixtureArr.slice(0, 10));
    // }
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

  const updateFilter = (league: string) => {
    if (leagueFilter.includes(league)) {
      setLeagueFilter(leagueFilter.filter((item) => item !== league));
    } else {
      setLeagueFilter([...leagueFilter, league]);
    }
  };

  const leagueNames = Array.from(
    new Set(
      fixtureArr.map((fixture) => {
        if (fixture.league) {
          return fixture.league.name;
        }
      })
    )
  ).sort();

  const [toggleFilterDisplay, updateToggleFilterDisplay] =
    useState<boolean>(false);

  return (
    <div className="w-full backdrop-blur-md">
      <button
        onClick={() => updateToggleFilterDisplay(!toggleFilterDisplay)}
        className="absolute top-2 right-2 bg-[#77ACA2]/50 border-2 border-white/30 rounded-md px-1 py-1 md:hidden block"
      >
        Filter
      </button>
      <div
        className={`absolute md:w-1/5 max-h-[100vh] overflow-y-scroll rounded-r-md border-r border-white/20 md:bg-[#77ACA2]/10 bg-[#77ACA2]/40 z-20 md:block ${
          toggleFilterDisplay
            ? `block w-auto max-w-[80vw] backdrop-blur-md`
            : `hidden `
        }`}
      >
        <div className="sticky top-0 bg-[#65958F] pt-5 backdrop-blur-lg text-center w-full">
          <h1 className="">Filter By League</h1>
        </div>
        <div className="">
          {leagueNames.map((league) => {
            return (
              <div className=" mx-2 mt-1">
                <input
                  id={league?.replaceAll(" ", "")}
                  type="checkbox"
                  onClick={() => {
                    updateFilter(`${league}`);
                  }}
                  className="mr-2"
                ></input>
                <label htmlFor={league?.replaceAll(" ", "")}>{league}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:w-1/3 w-8/12 mx-auto">
        <input
          className="text-black w-full p-2 rounded-sm my-2"
          type="text"
          placeholder="Search fixtures by team"
          onChange={(e) => {
            handleSearch(e);
          }}
        ></input>
      </div>
      <div className="md:w-1/2 flex flex-wrap mx-auto  justify-around overflow-hidden hideLogos min-h-[89vh]">
        <AnimatePresence>
          {fixtures
            .filter((fixture) => {
              return (
                fixture.teams.home.name
                  .toLowerCase()
                  .includes(searchBar.toLowerCase()) ||
                fixture.teams.away.name
                  .toLowerCase()
                  .includes(searchBar.toLowerCase())
              );
            })
            .map((event, i) => {
              const filterCheck = () => {
                if (event.league == null) return;
                if (applyFilter) {
                  if (leagueFilter.includes(event.league.name)) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  return true;
                }
              };
              if (i < 10 && filterCheck()) {
                return (
                  <motion.div
                    initial={{
                      x: 10,
                      backdropFilter: "blur(0px)",
                      filter: "blur(8px)",
                      zIndex: -1,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      x: 0,
                      backdropFilter: "blur(4px)",
                      zIndex: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    key={event.fixture.id}
                    className=" shadow-md shadow-black/20 md:w-5/12 w-8/12 rounded-md my-1 cursor-pointer overflow-hidden bg-[#77ACA2]/50 border border-white/30 h-[17vh] hover:bg-yellow-200/10 duration-200 ease-in-out transition"
                  >
                    <Link
                      href={`/fixtures/${event.fixture.id}`}
                      className=" inline-block w-full h-full overflow-hidden max-h-[17vh] max-w-[66vw]"
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
      <div className="md:w-3/12 w-7/12 flex justify-between mx-auto mt-2 ">
        <button
          className="bg-[#77ACA2]/50 border-2 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md px-3 py-1  md:mb-0 mb-10"
          onClick={() => {
            handlePage(page - 1);
          }}
        >
          Page -
        </button>
        <h3 className="bg-[#77ACA2]/50 border-2 border-white/30  rounded-md px-3 py-1 md:mb-0 mb-10">
          {page}
        </h3>
        <button
          className="bg-[#77ACA2]/50 border-2 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md px-3 py-1  md:mb-0 mb-10"
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
