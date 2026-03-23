import { useRef } from "react";
import { X, Printer } from "lucide-react";
import type { Order } from "@/data/menuData";

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal = ({ order, onClose }: InvoiceModalProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${order.id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Courier New', monospace; padding: 20px; font-size: 12px; color: #000; background: #fff; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .line { border-top: 1px dashed #000; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; padding: 2px 0; }
            .title { font-size: 18px; font-weight: bold; letter-spacing: 2px; }
            table { width: 100%; border-collapse: collapse; margin: 8px 0; }
            th, td { text-align: left; padding: 3px 0; font-size: 11px; }
            th:last-child, td:last-child { text-align: right; }
            th { border-bottom: 1px solid #000; }
            .total-row { font-size: 14px; font-weight: bold; border-top: 1px solid #000; padding-top: 6px; }
          </style>
        </head>
        <body>
          <div class="center">
            <div class="title">RIPO</div>
            <div>Fast Food Billing System</div>
            <div>123 Food Street, Mumbai, India</div>
            <div>GST: 27AABCU9603R1ZM</div>
          </div>
          <div class="line"></div>
          <div class="row"><span>Order: ${order.id}</span><span>${new Date(order.timestamp).toLocaleString("en-IN")}</span></div>
          <div class="row"><span>Customer:</span><span>${order.customerName}</span></div>
          <div class="line"></div>
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Amt</th></tr></thead>
            <tbody>
              ${order.items.map((item) => `<tr><td>${item.name}</td><td>${item.quantity} × ₹${item.price}</td><td>₹${item.price * item.quantity}</td></tr>`).join("")}
            </tbody>
          </table>
          <div class="line"></div>
          <div class="row"><span>Subtotal</span><span>₹${order.subtotal}</span></div>
          <div class="row"><span>GST (5%)</span><span>₹${order.tax}</span></div>
          ${order.discount > 0 ? `<div class="row"><span>Discount</span><span>-₹${order.discount}</span></div>` : ""}
          <div class="row total-row"><span>Total</span><span>₹${order.total}</span></div>
          <div class="row"><span>Payment</span><span style="text-transform:capitalize">${order.paymentMethod}</span></div>
          <div class="line"></div>
          <div class="center" style="margin-top:10px">Thank you for your visit!</div>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-sm max-h-[90vh] overflow-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6" ref={printRef}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">Invoice</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground">
              <X size={18} />
            </button>
          </div>

          <div className="text-center mb-5 pb-4 border-b border-dashed border-border">
            <h3 className="text-xl font-bold text-vyellow tracking-tight">RIPO</h3>
            <p className="text-[11px] text-muted-foreground">Fast Food Billing System</p>
            <p className="text-[11px] text-muted-foreground mt-1">123 Food Street, Mumbai, India</p>
            <p className="text-[11px] text-muted-foreground">GST: 27AABCU9603R1ZM</p>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>Order: {order.id}</span>
            <span>{new Date(order.timestamp).toLocaleString("en-IN")}</span>
          </div>

          <table className="w-full text-sm mb-3">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 text-muted-foreground font-medium text-xs">Item</th>
                <th className="text-center py-1.5 text-muted-foreground font-medium text-xs">Qty</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium text-xs">Amt</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-border/30">
                  <td className="py-1.5 text-xs text-foreground">{item.name}</td>
                  <td className="py-1.5 text-xs text-center text-muted-foreground tabular-nums">{item.quantity} × ₹{item.price}</td>
                  <td className="py-1.5 text-xs text-right font-medium tabular-nums">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-dashed border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">₹{order.subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span className="tabular-nums">₹{order.tax}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-vgreen"><span>Discount</span><span className="tabular-nums">-₹{order.discount}</span></div>}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span><span className="text-vyellow tabular-nums">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Payment</span><span className="capitalize">{order.paymentMethod}</span>
            </div>
          </div>

          <p className="text-center mt-5 text-xs text-muted-foreground">Thank you for your visit!</p>

          <button
            onClick={handlePrint}
            className="w-full mt-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            <Printer size={16} /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
