import React from "react";
import Image from "next/image";

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
                      {`Hey, I’m`}
                      <span className="bg-rose-400 text-neutral-900 px-1 rounded-md ml-2">
                        Priyanku
                      </span>{" "} <br />
                      {`I write code that mostly behaves itself.`}
                      <br />
                      {`I like building things that are fast, clean, and don’t fall apart when you look away.`} 
                      <br />  
                      {`I enjoy figuring out how things work (and sometimes why they don’t).`}
                      <br />
                      {`I also write blogs occasionally — tech, ideas, or whatever pops into my head.`}
                    </p>
                </div>
                {/* Image Section */}
                <div className="md:w-1/3 flex-shrink-0 mt-6 md:mt-0 md:ml-8 relative">
                    <Image
                        src="https://github.com/ppriyankuu.png"
                        alt="Profile"
                        width={144}
                        height={144}
                        className="w-full h-auto aspect-square rounded-full border-4 lg:border-[6px] border-indigo-400 object-cover shadow-lg relative z-10"
                    />
                    <div className="absolute inset-0 rounded-full blur-3xl bg-indigo-500 opacity-100 animate-pulse z-0"></div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
