export default function CTASection() {
  return (
    <section className="px-4 sm:px-6 lg:px-20 py-14 bg-indigo-950 text-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold">
            Ready to Start Publishing?
          </h2>
          <p className="text-white/60 text-sm mt-2">
            Join creators already using our platform.
          </p>
        </div>

        <div className="flex gap-3">
          <a href="/auth/login" className="bg-white text-indigo-700 px-5 py-2 rounded-lg">
            Get Started
          </a>

          <a href="/#blogs" className="border border-white px-5 py-2 rounded-lg">
            Browse Blogs
          </a>
        </div>
      </div>
    </section>
  )
}