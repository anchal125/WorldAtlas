import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import "./Navbar.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { Links } from "./Links";

export const Navbar = ({ theme, setTheme, setExpand }) => {
  const [lastScrollY, setLastcrollY] = useState(0);
  const { y: scrollY } = useWindowScroll();
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef();

  const handleTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (scrollY === 0) {
      setNavVisible(true);
      navRef.current.classList.remove("floating-nav");
    } else if (scrollY > lastScrollY) {
      setNavVisible(false);
      navRef.current.classList.remove("floating-nav");
    } else if (scrollY < lastScrollY) {
      setNavVisible(true);
      navRef.current.classList.add("floating-nav");
    }
    setLastcrollY(scrollY);
  }, [scrollY]);

  useGSAP(() => {
    gsap.to(navRef.current, {
      y: navVisible ? 0 : -100,
      opacity: navVisible ? 1 : 0,
      duration: 0.4,
    });
  }, [navVisible]);

  return (
    <nav ref={navRef} className="navbar">
      <h2 className="nav-title">WorldAtlas</h2>
      <Links classname="navlinks" handleTheme={handleTheme} theme={theme} />
      <IoMenu
        size="20"
        className="menu"
        onClick={() => {
          setExpand((p) => !p);
        }}
      />
    </nav>
  );
};
