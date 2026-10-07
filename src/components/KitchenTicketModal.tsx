import { Printer, X, CheckCircle2, Utensils, Clock, ShieldCheck, Flame } from 'lucide-react';
import { KitchenTicket } from '@/types/campus';

interface KitchenTicketModalProps {
  ticket: KitchenTicket | null;
  onClose: () => void;
}

export function KitchenTicketModal({ ticket, onClose }: KitchenTicketModalProps) {
  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-peach-50 border border-border-peach rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-peach pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-ink text-base">CampusCurbs Kitchen Order</h3>
              <p className="text-xs text-ink-muted">AI-Dispatched Prep Ticket</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink p-1 rounded-full hover:bg-peach-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Details */}
        <div className="bg-white border border-border-peach/80 rounded-xl p-5 mb-5 shadow-sm font-mono text-xs text-ink space-y-4">
          <div className="flex justify-between border-b border-dashed border-border-peach pb-3">
            <div>
              <span className="text-ink-muted block font-sans text-[11px]">TICKET ID</span>
              <span className="font-bold text-sm text-accent">{ticket.ticketId}</span>
            </div>
            <div className="text-right">
              <span className="text-ink-muted block font-sans text-[11px]">TIMESTAMP</span>
              <span>{ticket.timestamp}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-dashed border-border-peach">
            <div>
              <span className="text-ink-muted block font-sans text-[11px]">CANTEEN OUTLET</span>
              <span className="font-semibold font-sans text-xs text-ink">{ticket.outlet}</span>
            </div>
            <div>
              <span className="text-ink-muted block font-sans text-[11px]">TARGET ITEM</span>
              <span className="font-semibold font-sans text-xs text-ink">{ticket.item}</span>
            </div>
          </div>

          <div className="bg-peach-100/60 rounded-lg p-3 space-y-2 font-sans">
            <div className="flex justify-between items-center text-sm font-bold text-ink">
              <span>RECOMMENDED KITCHEN PREP:</span>
              <span className="text-accent text-lg">{ticket.recommendedPrep} Plates</span>
            </div>
            <div className="flex justify-between text-xs text-ink-muted">
              <span>AI Predicted Base Demand:</span>
              <span className="font-semibold text-ink">{ticket.predictedDemand}</span>
            </div>
            <div className="flex justify-between text-xs text-ink-muted">
              <span>Safety Buffer Allowance:</span>
              <span className="font-semibold text-ink">+{ticket.buffer}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-sans text-ink-muted text-center">
            <div className="bg-peach-50 p-2 rounded">
              <span className="block text-ink-muted text-[10px]">FOOTFALL</span>
              <span className="font-semibold text-ink">{ticket.expectedStudents}</span>
            </div>
            <div className="bg-peach-50 p-2 rounded">
              <span className="block text-ink-muted text-[10px]">WEATHER</span>
              <span className="font-semibold text-ink">{ticket.weather}</span>
            </div>
            <div className="bg-peach-50 p-2 rounded">
              <span className="block text-ink-muted text-[10px]">ACADEMIC</span>
              <span className="font-semibold text-ink">{ticket.academicDay}</span>
            </div>
          </div>

          {/* Barcode graphic placeholder */}
          <div className="pt-2 text-center">
            <div className="h-8 bg-ink/10 rounded flex items-center justify-center tracking-[0.3em] font-bold text-[10px] text-ink-muted">
              ||| | |||| ||| || ||||| || |||
            </div>
            <span className="text-[10px] text-ink-muted block mt-1">VERIFIED BY CAMPUSCURBS ENGINE v2.4</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-ink/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Kitchen Ticket
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 border border-border-peach text-ink text-xs font-medium py-2.5 px-4 rounded-xl hover:bg-peach-200/50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
