import React, { useState } from "react";
import cross from "../assets/cross.svg";

export default function Popup({ data }) {
  const page = data.landindPage;
  const [popup, setPopup] = useState(true);

  if (!popup) return null;

  return (
    <>
      <div className="relative">
        <img className="max-w-87.5" src={page.ticket.url} />
        <button
          onClick={(e) => {
            e.preventDefault();
            setPopup(false);
          }}
          className="absolute top-[1.15rem] right-[0.7rem] cursor-pointer"
        >
          <img src={cross.src} />
        </button>
      </div>
    </>
  );
}
