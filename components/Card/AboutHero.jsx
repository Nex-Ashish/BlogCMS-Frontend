export default function AboutHero() {
  return (
    <section className="relative flex items-center px-4 sm:px-6 lg:px-20 py-20 bg-gradient-to-br from-black via-[#0d0614] to-black overflow-hidden">
      <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/[0.08] text-white/85 text-xs px-4 py-2 rounded-full mb-6 border border-white/[0.18]">
          <i className="fa-solid fa-circle-info text-indigo-300 text-xs" />
          About Us
        </span>

        <h1 className="text-4xl lg:text-5xl font-semibold text-slate-100 mb-4 leading-tight tracking-tight">
          Built for Creators. Trusted by Teams.
        </h1>

        <p className="text-white/50 text-sm lg:text-base mb-8 leading-relaxed">
          We started with one belief — great content deserves a great platform.
        </p>

        <div className="flex flex-wrap gap-5 text-white/60 text-sm">
          {["No-code publishing", "Real-time collaboration", "Built-in analytics"].map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70 inline-block" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}