import React from 'react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { FaGolang, FaDocker, FaGitAlt, FaAws } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript, SiMongodb, SiMysql, SiGraphql, SiTailwindcss, SiExpress, SiNginx, SiFirebase } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandRedux } from "react-icons/tb";

const Skills = () => {
  const skills = [
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
    { name: 'Golang', icon: FaGolang, color: 'text-cyan-500' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
    { name: 'Express.js', icon: SiExpress, color: 'text-green-600' },
    { name: 'React.js', icon: FaReact, color: 'text-sky-500' },
    { name: 'Next.js', icon: RiNextjsFill, color: 'text-gray-500' },
    { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-teal-400' },
    { name: 'Redux', icon: TbBrandRedux, color: 'text-purple-500' },
    { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-600' },
    { name: 'Git', icon: FaGitAlt, color: 'text-red-700' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
    { name: 'PostgreSQL', icon: BiLogoPostgresql, color: 'text-blue-600' },
    { name: 'MySQL', icon: SiMysql, color: 'text-orange-500' },
    { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-600' },
    { name: 'Docker', icon: FaDocker, color: 'text-blue-800' },
    { name: 'Redis', icon: DiRedis, color: 'text-red-500' },
    { name: 'AWS', icon: FaAws, color: 'text-yellow-500' },
    { name: 'Nginx', icon: SiNginx, color: 'text-green-700' },
  ];

  return (
    <section id="skills" className="bg-neutral-900 text-white border-2 border-rose-400 p-12 rounded-2xl my-4">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl sm:text-4xl md:text-5xl font-bold font-lexend text-center">Skills.</h2>

        {/* Mobile View: 3 columns */}
        <div className="sm:hidden flex justify-center">
          <div className="grid grid-cols-3 xs:grid-cols-3 gap-4 place-items-center">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-neutral-800 rounded-full border-2 border-indigo-400 w-20 h-20 flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <skill.icon className={`${skill.color}`} size={40} />
              </div>
            ))}
          </div>
        </div>

        {/* Larger screens: 2 to 6 columns */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl border-2 border-indigo-400 p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              <skill.icon size={60} className={`mb-4 ${skill.color}`} />
              <h3 className="text-xl font-thin font-lexend">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
