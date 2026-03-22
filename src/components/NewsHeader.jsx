import { useEffect, useState } from "react";

export default function NewsHeader({ children }) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const skipPage = parseInt(new URLSearchParams(window.location.search).get("skipPage") ?? "0") || 0;
    const menuH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--menu-h")
    ) || 60;

    if (skipPage > 0) {
      setPast(true);
    }

    const handleScroll = () => {
      const currentSkip = parseInt(new URLSearchParams(window.location.search).get("skipPage") ?? "0") || 0;
      if (currentSkip > 0) { setPast(true); return; }
      setPast(window.scrollY >= window.innerHeight - menuH);
    };

    const handlePageChange = ({ detail }) => {
      if (detail.skipPage > 0) {
        setPast(true);
        window.removeEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("news-page-change", handlePageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("news-page-change", handlePageChange);
    };
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
