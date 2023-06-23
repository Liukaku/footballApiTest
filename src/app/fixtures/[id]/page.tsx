import Fixture from "@/components/fixture";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const { fixRes, oddsRes } = await getFixture(params.id);
  const thisFixture = fixRes.response[0];
  const bookmakers = oddsRes.response[0].bookmakers;

  const groupedOdds = (): GroupedOddsReturn => {
    const groupedByBets: BookmakersAndBets = {};

    bookmakers.forEach((bookmaker) => {
      bookmaker.bets.forEach((bet) => {
        if (groupedByBets[bet.name] === undefined) {
          groupedByBets[bet.name] = {};
        }
        groupedByBets[bet.name][bookmaker.name] = bet.values;
      });
    });

    const betKeys = Object.keys(groupedByBets).filter((bet) => {
      return Object.keys(groupedByBets[bet]).length > 4;
    });

    return { groupedByBets, betKeys };
  };

  const { groupedByBets, betKeys } = groupedOdds();

  return (
    <div>
      <div className=" flex flex-wrap sticky top-0 bg-black/70 pt-5 backdrop-blur-md z-20 ">
        <div className="w-full text-center">
          <div className="flex md:w-3/12 w-11/12 mx-auto">
            <Image
              src={thisFixture.teams.home.logo}
              alt={""}
              width={50}
              height={50}
              className="opacity-50"
            />
            <div className="md:mx-5 mx-2 md:w-full w-8/12 border rounded-sm">
              <div className="flex w-full justify-around">
                <h1 className="text-xl font-black">
                  {thisFixture.teams.home.name}
                </h1>
                <h1 className="text-lg"> vs</h1>
                <h1 className="text-xl font-black">
                  {thisFixture.teams.away.name}
                </h1>
              </div>
              <h3>
                {thisFixture.goals.home ?? 0} - {thisFixture.goals.away ?? 0}
              </h3>
              <h3>{thisFixture.fixture.status.long}</h3>
            </div>
            <Image
              src={thisFixture.teams.away.logo}
              alt={""}
              width={50}
              height={50}
              className="opacity-50"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around pb-2 mt-2 mx-auto">
          {betKeys.map((key) => {
            return (
              <Link
                className="w-[12%] text-sm hover:text-[#77ACA2] duration-300 transition"
                href={`#${key.replaceAll(" ", "")}`}
              >
                {key}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap w-10/12 mx-auto bg-cyan-950/70 backdrop-blur-md z-0">
        {Object.keys(groupedByBets).map((bet, i) => {
          if (Object.keys(groupedByBets[bet]).length > 4) {
            return (
              <div className="md:w-1/3 w-full mt-5 py-2 hover:bg-cyan-800/70 duration-500 transition select-none">
                <h1
                  className="mx-3 font-black "
                  id={`${bet.replaceAll(" ", "")}`}
                >
                  {bet}
                </h1>
                <div className="flex flex-wrap w-full justify-around">
                  {Object.keys(groupedByBets[bet]).map((bookmaker, j) => {
                    return (
                      <div className="md:w-11/12 w-full mt-2 flex hover:bg-[#77ACA2]/30 duration-300 transition rounded-md px-3">
                        <h2 className="font-bold md:w-4/12 w-5/12 flex items-center">
                          {bookmaker}
                        </h2>
                        <div className="flex flex-wrap md:w-8/12 w-7/12 py-2">
                          {groupedByBets[bet][bookmaker].map((value, k) => {
                            if (k < 6) {
                              const width =
                                groupedByBets[bet][bookmaker].length <= 3
                                  ? groupedByBets[bet][bookmaker].length
                                  : 3;
                              return (
                                <div
                                  className={`hover:bg-[#F19953]/90 duration-100 md:p-2 transition rounded-sm w-1/${width} `}
                                >
                                  <h3>{value.value}</h3>
                                  <h3>{value.odd}</h3>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Page;

async function getFixture(fixtureId: string): Promise<FixtureAndOdds> {
  const nextCookies = cookies();
  const res = await fetch(
    `${process.env.API_URL}/api/v1/fixtures/${fixtureId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorisation: `${
          nextCookies.get("sb-khkumwhgqimxekxpfptk-auth-token")?.value
        }`,
      },
    }
  );
  const data: ApiResult = await res.json();
  const fixtures: FixtureAndOdds = JSON.parse(data.message);
  console.log(fixtures);
  return fixtures;
}
