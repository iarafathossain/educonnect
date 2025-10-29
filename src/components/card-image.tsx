import Image from "next/image";

const CardImage = ({ url, title }: { url?: string; title?: string }) => (
  <div className="relative w-full aspect-video rounded-md overflow-hidden">
    {url ? (
      <Image
        src={url}
        alt={title ?? "Course Image"}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    ) : (
      <div className="bg-muted h-full w-full aspect-video rounded-md flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No Image Available</p>
      </div>
    )}
  </div>
);

export default CardImage;
