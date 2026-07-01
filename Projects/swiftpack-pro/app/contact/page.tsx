export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Contact SwiftPack Pro</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Let’s make your space shine.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Reach out for a free estimate or to schedule your first visit. We’ll follow up quickly with availability and pricing options.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="mailto:hello@swiftpackpro.com" className="rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400">hello@swiftpackpro.com</a>
          <a href="tel:+16475550199" className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300">+1 (647) 555-0199</a>
        </div>
      </div>
    </main>
  );
}
