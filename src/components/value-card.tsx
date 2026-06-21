import type { LucideIcon } from "lucide-react";

type ValueCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ValueCard({ title, description, icon: Icon }: ValueCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-[#e8f2ee] text-[#113f36]">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <h3 className="text-lg font-semibold text-[#17231f]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-600">{description}</p>
    </article>
  );
}
