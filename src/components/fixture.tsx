import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Fixture = ({ fixture, teams, goals }: FixtureProps) => {
  return (
    <div className=" flex flex-wrap h-full items-center overflow-hidden">
      <Image
        src={teams.home.logo}
        alt={""}
        width={150}
        height={150}
        className="opacity-50 md:left-0 left-16 absolute blur-sm z-0 aspect-square md:w-auto w-1/4"
      />
      <div className="w-full text-center z-20 font-bold">
        <h1 className="">
          {teams.home.name} vs {teams.away.name}
        </h1>
        <h3>
          {goals.home ?? 0} - {goals.away ?? 0}
        </h3>
        <h3>{fixture.status.long}</h3>
      </div>
      <Image
        src={teams.away.logo}
        alt={""}
        width={150}
        height={150}
        className="opacity-50 absolute blur-sm z-0 md:right-0 right-16 aspect-square md:w-auto w-1/4"
      />
    </div>
  );
};

export default Fixture;
