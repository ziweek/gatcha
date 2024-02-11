"use client";

import Header from "@/components/common/header";
import BaseMap from "@/components/map";

export default function Home() {
  return (
    <section className="z-0 flex flex-col items-center justify-center w-full h-screen">
      <div className="fixed top-0 h-fit w-full z-50">
        <Header title="지도 탐색"></Header>
      </div>
      <BaseMap></BaseMap>
    </section>
  );
}
