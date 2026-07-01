export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">About SwiftPack Pro</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">We bring order, comfort, and confidence to every space we touch.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Our team combines detail-oriented cleaning practices with responsive service so your home or workplace feels fresh, calm, and professionally maintained.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["15+", "years of combined experience"],
            ["100%", "customized cleaning plans"],
            ["24/7", "client support for urgent needs"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
