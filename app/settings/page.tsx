"use client";

import { PageHeader, Panel } from "@/components/ui";
import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Caleb Ops",
    email: "caleb@example.com",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    weeklyDigest: true,
  });

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <PageHeader title="Settings" description="Configure workspace identity, alerts, and operating preferences." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Profile">
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full name"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email address"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            />
            <button className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
              Save profile
            </button>
          </div>
        </Panel>

        <Panel title="Notifications">
          <div className="space-y-3">
            {[
              ["email", "Email notifications"],
              ["sms", "SMS alerts"],
              ["weeklyDigest", "Weekly digest"],
            ].map(([name, label]) => (
              <label key={name} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm">
                <span>{label}</span>
                <input
                  type="checkbox"
                  name={name}
                  checked={notifications[name as keyof typeof notifications]}
                  onChange={handleNotificationsChange}
                  className="h-4 w-4 accent-slate-950"
                />
              </label>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
