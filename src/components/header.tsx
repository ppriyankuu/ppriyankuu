
"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust offset for fixed header
        behavior: "smooth",
      });
      setMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <header className="bg-dark-bg text-white container mx-auto px-6 pb-2 pt-4 md:py-6 rounded-b-2xl border-2 border-t-0 border-r-rose-400 border-l-rose-400 border-b-rose-400 transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold font-lexend">ppriyankuu.</h1>
        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            {["skills", "repos", "blogs", "education", "social"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item}`}
                  onClick={(e) => handleScroll(e, item)}
                  className="hover:bg-gray-300 hover:border-gray-300 hover:text-black bg-neutral-800 px-3 py-2 rounded-lg border-2 border-indigo-400"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <nav
        className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col space-y-2 bg-neutral-800 p-4 rounded-lg border-2 border-indigo-400 backdrop-blur-sm">
          {["skills", "repos", "blogs", "education", "social"].map((item) => (
            <li key={item} className="border-2 border-gray-300 rounded-lg">
              <Link
                href={`#${item}`}
                onClick={(e) => handleScroll(e, item)}
                className="block text-center hover:bg-gray-300 hover:border-gray-300 hover:text-black px-3 py-2 rounded-lg"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
