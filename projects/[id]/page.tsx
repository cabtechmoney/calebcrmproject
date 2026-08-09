type Props = {
  params: {
    id: string;
  };
};

export default function ProjectPage({
  params,
}: Props) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Project #{params.id}
      </h1>

      <div className="mt-6 border rounded-xl p-6">
        <p>
          <strong>Title:</strong> Freelancer CRM
        </p>

        <p>
          <strong>Status:</strong> In Progress
        </p>

        <p>
          <strong>Budget:</strong> ₦150,000
        </p>

        <p>
          <strong>Deadline:</strong> July 1, 2026
        </p>
      </div>
    </div>
  );
}