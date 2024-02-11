"use client";

import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Search() {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1224px)" });
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="z-0 flex flex-col items-center justify-start w-full h-full py-8 space-y-6">
      <div className="flex flex-col h-full w-full px-6 select-none items-center justify-between max-w-[1200px] gap-6">
        <Input
          placeholder="집주소를 입력해주세요"
          variant={"flat"}
          classNames={{ input: "text-lg" }}
          isClearable
          value={inputValue}
          onClear={() => {
            setInputValue("");
          }}
          onValueChange={(e) => {
            setInputValue(e);
          }}
          onKeyDown={(e) => {
            // console.log(e.key);
          }}
        ></Input>
        {inputValue !== "" ? (
          <div className="flex flex-col w-full gap-4">
            {[1, 2, 3, 5, 6, 7, 6, 8, 9].map((e, i) => {
              return (
                <Button
                  key={i}
                  fullWidth
                  size={"lg"}
                  variant={"light"}
                  className="h-[80px]"
                  onPress={() => {
                    router.push("/map");
                  }}
                >
                  <div className="flex flex-col justify-center w-full">
                    <p className="select-none">서울특별시 중구 다산로 258</p>
                    <p className="text-orange-400 select-none">41876</p>
                  </div>
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 pt-12 h-fit">
            <p className="w-full text-lg font-bold select-none text-start">
              이렇게 검색해보세요.
            </p>
            <div className="flex flex-col items-center justify-center h-fit">
              <p className="w-full text-sm text-center select-none">
                지역 + 아파트/오피스텔명
              </p>
              <p className="w-full text-sm text-center text-orange-400 select-none">
                예{")"} 서현동 시범현대
              </p>
            </div>
            <div className="flex flex-col items-center justify-center h-fit">
              <p className="w-full text-sm text-center select-none">
                지역명(동/리) + 번지
              </p>
              <p className="w-full text-sm text-center text-orange-400 select-none">
                예{")"} 삼평동 681
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
