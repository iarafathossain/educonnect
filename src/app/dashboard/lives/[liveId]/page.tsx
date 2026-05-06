import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { getLive } from "@/services/live-services";
import { CalendarDays, Clock3, Link as LinkIcon, Tv2 } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { liveId: string };
};

const LiveDetailPage = async ({ params }: Props) => {
  const live = await getLive(params.liveId);

  if (!live) {
    return <AlertBanner label="Live not found." variant="warning" />;
  }

  return (
    <div className="p-6">
      {!live.active && (
        <AlertBanner
          label="This live session is unpublished and will not be visible to learners."
          variant="warning"
        />
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Tv2} variant="default" size="md" />
            <h1 className="text-2xl font-semibold">{live.title}</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Review the live session details and update it from the add flow if
            needed.
          </p>
        </div>

        <Link
          href="/dashboard/lives"
          className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Back
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CalendarDays} variant="default" size="md" />
              <h2 className="text-xl font-medium">Session details</h2>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Date</p>
                <p className="text-muted-foreground">
                  {live.date ? new Date(live.date).toLocaleDateString() : "-"}
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Time</p>
                <p className="text-muted-foreground">{live.time || "-"}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Stream URL</p>
                {live.url ? (
                  <a
                    href={live.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Open stream
                  </a>
                ) : (
                  <p className="text-muted-foreground">-</p>
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">Status</p>
                <p className="text-muted-foreground">
                  {live.active ? "Published" : "Unpublished"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Clock3} variant="default" size="md" />
              <h2 className="text-xl font-medium">Description</h2>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {live.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Tv2} variant="default" size="md" />
              <h2 className="text-xl font-medium">Thumbnail</h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-md border bg-muted/30">
              {live.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={live.thumbnail}
                  alt={live.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center text-sm text-muted-foreground">
                  No thumbnail provided.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDetailPage;
