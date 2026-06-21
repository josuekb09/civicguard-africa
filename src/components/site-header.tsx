import Link from "next/link";
import {
  BarChart3,
  ClipboardCheck,
  FilePlus2,
  FlaskConical,
  Info,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const navigation = [
  { href: "/submit", label: "Submit", icon: FilePlus2 },
  { href: "/triage-result", label: "Triage Report", icon: ClipboardCheck },
  { href: "/community", label: "Community", icon: UsersRound },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/benchmark-lab", label: "Benchmark Lab", icon: FlaskConical },
  { href: "/about", label: "About", icon: Info },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-[#113f36] text-white">
            <ShieldCheck aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-base font-semibold text-[#17231f]">
              CivicGuard Africa
            </span>
            <span className="block text-xs text-stone-500">
              Election disinformation triage
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex gap-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-stone-700 transition hover:bg-[#edf3ef] hover:text-[#113f36]"
              >
                <Icon aria-hidden="true" className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
