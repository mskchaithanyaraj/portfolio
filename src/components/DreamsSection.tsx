import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { AnimatedButton } from "./ui/animated-button";
import { dreamCards } from "../data/dreams";

const DreamsSection = () => {
  return (
    <section
      id="dreams"
      className="py-10 bg-surface-0 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center rounded-[2rem] border border-surface-30 bg-surface-0/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-0 text-surface-0 shadow-lg shadow-primary-0/15">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="uppercase tracking-[0.35em] text-xs text-primary-30">
                a whole new world
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-0 mb-4">
              MY DREAMS
            </h2>

            <p className="text-primary-30 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              This is the world I want to build: practical, useful, and a little
              futuristic. The idea is simple: turn ideas into systems that feel
              alive, modern, and valuable to real people.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <AnimatedButton to="/dreams" tone="dream">
                Enter the Dream World
              </AnimatedButton>
              <AnimatedButton to="/detailed-projects" tone="neutral">
                See Real Work
              </AnimatedButton>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-primary-30">
              <span className="px-3 py-1.5 rounded-full border border-surface-30 bg-surface-0">
                dream big
              </span>
              <span className="px-3 py-1.5 rounded-full border border-surface-30 bg-surface-0">
                build loud
              </span>
              <span className="px-3 py-1.5 rounded-full border border-surface-30 bg-surface-0">
                stay useful
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-surface-30 bg-surface-tonal-0 p-6 shadow-2xl shadow-black/10 dark:shadow-black/40">
              <p className="text-xs uppercase tracking-[0.35em] text-primary-40 mb-4">
                poster preview
              </p>
              <div className="space-y-3">
                {dreamCards.map((dream, index) => (
                  <div
                    key={dream.id}
                    className="flex items-start gap-3 rounded-2xl border border-surface-30 bg-surface-0 p-4"
                  >
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface-10 text-primary-0 text-sm font-semibold">
                      0{index + 1}
                    </span>
                    <p className="text-sm md:text-[0.95rem] leading-relaxed text-primary-30">
                      {dream.teaser}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-primary-30 italic border-l-2 border-primary-0/20 pl-4">
              If people do not laugh at your dream, you are probably not
              dreaming big enough.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamsSection;
