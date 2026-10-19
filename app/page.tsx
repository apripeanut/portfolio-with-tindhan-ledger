import Image from "next/image";
import profilePic from "../image/profile2.jpg";
import beachside from "../image/beachside.jpg";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src={beachside}
        alt="Beach Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      <div className="relative z-10 min-h-screen flex items-center px-10 py-20">
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-[1fr_450px] items-center gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-blue-950 mb-8">
              I'm Jezcois Reuben Garganza!
            </h1>

            <div
              className="
            bg-amber-100
            border-4
            border-blue-950
            rounded-3xl
            min-h-[280px]
            flex flex-col
            items-center
            justify-center
            text-center
            px-10
            gap-10
          "
            >
              <h2 className="text-3xl font-bold text-blue-950">
                Enjoying the summer times!
              </h2>

              <p className="text-2xl font-bold text-blue-950">
                Waving by the seaside with Hellos and Goodbyes!
              </p>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div
              className="
            absolute
            w-[430px]
            h-[430px]
            border-4
            border-amber-400
            rounded-3xl
            rotate-45
            z-0
          "
            />

            <div
              className="
            absolute
            w-[400px]
            h-[400px]
            border-4
            border-orange-500
            rounded-3xl
            -rotate-[28deg]
            z-0
          "
            />

            <Image
              src={profilePic}
              alt="Profile pic"
              width={450}
              height={450}
              className="
            relative
            z-20
            w-[450px]
            h-[450px]
            object-cover
            rounded-[90px]
            border-2
            border-red-700
          "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
