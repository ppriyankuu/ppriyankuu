import { FaLinkedin, FaInstagram, FaGithub, FaMedium } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

const SocialLinks = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      name: 'GitHub',
      handle: '@ppriyankuu',
      icon: FaGithub,
      url: 'https://github.com/ppriyankuu',
      color: 'hover:text-white',
    },
    {
      name: 'LinkedIn',
      handle: 'priyanku-gogoi',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/priyanku-gogoi',
      color: 'hover:text-[#0a66c2]',
    },
    {
      name: 'Medium',
      handle: '@ppriyankuu',
      icon: FaMedium,
      url: 'https://medium.com/@ppriyankuu',
      color: 'hover:text-emerald-400',
    },
    {
      name: 'Instagram',
      handle: '@demphooo',
      icon: FaInstagram,
      url: 'https://instagram.com/demphooo',
      color: 'hover:text-pink-400',
    },
  ];

  return (
    <footer id="social" className="space-y-12 pt-8 border-t border-zinc-800/60">
      {/* Contact Callout Card */}
      <div className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-sm text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            👋 Say hello
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Catch me on the internet.
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
            Found a bug in my code, liked an article, or just want to say hi? Feel free to reach out.
          </p>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-all duration-200 ${link.color}`}
              >
                <link.icon className="text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 pb-4">
        <p>© {currentYear} Priyanku Gogoi. All rights reserved.</p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/60 font-mono text-[11px] text-zinc-400">
          <span>Crafted with</span>
          <span className="text-indigo-400 font-semibold">10% skills</span>
          <span>&</span>
          <span className="text-pink-400 font-semibold">90% AI</span>
          <span>🧑‍💻</span>
        </div>
      </div>
    </footer>
  );
};

export default SocialLinks;
