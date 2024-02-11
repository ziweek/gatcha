"use client";

import Header from "@/components/common/header";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header title="주소 검색"></Header>
      {children}
    </section>
  );
}
