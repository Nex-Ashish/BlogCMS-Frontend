import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserTie } from "@fortawesome/free-solid-svg-icons"

const team = [
  { name: "Ashish Panwar", role: "Founder & CEO", icon: faUserTie },
  { name: "Chandan Palariya", role: "Founder & CEO", icon: faUserTie },
  { name: "Riya Rawat", role: "Founder & CEO", icon: faUserTie },
]

export default function TeamSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-20 py-20 bg-gradient-to-br from-black via-[#0d0614] to-black overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="text-center mb-12 relative z-10 w-full">
        <span className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
          <i className="fa-solid fa-users text-[10px]" /> Meet the Team
        </span>
        <h2 className="text-2xl font-semibold text-slate-100">The People Behind It</h2>
        <p className="text-white/40 text-sm mt-2">Three developers building something better.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto relative z-10 w-full">
        {team.map((member, i) => (
          <div key={i} className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 text-center hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 ring-4 ring-indigo-500/20">
              <FontAwesomeIcon icon={member.icon} className="text-white text-lg" />
            </div>
              <h3 className="text-sm font-semibold text-slate-100">{member.name}</h3>
              <p className="text-xs text-white/35 mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}