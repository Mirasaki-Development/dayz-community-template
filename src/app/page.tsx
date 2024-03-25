import MainHero from '@/components/heros/main-hero';
import AboutSection from '@/sections/about-section';
import ServerNetworkSection from '@/sections/server-network-section';
import { config } from '../../config';
import dynamic from 'next/dynamic';
import { LeaderboardEntry, getServerLeaderboards } from '@/lib/cftools';
import ContactSection from '@/sections/contact-section';

// Lazy load chonky leaderboard section
const LeaderboardSection = dynamic(() => import('@/sections/leaderboard-section'));

export default async function Home() {
  let data = config.cftools.leaderboard.enabled ? await getServerLeaderboards() : {};
  let error = 'error' in data
    ? data.error as string
    : null;
  if (error) data = {};
  return (
    <main className='flex min-h-screen flex-col items-center justify-between w-full'>
      <MainHero />
      <AboutSection />
      <ServerNetworkSection />
      {config.cftools.leaderboard.enabled && <LeaderboardSection data={data as {
        [k: string]: LeaderboardEntry[];
      }} error={error} />}
      <ContactSection />
    </main>
  );
}
