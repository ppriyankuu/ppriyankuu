
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
    <header className="bg-dark-bg text-white container lg:px-8 mx-auto p-6 rounded-b-2xl border-2 border-t-0 border-r-rose-400 border-l-rose-400 border-b-rose-400">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-lexend">ppriyankuu.</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            {["skills", "repos", "education", "social"].map((item) => (
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
      {menuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2 bg-neutral-800 p-4 rounded-lg border-2 border-indigo-400">
            {["skills", "repos", "education", "social"].map((item) => (
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
      )}
    </header>
  );
};

export default Header;
