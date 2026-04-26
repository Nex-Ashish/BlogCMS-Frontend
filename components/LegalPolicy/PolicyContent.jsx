export default function PolicyContent( {sections, title} ) {

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#0d0614] to-black text-white px-4 sm:px-6 lg:px-20 py-12">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
          <p className="text-white/40 text-sm">Blog4u &nbsp;·&nbsp; April 2026</p>
        </div>

        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <div
              key={section.number}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-indigo-500/30 rounded-2xl p-6 sm:p-8 transition-all duration-200"
            >
              <div className="flex items-start gap-5">
                <span className="text-xs font-semibold text-indigo-400/60 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-2.5 py-1 shrink-0 mt-0.5">
                  {section.number}
                </span>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-white mb-2">{section.title}</h2>

                  {section.content && (
                    <p className="text-white/50 text-sm leading-relaxed">{section.content}</p>
                  )}

                  {section.list && (
                    <ul className="flex flex-col gap-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.contact && (
                    <p className="text-white/50 text-sm">
                      Reach us at{" "}
                      <a href={`mailto:${section.contact}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        {section.contact}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}