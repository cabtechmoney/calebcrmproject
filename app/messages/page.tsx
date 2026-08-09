"use client";

import { MotionItem, MotionList, PageHeader, Panel } from "@/components/ui";
import { Send } from "lucide-react";
import { useState } from "react";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Alice", content: "Can you send the revised scope today?", timestamp: "13:30" },
    { id: 2, sender: "Bob", content: "Invoice received. Finance is reviewing it now.", timestamp: "13:32" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div>
      <PageHeader title="Messages" description="Keep client conversations visible next to delivery and billing context." />
      <Panel title="Client Inbox" className="max-w-4xl">
        <div className="flex h-[56vh] flex-col">
          <div className="flex-1 overflow-y-auto pr-2">
            <MotionList>
              {messages.map((message) => (
                <MotionItem key={message.id}>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-950">{message.sender}</p>
                      <span className="text-xs text-slate-500">{message.timestamp}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{message.content}</p>
                  </div>
                </MotionItem>
              ))}
            </MotionList>
          </div>
          <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              placeholder="Type a message"
              className="h-10 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <button
              aria-label="Send message"
              onClick={handleSend}
              className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 text-white hover:bg-slate-800"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
