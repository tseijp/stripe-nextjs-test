"use client";

import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function Button(props: Props) {
  const { href, children } = props;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.replaceState(null, "", href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="w-32 h-8 leading-8 text-center cursor-pointer bg-gray-800 rounded text-white"
    >
      {children}
    </a>
  );
}
