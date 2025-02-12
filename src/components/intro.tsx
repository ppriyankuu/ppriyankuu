
import React from "react";

const Intro = () => {
  return (
    <section
      id="about"
      className="bg-neutral-900 border-2 border-rose-400 text-white p-6 sm:p-8 md:p-12 rounded-2xl mb-4"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-center text-center md:text-left">
        {/* Text Section */}
        <div className="md:w-2/3 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lexend mb-4 md:mb-6">
            About Me.
          </h2>
          <p className="text-lg font-lexend leading-relaxed mx-auto md:mx-0">
            Hey, I’m
            <span className="bg-rose-400 text-neutral-900 px-1 rounded-md ml-2">
              Priyanku.
            </span>{" "}
            I build <span className="text-rose-400 font-semibold">web apps</span> that
            work <span className="text-rose-400 font-semibold">fast</span>, look
            <span className="text-rose-400 font-semibold"> good</span>, and don’t break (
            <span className="text-indigo-500 font-semibold">most of the time</span>). <br/> I love solving
            <span className="text-rose-400 font-semibold"> tricky problems</span> and
            making things as simple as possible. When I’m not
            coding, I’m probably checking out
            <span className="text-rose-400 font-semibold"> new tech</span>, fixing
            something that wasn’t broken, or adding
            <span className="text-rose-400 font-semibold"> "just one more feature"</span>.
            Let’s create something <span className="text-rose-400 font-semibold">awesome</span>!
          </p>
        </div>
        {/* Image Section */}
        <div className="md:w-1/3 flex-shrink-0 mt-6 md:mt-0 md:ml-8 relative">
          <img
            src="https://github.com/ppriyankuu.png"
            alt="Profile"
            className="w-full h-auto rounded-full border-4 border-indigo-400 object-cover shadow-lg relative z-10"
          />
          <div className="absolute inset-0 rounded-full blur-3xl bg-indigo-500 opacity-100 animate-pulse z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
