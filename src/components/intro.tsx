import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowDown, HiOutlineDocumentText } from "react-icons/hi2";

const Intro = () => {
  return (
    <section id="about" className="pt-6 sm:pt-10">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Writing code that mostly behaves itself
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Hello, I’m{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
              Priyanku Gogoi.
            </span>
          </h1>

          <div className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-2xl space-y-3 mb-8">
            <p>
              I like building things that are fast, useful, and reasonably hard
              to break.
            </p>
            <p className="text-zinc-400">
              I like understanding how things work under the hood, or why they
              don’t. I also write about tech, ideas, and whatever happens to
              catch my attention.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="#repos"
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 hover:bg-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-indigo-500/10"
            >
              <span>Check out my stuff</span>
              <HiArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#blogs"
              className="inline-flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
            >
              <HiOutlineDocumentText className="w-4 h-4 text-indigo-400" />
              <span>Read blogs</span>
            </a>

            <div className="flex items-center gap-2 pl-2">
              <a
                href="https://github.com/ppriyankuu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanku-gogoi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="relative flex-shrink-0 group">
          {/* Soft Ambient Halo Glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/15 to-sky-400/20 blur-2xl -z-10 pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>

          {/* Luminous Rim & Avatar */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-indigo-500/20 shadow-2xl ring-1 ring-white/10">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950">
              <Image
                src="https://github.com/ppriyankuu.png"
                alt="Priyanku Gogoi"
                width={192}
                height={192}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

