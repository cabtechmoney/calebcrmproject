"use client";

import { Reorder, motion } from "framer-motion";
import { useState } from "react";

type KanbanCard = {
  id: string;
  title: string;
  client: string;
  value: string;
  due: string;
};

type KanbanColumn = {
  id: string;
  title: string;
  cards: KanbanCard[];
};

const initialColumns: KanbanColumn[] = [
  {
    id: "lead",
    title: "Lead",
    cards: [
      { id: "k1", title: "Northstar discovery", client: "Northstar Labs", value: "$9.8k", due: "Jul 3" },
      { id: "k2", title: "Retail automation brief", client: "MarketPro", value: "$5.4k", due: "Jul 8" },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    cards: [
      { id: "k3", title: "Freelancer CRM", client: "John Doe", value: "$150k", due: "Jul 5" },
      { id: "k4", title: "Billing portal", client: "Globex Inc", value: "$12.2k", due: "Jul 9" },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    cards: [
      { id: "k5", title: "E-commerce store", client: "Sarah", value: "$250k", due: "Jul 12" },
      { id: "k6", title: "Studio onboarding", client: "Lagos Studio", value: "$6.2k", due: "Jul 2" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "k7", title: "Invoice cleanup", client: "Acme Retail", value: "$3.6k", due: "Done" },
    ],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const updateColumnCards = (columnId: string, cards: KanbanCard[]) => {
    setColumns((current) =>
      current.map((column) => (column.id === columnId ? { ...column, cards } : column))
    );
  };

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map((column) => (
        <section key={column.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-950">{column.title}</h3>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-500">
              {column.cards.length}
            </span>
          </div>

          <Reorder.Group
            axis="y"
            values={column.cards}
            onReorder={(cards) => updateColumnCards(column.id, cards)}
            className="min-h-40 space-y-3"
          >
            {column.cards.map((card) => (
              <Reorder.Item key={card.id} value={card}>
                <motion.article
                  className="cursor-grab rounded-md border border-slate-200 bg-white p-3 shadow-sm active:cursor-grabbing"
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.02, boxShadow: "0 18px 35px rgba(15, 23, 42, 0.16)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <p className="text-sm font-semibold text-slate-950">{card.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{card.client}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                      {card.value}
                    </span>
                    <span className="font-medium text-slate-500">{card.due}</span>
                  </div>
                </motion.article>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </section>
      ))}
    </div>
  );
}
