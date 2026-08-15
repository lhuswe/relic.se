import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_META, type ProjectStatus } from "@/types/project";

/** Maps a project status to its badge. Single place to restyle statuses. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, tone } = PROJECT_STATUS_META[status];

  return (
    <Badge tone={tone}>
      {status === "live" ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"
        />
      ) : null}
      {label}
    </Badge>
  );
}
