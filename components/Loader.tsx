import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center h-screen w-full justify-center">
      <Image
        src="/images/loading-circle.svg"
        alt="loading circle"
        width={50}
        height={50}
        className="text-blue-900"
      />
      <p className="text-black font-bold">Loading...</p>
    </div>
  );
}
