import React from "react";

export default function MobileLink({ href, setIsOpen, linkText, open }) {
  return (
    <>
      <a
        className="text-xl font-normal my-4"
        href={href}
        onClick={() =>
          setTimeout(() => {
            setIsOpen(!open);
          }, 100)
        }
      >
        {linkText}
      </a>
    </>
  );
}
