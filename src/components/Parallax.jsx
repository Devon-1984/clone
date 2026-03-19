export default function Parallax({ image }) {
  return (
    <section className="relative h-[150vh] overflow-hidden">
      {/* Background — absolutely fills the 150vh container, scrolls naturally with it */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={image.url}
        alt=""
      />

      {/* Sticky text overlay — locks at the top once the section hits the viewport top.
          Image continues scrolling behind it for the remaining 90vh of the container. */}
      <div className="sticky top-0 h-[60vh] z-10 text-white flex flex-col p-5">
        {/* Top row: date left, event info right */}
        <div className="flex justify-between items-start">
          <div className="text-xs tracking-widest">
            <p>March 19, 2026</p>
            <p className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              James St Up Late 2026
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="w-16 h-16 rounded-full bg-yellow-400" />
            <p className="text-sm max-w-[180px] leading-snug">
              High glamour and even higher spirits.
            </p>
            <a
              href="/events/james-st-up-late-2026"
              className="text-xs flex items-center gap-1 underline underline-offset-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Discover Now
            </a>
          </div>
        </div>

        {/* Heading pushed to bottom of sticky area */}
        <a
          href="/events/james-st-up-late-2026"
          className="mt-auto text-center font-serif text-[clamp(2.5rem,8vw,7rem)] leading-none"
        >
          James St Up Late 2026
        </a>
      </div>
    </section>
  );
}
