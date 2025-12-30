import { motion } from 'framer-motion';
import { Music, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen bg-background noise relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold">Resonance</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
            Connect Spotify
          </Button>
        </motion.div>
      </header>

      {/* Hero */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Your music, beautifully visualized</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
            <span className="text-gradient-primary">Discover</span> Your
            <br />
            <span className="text-gradient-cool">Sound DNA</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock stunning insights into your music taste. See your top artists, tracks, listening patterns, and mood analysis in a beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link to="/discover">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 glow-primary text-primary-foreground font-semibold px-8">
                Explore Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/stats">
              <Button size="lg" variant="outline" className="border-secondary/50 hover:bg-secondary/10">
                <BarChart3 className="w-4 h-4 mr-2" /> View Stats Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          {[
            { icon: Music, title: 'Top Tracks & Artists', desc: 'See your most played music across different time periods', gradient: 'primary' },
            { icon: BarChart3, title: 'Listening Insights', desc: 'Discover when and how you listen to music', gradient: 'cool' },
            { icon: Sparkles, title: 'Mood Analysis', desc: 'Understand the emotional patterns in your taste', gradient: 'accent' },
          ].map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -4 }} className="p-6 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-gradient-${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
