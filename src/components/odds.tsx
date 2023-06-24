import React from "react";

interface OddsProps {
  groupedByBets: BookmakersAndBets;
}

function Odds({ groupedByBets }: OddsProps) {
  return (
    <div className="flex flex-wrap w-11/12 mx-auto  backdrop-blur-md z-0 ">
      {Object.keys(groupedByBets).map((bet, i) => {
        if (Object.keys(groupedByBets[bet]).length > 4) {
          return (
            <div className="md:w-[32%] w-full mt-5 py-2 bg-cyan-950/70 hover:bg-cyan-800/70 duration-500 border rounded-lg mx-2 shadow-xl shadow-black/30 border-white/20 transition select-none">
              <h1
                className="md:mx-3 md:px-0 px-3 font-black md:bg-transparent bg-[#77ACA2]/70"
                id={`${bet.replaceAll(" ", "")}`}
              >
                {bet}
              </h1>
              <div className="flex flex-wrap w-full justify-around">
                {Object.keys(groupedByBets[bet]).map((bookmaker, j) => {
                  return (
                    <div className="md:w-11/12 w-full mt-2 flex hover:bg-[#77ACA2]/30 duration-300 transition rounded-md px-3">
                      <h2 className="font-bold md:w-4/12 w-5/12 flex items-center bg-">
                        {bookmaker}
                      </h2>
                      <div className="flex flex-wrap md:w-8/12 w-7/12 py-2">
                        {groupedByBets[bet][bookmaker].map((value, k) => {
                          if (k < 6) {
                            let width =
                              groupedByBets[bet][bookmaker].length <= 3
                                ? groupedByBets[bet][bookmaker].length
                                : 3;
                            if (value.value.split("").length > 5) width = 2;
                            return (
                              <div
                                className={`hover:bg-[#F19953]/90 duration-100 md:p-2 transition rounded-sm w-1/${width} `}
                              >
                                <h3 className=" break-words">{value.value}</h3>
                                <h3 className="">{value.odd}</h3>
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
  );
}

export default Odds;
