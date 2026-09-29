"use client";

import { PageHeader, Panel, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import type { Payment } from "@/lib/types";
import { FormEvent, useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank transfer");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPayments = async () => {
    setIsLoading(true);
    setError("");
    try {
      setPayments(await api<Payment[]>("/payments"));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load payments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadPayments(); }, []);

  const addPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const created = await api<Payment>("/payments", {
        method: "POST",
        body: JSON.stringify({ amount: Number(amount), method, status: "Pending" }),
      });
      setPayments((current) => [created, ...current]);
      setAmount("");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not add payment.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (payment: Payment, status: string) => {
    setError("");
    try {
      const updated = await api<Payment>(`/payments/${payment.id}`, {
        method: "PUT", body: JSON.stringify({ status }),
      });
      setPayments((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update payment.");
    }
  };

  const deletePayment = async (id: string) => {
    setError("");
    try {
      await api<void>(`/payments/${id}`, { method: "DELETE" });
      setPayments((current) => current.filter((payment) => payment.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete payment.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Review payment readiness and capture client billing details for checkout."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value={`$${payments.filter((payment) => payment.status?.toLowerCase() === "paid").reduce((total, payment) => total + (payment.amount ?? 0), 0).toLocaleString()}`} trend="Paid" tone="emerald" />
        <StatCard label="Scheduled" value={`$${payments.filter((payment) => payment.status?.toLowerCase() === "pending").reduce((total, payment) => total + (payment.amount ?? 0), 0).toLocaleString()}`} trend="Pending" tone="slate" />
        <StatCard label="Payment records" value={String(payments.length)} trend="All statuses" tone="rose" />
      </div>

      {error && <p className="form-error mb-4" role="alert">{error} <button type="button" onClick={() => void loadPayments()}>Retry</button></p>}
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Panel title="Payment records">
          {isLoading ? <p role="status">Loading payments...</p> : payments.length === 0 ? <p>No payment records yet.</p> : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 py-3">
                  <div><strong>${(payment.amount ?? 0).toLocaleString()}</strong><p className="m-0 text-sm text-slate-500">{payment.method || "Unspecified method"} · {payment.status || "Pending"}</p></div>
                  <div className="flex gap-2">
                    <button className="secondary-button" type="button" onClick={() => void updateStatus(payment, payment.status?.toLowerCase() === "paid" ? "Pending" : "Paid")}>{payment.status?.toLowerCase() === "paid" ? "Mark pending" : "Mark paid"}</button>
                    <button className="danger-button" type="button" onClick={() => void deletePayment(payment.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Add payment record">
          <form onSubmit={addPayment} className="space-y-3">
            <label className="block text-sm font-medium" htmlFor="payment-amount">Amount</label>
            <input id="payment-amount" required min="0.01" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm" />
            <label className="block text-sm font-medium" htmlFor="payment-method">Method</label>
            <select id="payment-method" value={method} onChange={(event) => setMethod(event.target.value)} className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm">
              <option>Bank transfer</option><option>Cash</option><option>Card (external processor)</option><option>Other</option>
            </select>
            <button disabled={isSaving} className="h-10 w-full rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">{isSaving ? "Saving..." : "Add payment"}</button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
