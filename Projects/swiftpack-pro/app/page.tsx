import Link from "next/link";

const services = [
  {
    title: "Residential Cleaning",
    description: "Recurring home care, deep cleans, and move-in or move-out refreshes.",
  },
  {
    title: "Commercial Spaces",
    description: "Daily, weekly, or monthly office and retail cleaning with flexible scheduling.",
  },
  {
    title: "Specialty Care",
    description: "Post-construction, Airbnb turnover, and event-ready cleaning packages.",
  },
];

const highlights = [
  "Bonded and insured professionals",
  "Eco-conscious products and microfiber tools",
  "Same-week availability for urgent requests",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
      <header className="mb-10 flex flex-wrap items-center justify-between rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
            SwiftPack Pro
          </p>
          <p className="text-xs text-slate-300">Cleaning that feels effortless</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-200">
          <Link href="#services" className="transition hover:text-sky-300">
            Services
          </Link>
          <Link href="/about" className="transition hover:text-sky-300">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-sky-300">
            Contact
          </Link>
        </nav>
      </header>

      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-200">
            Trusted by busy homes and growing businesses
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Your property deserves a spotless finish every time.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              SwiftPack Pro delivers dependable cleaning for homes, offices, and short-term rentals with a polished process and a team that respects your schedule.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Book a consultation
            </a>
            <a
              href="tel:+16475550199"
              className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
            >
              Call now
            </a>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-700 bg-slate-800/80 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Why clients choose us
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <span className="mt-1 text-sky-300">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Serving the GTA</p>
            <p className="mt-2">From condos and family homes to offices and storefronts, we tailor every visit to your space and pace.</p>
          </div>
        </div>
      </section>

      <section id="services" className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-700 bg-slate-950/60 p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Fast, friendly, and reliable
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              A simple booking experience from first visit to recurring care.
            </h2>
          </div>
          <a href="/contact" className="rounded-full border border-sky-400/30 px-5 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/10">
            Request a free quote
          </a>
        </div>
      </section>
    </main>
  );
}
