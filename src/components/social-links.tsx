import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const SocialLinks = () => {
  const links = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/priyanku-gogoi', color: 'text-blue-500' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/_dempho', color: 'text-pink-500' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/ppriyankuu', color: 'text-gray-200' },
  ];

  return (
    <section id="social" className="bg-neutral-900 text-white p-4 rounded-2xl mt-4 border-2 border-rose-400">
      <div className="container mx-auto">
        {/* Responsive Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lexend text-center">
          Socials.
        </h2>
        {/* Social Icons Container */}
        <div className="flex justify-center space-x-6 sm:space-x-8 mt-4 mb-5 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-3xl sm:text-4xl hover:text-gray-300 transition duration-300`}
            >
              <link.icon />
            </a>
          ))}
        </div>
        {/* Footer Text */}
        <h3 className="text-center text-sm sm:text-base md:text-lg">
          Made with{' '}
          <span className="bg-rose-500 rounded-md px-1 text-black">10%</span> skills,{' '}
          <span className="bg-rose-500 rounded-md px-1 text-black">90%</span> AI. 🧑‍💻🔥
        </h3>
      </div>
    </section>
  );
};

export default SocialLinks;
