import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Fixture from "../fixture";

const mockFixture = {
  id: 1,
  referee: "Boss Man",
  timezone: "string",
  date: "string",
  timestamp: 1,
  periods: {
    first: 1,
    second: 2,
  },
  venue: {
    id: 2,
    name: "string",
    city: "string",
  },
  status: {
    long: "Full Time",
    short: "FT",
    elapsed: 90,
  },
};

const mockTeams = {
  home: {
    id: 1,
    name: "Home Team",
    logo: "https://media.api-sports.io/football/teams/1.png",
    winner: true,
  },
  away: {
    id: 2,
    name: "Away Team",
    logo: "https://media.api-sports.io/football/teams/1.png",
    winner: false,
  },
};

const mockGoals = {
  home: 2,
  away: 0,
};

describe("Fixture", () => {
  it("check component matches snapshot", () => {
    const fixture = renderer
      .create(
        <Fixture fixture={mockFixture} teams={mockTeams} goals={mockGoals} />
      )
      .toJSON();

    expect(fixture).toMatchSnapshot();
  });
});
