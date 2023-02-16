import React from "react";

export default function MobileLink({ href, setOpen, linkText, open }) {
  return (
    <>
      <a
        className="text-xl font-normal my-4"
        href={href}
        onClick={() =>
          setTimeout(() => {
            setOpen(!open);
          }, 100)
        }
      >
        {linkText}
      </a>
    </>
  );
}
