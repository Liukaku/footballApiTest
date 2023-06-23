interface ApiResult {
  message: string;
}

interface FixtureAndOdds {
  fixRes: Fixtures;
  oddsRes: Odds;
}

interface Fixtures {
  response: FixtureProps[];
}

interface PaginationProps {
  fixtureArr: FixtureProps[];
}

interface FixtureProps {
  fixture: Fixture;
  teams: Teams;
  goals: Goals;
}

interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

interface Status {
  long: string;
  short: string;
  elapsed: number;
}

interface Venue {
  id: number;
  name: string;
  city: string;
}

interface Periods {
  first: number;
  second: number;
}

interface Teams {
  home: TeamType;
  away: TeamType;
}

interface TeamType {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface Goals {
  home: number | null;
  away: number | null;
}

interface Odds {
  response: Response[];
}

interface Response {
  league: League;
  fixture: Fixture;
  update: string;
  bookmakers: Bookmaker[];
}

interface Bookmaker {
  id: number;
  name: string;
  bets: Bet[];
}

interface Bet {
  id: number;
  name: string;
  values: Value[];
}

interface Value {
  value: string;
  odd: string;
}

interface Fixture {
  id: number;
  timezone: string;
  date: string;
  timestamp: number;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

interface Paging {
  current: number;
  total: number;
}

type BookmakersAndBets = Record<string, BookmakerType>;

type BookmakerType = Record<string, Value[]>;

interface GroupedOddsReturn {
  groupedByBets: BookmakersAndBets;
  betKeys: string[];
}
