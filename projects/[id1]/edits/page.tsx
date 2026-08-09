"use client";

import { useState } from "react";

export default function EditProjectPage() {
  const [title, setTitle] =
    useState("Freelancer CRM");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(title);

    // PUT request here
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="border px-4 py-2 rounded"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}