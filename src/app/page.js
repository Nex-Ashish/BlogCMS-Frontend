import Image from "next/image";
import LoginButton from "../../components/Buttons/LoginButton";
import BlogCard from "../../components/Card/BlogCard";
// import { heroVideo } from "../../public/assets/heroVideo.mp4"

export default function Home() {
  return (
    <main>

      <section className="relative w-full px-4 py-3 lg:py-2 lg:px-20 min-h-screen overflow-hidden">

        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0" style={{ objectPosition: '75% 40%' }} src="/assets/heroVideo.mp4" />

          <div className="relative z-20 w-full lg:w-lg py-16 lg:py-8 ">
            <div className="flex flex-col gap-5 max-w-3xl">
              <h1 className="font-semibold text-5xl lg:text-7xl text-white leading-tight tracking-normal">
                Stop Chasing Leads. Start Closing Them.
              </h1>
              <p className="text-white/70 text-sm lg:text-base font-normal leading-relaxed">
                AI-powered outbound calling that works leads at scale, qualifies intent in real-time, and either transfers hot prospects to your closers instantly or books meetings directly on their calendar.
              </p>
              <div className="self-start py-6">
                <LoginButton title="Try it now" />
              </div>
            </div>
          </div>

      </section>

      <section className="w-full px-4 py-3 lg:py-2 lg:px-20 min-h-screen overflow-hidden">
        <div className="flex justify-center pt-20">
          <h2 className="border border-black/20 p-3 rounded-3xl "><span className="text-[#7C3AED] text-lg py-10">Trending Blogs</span></h2>
        </div>
        
        <div className="w-full px-4 py-3 lg:py-20 lg:px-20 overflow-hidden">
          <BlogCard />
        </div>
      </section>

    </main>
  );
}
