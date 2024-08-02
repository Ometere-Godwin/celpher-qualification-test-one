import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center h-screen w-full justify-center">
      <Image
        src="/images/loading-circle.svg"
        alt="loading circle"
        width={50}
        height={50}
      />
    </div>
  );
}
