import { Reveal } from '@/components/Reveal';
import { Utensils, CheckCircle2, Clock, Flame, ArrowUpRight } from 'lucide-react';
import { KitchenTicket } from '@/types/campus';

interface KitchenFeedProps {
  tickets: KitchenTicket[];
  onOpenTicket: (ticket: KitchenTicket) => void;
}

export function KitchenFeed({ tickets, onOpenTicket }: KitchenFeedProps) {
  return (
    <section id="kitchen-feed" className="py-16 bg-peach-200/40 border-y border-border-peach/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-accent tracking-eyebrow block mb-1">
                KITCHEN DISPATCH MONITOR
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-ink flex items-center gap-2.5">
                <Utensils className="w-6 h-6 text-accent" />
                Live Campus Kitchen Orders
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-soft/15 text-green-soft text-xs font-semibold border border-green-soft/30">
                Live Feed Synced
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tickets.map((t) => (
              <div
                key={t.ticketId}
                onClick={() => onOpenTicket(t)}
                className="bg-peach-50 border border-border-peach hover:border-accent/40 rounded-2xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 relative group"
              >
                <div className="flex items-center justify-between text-xs text-ink-muted mb-3 border-b border-border-peach/50 pb-2.5">
                  <span className="font-mono text-accent font-semibold">{t.ticketId}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t.timestamp}
                  </span>
                </div>

                <h3 className="font-bold text-ink text-base mb-1 group-hover:text-accent transition-colors flex items-center justify-between">
                  {t.item}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </h3>
                <p className="text-xs text-ink-muted mb-4">{t.outlet}</p>

                <div className="bg-white border border-border-peach/60 rounded-xl p-3 flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-semibold tracking-wider block">Recommended Prep</span>
                    <span className="text-2xl font-extrabold text-ink leading-tight">{t.recommendedPrep} <span className="text-xs font-normal text-ink-muted">plates</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-ink-muted uppercase font-semibold tracking-wider block">Confidence</span>
                    <span className="text-sm font-bold text-green-soft">94%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted">
                    <Flame className="w-3.5 h-3.5 text-accent-light" />
                    Buffer: +{t.buffer} plates
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-peach-200 text-ink">
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
