import React from 'react';
import Image from 'next/image';
import { HiArrowUpRight, HiAcademicCap } from 'react-icons/hi2';

const Education = () => {
  const educationDetails = [
    {
      title: 'Schooling',
      institution: 'Army Public School',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRW6wv3XbMavAlX4zVDaTq4tzOU_KWku7FSA&s',
      description: 'Learned science and math. Somehow made it through the exams.',
      url: 'https://en.wikipedia.org/wiki/Indian_Army_Public_Schools',
    },
    {
      title: "Bachelor's in Computer Applications",
      institution: 'Kaziranga University',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l7_cKq9dKcOqj5V1GbfXNhZ2KeQLhaFQn_6k_g%3Ds900-mo-c-c0xffffffff-rj-k-no&f=1&nofb=1&ipt=0e89dba055570f2192f2fc28763d9228d8c9d7c79cb7a8b56997aec104d24407',
      description: 'Started with programming and data structures. The bugs came free of charge.',
      url: 'https://kzu.ac.in/',
    },
    {
      title: "Master's in Computer Applications",
      institution: 'Tezpur University',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.cyvoVZ2QUdh8MG02UQuRNAHaHa%3Fpid%3DApi&f=1&ipt=92b042197a5fdfc1be6ccfee19e4b4539c27d7c09926ee15c32ba4ce61cff851',
      description: 'Learning software engineering, systems, and algorithms — basically teaching computers to cooperate.',
      url: 'https://www.tezu.ernet.in/',
    },
  ];

  return (
    <section id="education" className="space-y-6">
      <div>
        <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
          Education
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Where I studied.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {educationDetails.map((edu, index) => (
          <a
            key={index}
            href={edu.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/40"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                  <Image
                    src={edu.image}
                    alt={`${edu.title} at ${edu.institution}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <HiArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              </div>

              <h4 className="text-base font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors mb-1">
                {edu.title}
              </h4>

              <p className="text-sm font-medium text-zinc-400 mb-3">
                {edu.institution}
              </p>

              <p className="text-xs sm:text-sm text-zinc-400/90 leading-relaxed">
                {edu.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center pt-2">
        <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-mono">
          <HiAcademicCap className="w-4 h-4 text-indigo-400" />
          <span>&ldquo;Never failed a test I didn&apos;t take.&rdquo;</span>
        </p>
      </div>
    </section>
  );
};

export default Education;
