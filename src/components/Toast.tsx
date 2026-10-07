import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-ink text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 animate-fade-up">
      <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      <div className="text-xs font-medium pr-2">
        <span className="block font-bold text-accent-light">CampusCurbs Live Engine</span>
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-white/60 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
