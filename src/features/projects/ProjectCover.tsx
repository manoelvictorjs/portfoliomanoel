import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  variant?: "card" | "featured" | "modal";
  className?: string;
};

/** Exibe no máximo a resolução do arquivo — evita upscale que embaça texto de UI */
const VARIANT_MAX_WIDTH = {
  card: 560,
  featured: 1024,
  modal: 1024,
} as const;

export function ProjectCover({
  project,
  variant = "card",
  className = "",
}: Props) {
  const maxWidth = VARIANT_MAX_WIDTH[variant];

  if (project.coverImage) {
    return (
      <div
        className={`relative flex w-full justify-center overflow-hidden bg-[#f8fafc] ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={`Preview do site ${project.displayName}`}
          width={maxWidth}
          height={Math.round(maxWidth * 0.47)}
          decoding="sync"
          fetchPriority={variant === "featured" ? "high" : "auto"}
          className="h-auto w-full object-top"
          style={{
            maxWidth: `${maxWidth}px`,
            imageRendering: "auto",
          }}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0a0e14]/92 to-transparent" />
      </div>
    );
  }

  const heights = {
    card: "h-44 sm:h-52",
    featured: "min-h-[220px] md:min-h-[280px]",
    modal: "h-52 md:h-64",
  };

  return (
    <div
      className={`w-full bg-gradient-to-br ${project.gradient} ${heights[variant]} ${className}`}
    />
  );
}
