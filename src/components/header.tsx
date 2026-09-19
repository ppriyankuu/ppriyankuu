
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "repos" },
  { label: "Blogs", id: "blogs" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "social" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300">
      <div
        className={`w-full max-w-3xl flex items-center justify-between px-5 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-zinc-800 shadow-lg shadow-black/40"
            : "bg-zinc-900/60 backdrop-blur-md border-zinc-800/80 shadow-md shadow-black/20"
        }`}
      >
        {/* Logo */}
        <Link
          href="#about"
          onClick={(e) => handleScroll(e, "about")}
          className="group flex items-center gap-2 text-base font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform shrink-0 translate-y-[1px]"></span>
          <span>ppriyankuu</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="text-xs lg:text-sm font-medium text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-full hover:bg-zinc-800/60 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-zinc-400 hover:text-white p-1 rounded-lg focus:outline-none transition-colors"
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-14 inset-x-4 max-w-sm mx-auto md:hidden bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 shadow-2xl shadow-black/60 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="block text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 px-4 py-2.5 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
