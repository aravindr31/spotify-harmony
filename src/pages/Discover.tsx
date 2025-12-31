import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, BarChart3, Compass, LucideSatelliteDish, LogOutIcon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FeaturedSection } from '@/components/discover/FeaturedSection';
import { TrendingSection } from '@/components/discover/TrendingSection';
import { PopularArtists } from '@/components/discover/PopularArtists';
import { StatsView } from '@/components/stats/StatsView';
import { logout } from '@/api/auth/spotifyAuth';

type View = 'discover' | 'stats';

export default function Discover() {
  const [activeView, setActiveView] = useState<View>('discover');

  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60);
    return hours > 0 ? `${hours.toLocaleString()}h` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>
      <header className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <LucideSatelliteDish className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Harmony</span>
          </div>
          <div className='grid grid-cols-2 gap-4 items-center'>
          <ThemeToggle />
          <div>
            <LogOutIcon className="w-4 h-4" onClick={logout}/>
          </div>
          </div>

        </div>
      </header>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1.5 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg">
          <Button
            variant={activeView === 'discover' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('discover')}
            className="gap-2 rounded-full px-4"
          >
            <Compass className="w-4 h-4" />
            <span>Discover</span>
          </Button>
          <Button
            variant={activeView === 'stats' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('stats')}
            className="gap-2 rounded-full px-4"
          >
            <BarChart3 className="w-4 h-4" />
            <span>My Stats</span>
          </Button>
        </div>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeView === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Discover Music
                </h1>
                <p className="text-muted-foreground mt-1">Explore trending tracks and artists</p>
              </div>
              <FeaturedSection />
              <TrendingSection/>
              <PopularArtists/>
            </motion.div>
          ) : (
            <StatsView key="stats" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
