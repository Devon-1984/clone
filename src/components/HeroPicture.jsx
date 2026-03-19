import { useEffect, useRef } from "react";
import Popup from "./popup";

export default function HeroPicture({ heroUrl, data }) {
  const pictureRef = useRef(null);

  useEffect(() => {
    const picture = pictureRef.current;
    if (!picture) return;

    // Capture natural top position once at mount before any sticky offset kicks in
    const naturalTop = picture.getBoundingClientRect().top + window.scrollY;
    const pictureHeight = window.innerHeight;
    const threshold = naturalTop + pictureHeight * 0.2;

    picture.style.transition = "filter 700ms ease";

    function update() {
      const scrollY = window.scrollY;
      picture.style.filter = scrollY > threshold ? "brightness(0.3)" : "";
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <picture ref={pictureRef} className="sticky top-0 flex z-10">
      <img
        className="object-cover aspect-2500/1668 h-screen w-screen brightness-[0.7]"
        src={heroUrl}
      />
      <div className="top-10 right-5 left-auto absolute">
        <Popup data={data} href="https://sweepwidget.com/c/97261-64fnqs5h" />
      </div>
    </picture>
  );
}
