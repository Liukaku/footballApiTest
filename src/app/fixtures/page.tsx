import Fixture from "@/components/fixture";
import Pagination from "@/components/pagination";
import { cookies } from "next/headers";
import React from "react";

export default async function Page() {
  const data = await getFixtures();
  const pagination = data.length / 10;

  return (
    <div className="">
      {data}
      {/* <Pagination fixtureArr={data} /> */}
    </div>
  );
}

async function getFixtures(): Promise<string> {
  const nextCookies = cookies();
  const res = await fetch(`${process.env.API_URL}/api/v1/getAllFixtures`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorisation: `${
        nextCookies.get("sb-khkumwhgqimxekxpfptk-auth-token")?.value
      }`,
    },
  });
  const data: ApiResult = await res.json();
  console.log(data);
  // const fixtures: FixtureProps[] = JSON.parse(data.message).response;

  return JSON.stringify(data);
}
