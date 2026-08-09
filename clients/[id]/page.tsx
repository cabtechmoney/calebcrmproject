// app/clients/[id]/page.tsx

import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Project = {
  id: number | string;
  title: string;
  status?: string;
  budget?: number;
  deadline?: string;
};

async function getClient(id: string) {
  const res = await fetch(
    `http://localhost:5000/api/clients/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch client");
  }

  return res.json();
}

export default async function ClientDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;
  const client = await getClient(id);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {client.name}
          </h1>

          <p className="text-gray-500">
            Client Details
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/clients"
            className="border rounded-lg px-4 py-2"
          >
            Back
          </Link>

          <button className="border rounded-lg px-4 py-2">
            Edit Client
          </button>
        </div>
      </div>

      {/* Client Info */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p>{client.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p>{client.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p>{client.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Company
            </p>

            <p>{client.company || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Projects
          </h2>

          <button className="border rounded-lg px-4 py-2">
            Add Project
          </button>
        </div>

        {client.projects?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Title
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                  <th className="text-left py-3">
                    Budget
                  </th>

                  <th className="text-left py-3">
                    Deadline
                  </th>
                </tr>
              </thead>
              <tbody>
                {client.projects.map(
                  (project: Project) => (
                    <tr
                      key={project.id}
                      className="border-b"
                    >
                      <td className="py-3">
                        {project.title}
                      </td>

                      <td className="py-3">
                        {project.status}
                      </td>

                      <td className="py-3">
                        ₦
                        {project.budget?.toLocaleString()}
                      </td>

                      <td className="py-3">
                        {project.deadline
                          ? new Date(
                              project.deadline
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
