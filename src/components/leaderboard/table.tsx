import { LeaderboardEntry } from '@/lib/cftools';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { config } from '../../../config';
import { titleCase } from '@/lib/utils';
import { LeaderboardSortValues } from '../../lib/config.types';

const hitsCoefficient = 0.15;
const killsCoefficient = 1.35;
const deathsCoefficient = 0.75;
const suicideCoefficient = 0.25;
const playtimeCoefficient = 0.005;

const withZeroFallback = (value: number) => value <= 1 ? 1 : value;
const calculateActivityScore = (player: LeaderboardEntry) => {
  let score = 1;
  if ('playtime' in player) score += withZeroFallback(player.playtime) * playtimeCoefficient;
  if ('kills' in player) score += withZeroFallback(player.kills) * killsCoefficient;
  if ('deaths' in player) score += withZeroFallback(player.deaths) * deathsCoefficient;
  if ('suicides' in player) score += withZeroFallback(player.suicides) * suicideCoefficient;
  if ('hits' in player) score += withZeroFallback(player.hits) * hitsCoefficient;
  if (isNaN(score)) {
    console.error('Error calculating activity score for player (isNaN encountered):');
    console.error(player);
    score = 1;
  }
  return Math.round(score);
};

const LeaderboardTable = ({
  data,
  displayStat,
}: {
  data: LeaderboardEntry[];
  displayStat: LeaderboardSortValues;
}) => {
  data = data.slice(0, config.cftools.leaderboard.showAmount);
  return (
    <Table containerClassName='max-h-[60lvh] border max-w-4xl mx-auto bg-background' >
      <TableCaption className='pb-5'>
        Displaying data collected by the CFTools Data API.
      </TableCaption>
      <TableHeader className='sticky top-0 bg-background'>
        <TableRow>
          <TableHead className='w-[100px]'>Name</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Activity Score</TableHead>
          <TableHead className='text-right'>
            {displayStat === 'kdratio' ? 'K/D Ratio' : titleCase(displayStat)}
          </TableHead>
        </TableRow>
        <tr className='w-full h-[2px] bg-border absolute bottom-0' />
      </TableHeader>
      <TableBody>
        {data.map((player, ind) => {
          const activityScore = calculateActivityScore(player);
          return (
            <TableRow key={player.cftools_id}>
              <TableCell className='font-medium'>{player.latest_name}</TableCell>
              <TableCell>{ind + 1}</TableCell>
              <TableCell>{activityScore}</TableCell>
              <TableCell className='text-right'>{
                displayStat === 'playtime'
                  ? `${Math.floor((player[displayStat] ?? 0) / 60 / 60)}h` // Playtime value is in seconds
                  : player[displayStat] ?? 0
              }{displayStat === 'longest_kill' || displayStat === 'longest_shot' ? 'm' : ''}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className='sticky bottom-0 bg-slate-800'>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>
            {Math.round(data.reduce((acc, curr) => acc + (
              typeof curr[displayStat] === 'number' && !isNaN(curr[displayStat])
                ? displayStat === 'playtime'
                  ? Math.floor((curr[displayStat] ?? 0) / 60 / 60)
                  : curr[displayStat] ?? 0
                : 0
            ), 0))}
            {displayStat === 'playtime' ? 'h' : ''}
            {displayStat === 'longest_kill' || displayStat === 'longest_shot' ? 'm' : ''}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default LeaderboardTable;
