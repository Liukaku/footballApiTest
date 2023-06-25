import Fixture from "@/components/fixture";
import Odds from "@/components/odds";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const { fixRes, oddsRes } = await getFixture(params.id);
  const thisFixture = fixRes.response[0];
  console.log(oddsRes.response[0]);

  const groupedOdds = (): GroupedOddsReturn => {
    try {
      const bookmakers = oddsRes.response[0].bookmakers;
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
    } catch (e) {
      console.log(e);
      return { groupedByBets: {}, betKeys: [] };
    }
  };

  const { groupedByBets, betKeys } = groupedOdds();

  return (
    <div>
      <div className=" flex flex-wrap sticky top-0 bg-black/70 pt-5 backdrop-blur-md z-20 ">
        <div className="w-full text-center">
          <div className="flex md:w-3/12 w-11/12 mx-auto md:pb-0 pb-3">
            <div className=" overflow-hidden grid items-center">
              <Image
                src={thisFixture.teams.home.logo}
                alt={""}
                width={100}
                height={100}
                className="opacity-50"
              />
            </div>
            <div className="md:mx-5 mx-2 md:w-full w-8/12 bg-black/10 rounded-lg">
              <div className="flex w-full justify-around flex-wrap md:flex-none">
                <h1 className="text-xl font-black md:w-auto w-full ">
                  {thisFixture.teams.home.name}
                </h1>
                <h1 className="md:text-lg text-sm md:w-auto w-full "> vs</h1>
                <h1 className="text-xl font-black md:w-auto w-full ">
                  {thisFixture.teams.away.name}
                </h1>
              </div>
              <h3>
                {thisFixture.goals.home ?? 0} - {thisFixture.goals.away ?? 0}
              </h3>
              <h3 className="md:text-lg text-xs">
                {thisFixture.fixture.status.long}
              </h3>
            </div>
            <div className=" overflow-hidden grid items-center">
              <Image
                src={thisFixture.teams.away.logo}
                alt={""}
                width={100}
                height={100}
                className="opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="md:flex flex-wrap justify-around pb-2 mt-2 mx-auto hidden">
          {betKeys.map((key) => {
            return (
              <Link
                className="w-[12%] text-sm text-center hover:text-[#77ACA2] duration-300 transition hover:bg-black/20 border-white/0 border hover:border-white/10"
                href={`#${key.replaceAll(" ", "")}`}
              >
                {key}
              </Link>
            );
          })}
        </div>
      </div>
      {oddsRes.response[0] ? (
        <Odds groupedByBets={groupedByBets} />
      ) : (
        <div className="h-[86vh] backdrop-blur-md">
          <div className="md:w-1/3 w-10/12 text-center mx-auto mt-5 py-2 bg-cyan-950/70 hover:bg-cyan-800/70 duration-500 border rounded-lg shadow-xl shadow-black/30 border-white/20">
            There are no odds for this fixture
          </div>
          <Link
            href={"./"}
            className="bg-[#77ACA2]/50 border-2 block md:w-2/12 w-10/12 text-center mt-5 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md py-1 px-2 mx-auto"
          >
            Back to fixtures
          </Link>
        </div>
      )}
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
