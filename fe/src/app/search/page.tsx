"use client";

import Tutorial from "@/components/tutorial";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Input,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "@/components/common/footer";

const tabData = [
  {
    title: "어떤 반려동물을 찾고 계신가요?",
    content: [],
  },
  {
    title: "어떤 관리가 필요하신가요?",
    content: [],
  },
];

export default function Home() {
  const [mobile, setMobile] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1224px)" });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();

  const checkResize = () => {
    if (isTabletOrMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    checkResize();
  }, [isTabletOrMobile]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-start z-0 py-8 space-y-6">
      <div className="flex flex-row gap-1 justify-center items-start px-4 space-y-1 w-full border-b-1 py-2">
        <Button
          isIconOnly
          variant={"light"}
          onPress={() => {
            router.back();
          }}
        >
          {"<"}
        </Button>
        <p className="select-none text-xl font-bold text-start w-full">
          주소 검색
        </p>
      </div>

      <div
        className="flex h-full w-full px-6 select-none flex-col items-center justify-start max-w-[1200px] gap-4 pb-[150px]"
        // style={
        //   mobile && false
        //     ? { gap: "20px" }
        //     : {
        //         display: "grid",
        //         gridTemplateColumns: "1fr",
        //         gridTemplateRows: "1fr 1fr",
        //         gap: "10px",
        //       }
        // }
      >
        <Input placeholder="집주소를 입력해주세요" variant={"flat"}></Input>
        <div className="flex flex-col h-full items-center justify-center gap-4">
          <p className="select-none text-lg font-bold text-start w-full">
            이렇게 검색해보세요.
          </p>
          <div className="flex flex-col h-fit items-center justify-center">
            <p className="select-none text-sm text-center w-full">
              지역 + 아파트/오피스텔명
            </p>
            <p className="select-none text-sm text-center w-full text-orange-400">
              예{")"} 서현동 시범현대
            </p>
          </div>
          <div className="flex flex-col h-fit items-center justify-center">
            <p className="select-none text-sm text-center w-full">
              지역명(동/리) + 번지
            </p>
            <p className="select-none text-sm text-center w-full text-orange-400">
              예{")"} 삼평동 681
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
