import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import MusicPlayer from './MusicPlayer';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Aiden Kopec &nbsp;
            <span className="sm:block hidden"> | Software Developer</span>
          </p>
        </Link>

        <div className="hidden sm:flex items-center gap-10">
          <ul className="list-none flex flex-row gap-10 items-center">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <li className="flex items-center">
              <MusicPlayer
                mobile={false}
                externalOpen={false}
                onExternalOpenChange={() => {}}
              />
            </li>
          </ul>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center gap-4">
          {/* Hamburger Menu Button - always visible */}
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile Dropdown Menu - contains both nav links and music player */}
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {/* Navigation Links */}
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              {/* Music/Customization - integrated naturally */}
              <li className="pt-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-secondary text-[14px] font-medium cursor-pointer hover:text-white transition-colors"
                    onClick={() => setCustomizationOpen(!customizationOpen)}
                  >
                    Customization
                  </span>
                  <MusicPlayer
                    mobile={true}
                    externalOpen={customizationOpen}
                    onExternalOpenChange={setCustomizationOpen}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
