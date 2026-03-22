import { useState, useEffect } from "react";

const PER_PAGE = 10;

function NewsCard({ item }) {
  return (
    <a href={`/news/${item.newsslug}`} className="block">
      <div className="mb-1 text-xs max-[900px]:text-[12px]">
        <p>{item.newstitle}</p>
        <p>
          <i>{item.newstype}</i>
        </p>
      </div>
      <div className="aspect-[3/2] bg-[#0000001a] relative overflow-hidden">
        <img
          src={item.newsimg.url}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </a>
  );
}

export default function NewsGridPaginated({ news }) {
  const [skip, setSkip] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = parseInt(params.get("skipPage") ?? "0") || 0;
    setSkip(s);

    const hero = document.getElementById("latest-news-sentinel");
    if (hero) hero.style.display = s > 0 ? "none" : "";

    const heading = document.getElementById("news-heading");
    if (heading) heading.style.marginTop = s > 0 ? "40px" : "";

    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const page = news.slice(skip, skip + PER_PAGE);
  const featured = isMobile ? page.slice(0, 1) : page.slice(0, 2);
  const rest = isMobile ? page.slice(1) : page.slice(2);
  const pageCount = Math.ceil(news.length / PER_PAGE);

  function goTo(pageSkip) {
    setSkip(pageSkip);
    const url = new URL(window.location.href);
    url.searchParams.set("skipPage", pageSkip);
    history.pushState({}, "", url);

    const hero = document.getElementById("latest-news-sentinel");
    if (hero) hero.style.display = pageSkip > 0 ? "none" : "";

    const heading = document.getElementById("news-heading");
    if (heading) heading.style.marginTop = pageSkip > 0 ? "40px" : "";

    window.dispatchEvent(
      new CustomEvent("news-page-change", { detail: { skipPage: pageSkip } }),
    );

    document
      .getElementById("news-content")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      {/* Grid */}
      <div className="p-5 mt-5 flex flex-col gap-y-[100px]">
        {/* First two: 50% each */}
        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 items-end gap-y-[100px]">
          {featured.map((item) => (
            <a
              key={item.newsslug}
              href={`/news/${item.newsslug}`}
              className="block"
            >
              <div className="mb-1 text-xs max-[900px]:text-[12px]">
                <p>{item.newstitle}</p>
                <p>
                  <i>{item.newstype}</i>
                </p>
              </div>
              <div className="aspect-[1060/700] bg-[#0000001a] relative overflow-hidden">
                <img
                  src={item.newsimg.url}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Rest: 4-col */}
        {rest.length > 0 && (
          <div className="grid grid-cols-4 max-[900px]:grid-cols-2 items-end gap-y-[100px]">
            {rest.map((item) => (
              <NewsCard key={item.newsslug} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-[10px] p-5 mt-10">
        <p className="text-xs tracking-widest">Pages:</p>
        <menu className="flex items-center justify-end gap-[10px] m-0 p-0 list-none">
          {Array.from({ length: pageCount }, (_, i) => {
            const pageSkip = i * PER_PAGE;
            const isActive = pageSkip === skip;
            return (
              <a
                key={i}
                href={`?skipPage=${pageSkip}`}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(pageSkip);
                }}
                className={`text-xs tracking-widest uppercase no-underline cursor-pointer${isActive ? " font-bold" : " opacity-40"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </a>
            );
          })}
        </menu>
      </div>
    </div>
  );
}
