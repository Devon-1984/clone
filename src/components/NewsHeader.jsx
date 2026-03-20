import { useEffect, useState } from "react";

export default function NewsHeader({ children }) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const menuH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--menu-h")
    ) || 60;

    const handleScroll = () => {
      setPast(window.scrollY >= window.innerHeight - menuH);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-30 p-5 transition-colors duration-300"
      style={{
        backgroundColor: past ? "white" : "transparent",
        color: past ? "black" : "white",
        "--dot-color": past ? "black" : "white",
        "--logo-filter": past ? "brightness(0)" : "brightness(0) invert(1)",
      }}
    >
      {children}
    </header>
  );
}
