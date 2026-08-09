"use client";

import { PageHeader, Panel } from "@/components/ui";
import { useState } from "react";

type Invoice = {
  id: number;
  client: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, client: "Acme Corp", amount: 500, status: "Paid", date: "2026-06-01" },
    { id: 2, client: "Globex Inc", amount: 1200, status: "Pending", date: "2026-06-10" },
    { id: 3, client: "Soylent LLC", amount: 750, status: "Overdue", date: "2026-05-20" },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewInvoice({ ...newInvoice, [event.target.name]: event.target.value });
  };

  const handleAddInvoice = () => {
    if (!newInvoice.client || !newInvoice.amount || !newInvoice.date) return;

    const invoice: Invoice = {
      id: invoices.length + 1,
      client: newInvoice.client,
      amount: Number(newInvoice.amount),
      status: newInvoice.status as Invoice["status"],
      date: newInvoice.date,
    };

    setInvoices([...invoices, invoice]);
    setNewInvoice({ client: "", amount: "", status: "Pending", date: "" });
  };

  return (
    <div>
      <PageHeader title="Invoices" description="Create, review, and track invoice collection status." />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Panel title="Invoice List">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-500">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="py-4 text-slate-500">#{invoice.id.toString().padStart(4, "0")}</td>
                    <td className="py-4 font-medium text-slate-950">{invoice.client}</td>
                    <td className="py-4 text-slate-700">${invoice.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          invoice.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : invoice.status === "Overdue"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-600">{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Add Invoice">
          <div className="space-y-3">
            <input
              type="text"
              name="client"
              value={newInvoice.client}
              onChange={handleChange}
              placeholder="Client name"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <input
              type="number"
              name="amount"
              value={newInvoice.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <select
              name="status"
              value={newInvoice.status}
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <input
              type="date"
              name="date"
              value={newInvoice.date}
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <button
              onClick={handleAddInvoice}
              className="h-10 w-full rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add invoice
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
