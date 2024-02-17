"use client";

import { LottieUserWithPet } from "@/components/common/lotties";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <LottieUserWithPet width={"300px"} play loop></LottieUserWithPet>
      <p>로딩 중입니다.</p>
    </div>
  );
}
