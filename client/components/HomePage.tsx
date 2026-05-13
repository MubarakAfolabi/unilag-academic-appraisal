import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black/45 flex items-end px-6 py-10 md:px-12 lg:px-16">
        <section className="max-w-xl text-white pb-12 md:pb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[0.95] drop-shadow-lg">
            University of Lagos
          </h1>

          <p className="mt-4 text-base md:text-lg font-semibold uppercase tracking-wide">
            (Academic Appraisal)
          </p>

          <p className="mt-2 max-w-lg text-sm md:text-base font-medium text-white/95">
            Centralized Online Research Assessment and Submission System
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login-publisher"
              className="rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-500"
            >
              Publisher Sign-in
            </Link>

            <Link
              href="/login-reviewer"
              className="rounded-md bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-sky-400"
            >
              Reviewer Sign-in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}