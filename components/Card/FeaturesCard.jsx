"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faLayerGroup, faShieldHalved, faChartLine, faPenNib, faUsers } from "@fortawesome/free-solid-svg-icons"

const features = [
    { icon: faPenNib, title: "Rich Text Editor", description: "Write beautifully with a powerful editor that supports markdown, media embeds, and custom formatting." },
    { icon: faLayerGroup, title: "Content Management", description: "Organize blogs by categories, tags, and authors. Keep everything structured and easy to find." },
    { icon: faBolt, title: "Instant Publishing", description: "Publish or schedule your blogs in one click. Go live instantly or plan your content calendar." },
    { icon: faChartLine, title: "Built-in Analytics", description: "Track views, engagement, and growth. Know what your audience loves with real-time insights." },
    { icon: faShieldHalved, title: "Secure & Private", description: "Role-based access, JWT authentication, and public/private blog controls keep your content safe." },
    { icon: faUsers, title: "Multi-Author Support", description: "Collaborate with your team. Manage multiple authors and their content from one dashboard." },
]

export default function FeaturesCard() {
    return (
        <section id="features" className="w-full bg-gradient-to-b from-black via-[#0d0614] to-black py-24 px-6 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium tracking-widest px-4 py-1.5 rounded-full mb-5">
                        <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
                        Features
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-semibold text-slate-100 leading-tight mb-4">
                        Everything You Need to <br />
                        <span className="text-[#7C3AED]">Publish Smarter</span>
                    </h2>
                    <p className="text-white/40 text-sm lg:text-base max-w-xl leading-relaxed">
                        Blog4u gives creators and teams all the tools to write, manage, and grow their content — all from one place.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, i) => (
                        <div key={i} className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/30 transition-all duration-300">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] to-violet-500 flex items-center justify-center mb-5 shadow-lg shadow-violet-900/30">
                                <FontAwesomeIcon icon={feature.icon} className="text-white text-sm" />
                            </div>
                            <h3 className="text-slate-100 font-semibold text-sm mb-2">{feature.title}</h3>
                            <p className="text-white/35 text-sm leading-relaxed">{feature.description}</p>
                            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}