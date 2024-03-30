import { config } from '../../config';
import { LeaderboardSortValues } from './config.types';

export const CFTOOLS_API_URL = 'https://data.cftools.cloud/v1';
export const APPLICATION_JSON = 'application/json';
export const MS_IN_ONE_HOUR = 1000 * 60 * 60;

const {
  CFTOOLS_API_APPLICATION_ID,
  CFTOOLS_API_SECRET,
} = process.env;

export const checkEnvironment = () => {
  if (!CFTOOLS_API_APPLICATION_ID || !CFTOOLS_API_SECRET) {
    throw new Error('Missing CFTools API credentials');
  }
};

// Fetch API token, valid for 24 hours, don't export function
const fetchAPIToken = async () => {
  checkEnvironment();

  // Getting our token
  let token = await fetch(
    `${ CFTOOLS_API_URL }/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify({
        'application_id': CFTOOLS_API_APPLICATION_ID,
        secret: CFTOOLS_API_SECRET,
      }),
      headers: { 'Content-Type': APPLICATION_JSON },
    }
  );
  token = (await token.json()).token;
  return typeof token === 'string'
    ? token
    : Promise.reject('Failed to get CFTools API token');
};

let CFTOOLS_API_TOKEN: string;
const tokenExpirationMS = MS_IN_ONE_HOUR * 23;
export const cftoolsAPIToken = async () => {
  if (!CFTOOLS_API_TOKEN) {
    CFTOOLS_API_TOKEN = await fetchAPIToken();
    setInterval(async () => {
      CFTOOLS_API_TOKEN = await fetchAPIToken();
    }, tokenExpirationMS);
  }
  return CFTOOLS_API_TOKEN;
};

export const cftoolsLeaderboard = async (
  CFTOOLS_SERVER_API_ID: string,
  stat: LeaderboardSortValues,
  order: 1 | -1,
  limit: number,
) => {
  try {
    let data = await fetch(
      `${ CFTOOLS_API_URL }/server/${ CFTOOLS_SERVER_API_ID }/leaderboard?stat=${ stat }&order=${ order }&limit=${ limit }`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ await cftoolsAPIToken() }`,
        },
        cache: 'default',
      }
    );
    data &&= await data.json();
    return data;
  }
  catch (err) {
    console.error('Error encountered while fetching CFTools leaderboard', err);
    return { error: `${err}` };
  }
};

export const leaderboardCache = [];

export type LeaderboardEntry = {
  cftools_id: string;
  deaths: number;
  hits:  number;
  kdratio: number;
  kills: number;
  latest_name: string;
  longest_kill: number;
  longest_shot: number;
  playtime: number;
  rank: number;
  suicides: number;
}

let lbCache: {
  [k: string]: {
    [k: string]: LeaderboardEntry[];
  };
} = {};

export const getServerLeaderboards = async (
  sortBy: LeaderboardSortValues = config.cftools.leaderboard.defaultSortValue,
  order: 1 | -1 = -1,
) => {
  const cacheKey = `${ sortBy }-${ order }`;
  if (cacheKey in lbCache) return lbCache[cacheKey];
  const errors: string[] = [];
  const lbArrArr = (await Promise.all(config.servers.filter((e) => typeof e.cftoolsApiId === 'string')
    .map((e) => cftoolsLeaderboard(
      e.cftoolsApiId as string,
      config.cftools.leaderboard.defaultSortValue,
      order,
      config.cftools.leaderboard.showAmount,
    ))))
    .map((e) => {
      if ('leaderboard' in e) return (e.leaderboard as LeaderboardEntry[])
        .filter((e) => !config.cftools.leaderboard.blacklistedCFToolsIds.includes(e.cftools_id));
      console.error('Failed to get CFTools leaderboard', e);
      if ('error' in e) errors.push(`${e.error as string}`);
      return [];
    });
  if (errors[0]) return {
    error: `Failed to get CFTools leaderboard for some servers: ${ errors[0]}`,
  };
  const mapped = Object.fromEntries(
    lbArrArr.map((e, i) => [config.servers[i].name, e])
  );
  lbCache[cacheKey] = mapped;
  setTimeout(() => {
    delete lbCache[cacheKey];
  }, MS_IN_ONE_HOUR);
  return mapped;
};