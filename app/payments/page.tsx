"use client";

import { PageHeader, Panel, StatCard } from "@/components/ui";
import { useState } from "react";

export default function PaymentsPage() {
  const [billing, setBilling] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [event.target.name]: event.target.value });
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [event.target.name]: event.target.value });
  };

  const handleCheckout = () => {
    console.log("Processing payment:", { billing, payment });
  };

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Review payment readiness and capture client billing details for checkout."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value="$30.4k" trend="+12%" tone="emerald" />
        <StatCard label="Scheduled" value="$8.9k" trend="next 7 days" tone="slate" />
        <StatCard label="Failed" value="$420" trend="2 retries" tone="rose" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Panel title="Billing Information">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["name", "Full name"],
              ["address", "Address"],
              ["city", "City"],
              ["country", "Country"],
            ].map(([name, placeholder]) => (
              <input
                key={name}
                type="text"
                name={name}
                value={billing[name as keyof typeof billing]}
                onChange={handleBillingChange}
                placeholder={placeholder}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
            ))}
          </div>
        </Panel>

        <Panel title="Payment Method">
          <div className="space-y-3">
            <input
              type="text"
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
              placeholder="Card number"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="expiry"
                value={payment.expiry}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                type="text"
                name="cvv"
                value={payment.cvv}
                onChange={handlePaymentChange}
                placeholder="CVV"
                className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
            </div>
            <div className="rounded-md bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Total due</span>
                <strong>$99.00</strong>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="h-10 w-full rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Process payment
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
