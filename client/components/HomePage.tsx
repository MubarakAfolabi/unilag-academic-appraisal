import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black/45">
        <section className="h-screen flex flex-col items-center pt-20 p-4 gap-8 lg:justify-end lg:items-start lg:p-30">
          <div className="flex flex-col text-center gap-1 lg:text-start lg:gap-2">
            <h1 className="text-white font-extrabold text-4xl lg:text-6xl">
              University of Lagos
            </h1>
            <p className="text-white font-bold text-lg lg:text-2xl">
              (Academic Appraisal)
            </p>
            <p className="text-white font-bold lg:text-lg">
              Centralized Online Research Assessment and Submission System
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="bg-[hsla(155,36%,42%,1)] font-bold text-white p-2 rounded-md lg:text-lg cursor-pointer"
              href="/login-publisher"
            >
              Publisher Sign-in
            </Link>
            <Link
              className="bg-[hsla(201,83%,70%,1)] font-bold text-white p-2 rounded-md lg:text-lg cursor-pointer"
              href="/login-reviewer"
            >
              Reviewer Sign-in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
