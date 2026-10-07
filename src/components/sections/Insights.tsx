import { Reveal } from '@/components/Reveal';
import { Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

const insights = [
  {
    num: '01',
    title: 'Student Footfall is the #1 Demand Predictor',
    text: 'Class attendance and departmental timetable schedules account for 38% of total daily demand variance.',
  },
  {
    num: '02',
    title: 'Exam Weeks Shift Food Preferences & Volumes',
    text: 'During midterm and final exam weeks, overall lunch volume drops by 32%, but quick snack and coffee demand surges by 45%.',
  },
  {
    num: '03',
    title: 'Heavy Rain Penalty Requires Dynamic Buffers',
    text: 'Rainfall over 15mm drops central dining hall demand by 24% as students order closer to their hostels.',
  },
];

export function Insights() {
  return (
    <section className="py-20 lg:py-28 bg-peach-100 border-t border-border-peach">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              DATA SCIENCE FINDINGS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight">
              What the Campus Data Reveals
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8">
          {insights.map((insight, i) => (
            <Reveal key={insight.num} delay={i * 100}>
              <div className="bg-peach-50 border border-border-peach rounded-2xl p-6 lg:p-8 flex items-start gap-6 shadow-sm">
                <span className="text-2xl font-black text-accent/50 shrink-0 font-mono">
                  {insight.num}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">{insight.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{insight.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
