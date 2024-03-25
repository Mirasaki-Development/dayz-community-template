'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { config } from '../../config';
import LeaderboardSelect, { LeaderboardSelectSortBy } from '@/components/leaderboard/select';
import LeaderboardTable from '@/components/leaderboard/table';
import BackgroundElements from '@/components/backgrounds/background-elements';
import { LeaderboardEntry } from '@/lib/cftools';

const LeaderboardSection = ({ data: _data, error }: {
  data: {
    [serverName: string]: LeaderboardEntry[];
  }
  error: string | null;
}) => {
  const [ data, setData ] = React.useState(_data);
  const [ sortBy, setSortBy ] = React.useState(config.cftools.leaderboard.defaultSortValue);

  const leaderboardServers = Object.keys(data);
  const [ activeServer, setActiveServer ] = React.useState(leaderboardServers[0] ?? '');
  const [ leaderboardData, setLeaderboardData ] = React.useState(data[0]);

  React.useEffect(() => {
    if (activeServer in data) setLeaderboardData(data[activeServer]);
    return () => {
      setLeaderboardData([]);
    };
  }, [activeServer, data]);

  if (!config.cftools.leaderboard.enabled) return null;

  return (
    <div className={cn(
      'relative z-10 overflow-hidden w-full',
    )}>
        <BackgroundElements />
      <section
        className={cn(
          'py-8 md:py-16 lg:py-28 px-1 sm:px-2 md:px-4 border-t border-b w-full',
        )}
        id='leaderboard'
      >
        <h2 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center'>
          {config.pages.home.sections.leaderboard.title}
        </h2>

        <p className='mb-6 text-lg font-normal text-gray-700 dark:text-gray-400 text-center max-w-xl mx-auto'>
          {config.pages.home.sections.leaderboard.description}
        </p>

        <div className='flex flex-wrap gap-2 w-full items-center justify-center'>
          <LeaderboardSelect defaultValue={leaderboardServers[0]} onChange={(serverName) => {
            setActiveServer(serverName);
          }} servers={leaderboardServers} />
          <LeaderboardSelectSortBy defaultValue={config.cftools.leaderboard.defaultSortValue} onChange={async (e) => {
            setSortBy(e);
            setData(
              Object.fromEntries(
                Object.entries(_data).map(([server, entries]) => [
                  server,
                  entries.sort((a, b) => b[e] - a[e]),
                ])
              )
            );
          }} />
        </div>

        {error && <p className='text-red-500 text-center mt-4'>
          {error}
          <br />
          Please try again later.
        </p>}

        {!error && <div className='relative mt-2'>
          {leaderboardData && <LeaderboardTable data={leaderboardData} displayStat={sortBy} />}
          {!leaderboardData && <div className='w-full h-[60lvh]' />}
        </div>}
      </section>
    </div>
  );
};

export default LeaderboardSection;
