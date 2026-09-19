import React from 'react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { FaGolang, FaDocker, FaGitAlt, FaAws } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript, SiMongodb, SiMysql, SiGraphql, SiTailwindcss, SiExpress, SiNginx, SiFirebase } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandRedux } from "react-icons/tb";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178c6]' },
      { name: 'Golang', icon: FaGolang, color: 'text-[#00add8]' },
      { name: 'React.js', icon: FaReact, color: 'text-[#61dafb]' },
      { name: 'Next.js', icon: RiNextjsFill, color: 'text-zinc-100' },
      { name: 'Node.js', icon: FaNodeJs, color: 'text-[#68a063]' },
      { name: 'Express.js', icon: SiExpress, color: 'text-zinc-200' },
      { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-[#38bdf8]' },
      { name: 'Redux', icon: TbBrandRedux, color: 'text-[#764abc]' },
    ],
  },
  {
    title: "Databases & APIs",
    skills: [
      { name: 'PostgreSQL', icon: BiLogoPostgresql, color: 'text-[#4169e1]' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47a248]' },
      { name: 'MySQL', icon: SiMysql, color: 'text-[#00758f]' },
      { name: 'Redis', icon: DiRedis, color: 'text-[#dc382d]' },
      { name: 'GraphQL', icon: SiGraphql, color: 'text-[#e535ab]' },
      { name: 'Firebase', icon: SiFirebase, color: 'text-[#ffca28]' },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    skills: [
      { name: 'Docker', icon: FaDocker, color: 'text-[#2496ed]' },
      { name: 'AWS', icon: FaAws, color: 'text-[#ff9900]' },
      { name: 'Nginx', icon: SiNginx, color: 'text-[#009639]' },
      { name: 'Git', icon: FaGitAlt, color: 'text-[#f05032]' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="space-y-6">
      <div>
        <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
          Tech & Tools
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Stuff I work with.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="bg-zinc-950/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:border-zinc-700/80 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <h4 className="text-sm font-semibold text-zinc-200">
                {category.title}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all duration-200 group"
                >
                  <skill.icon className={`${skill.color} text-lg flex-shrink-0 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
