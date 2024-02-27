"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./common/header";

type propsForTutorial = {
  tutorialContent: any;
};

export default function ModalDetail(props: any) {
  const router = useRouter();

  const [indexOfModal, setIndexOfModal] = useState<number>(0);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1224px)" });

  return (
    <Modal
      size={"full"}
      isOpen={props.isModalVisible}
      isDismissable
      closeButton={<></>}
    >
      <ModalContent className="overflow-y-auto gap-4">
        <Header
          title="지도 탐색"
          isBackButtonVisible
          selectedOptions={props.selectedOptions}
          setSelectedOptions={props.setSelectedOptions}
          isModalVisible={props.isModalVisible}
          setIsModalVisible={props.setIsModalVisible}
        ></Header>
        <div className="flex flex-col justify-start px-4 gap-8 items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
            return (
              <Card
                key={i}
                className="w-full flex h-fit max-h-[100px]"
                radius={"none"}
                shadow={"none"}
                isPressable
                disableAnimation
                onPress={() => {
                  router.push("/detail");
                }}
              >
                <div
                  className="w-full flex flex-row justify-between items-start gap-2"
                  style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
                >
                  <Image
                    src={"/images/landing-dog.jpg"}
                    width="50"
                    height="50"
                    alt="dog"
                    className="object-cover rounded-md w-full max-h-[100px]"
                  ></Image>
                  <div className="p-2 gap-1 flex flex-col items-start justify-between h-full">
                    <div className="flex flex-row gap-1 justify-start items-center">
                      <p className="font-semibold text-red-400 text-sm">
                        안심입양
                      </p>
                      <p className="font-semibold text-tiny">입양사고 보장</p>
                    </div>
                    <p className="text-md font-bold">25만원</p>
                    <div className="flex flex-row gap-1">
                      <p className="text-tiny">요크셔테리어</p>
                      <p className="text-tiny">남자아이</p>
                      <p className="text-tiny">3개월령</p>
                    </div>
                    <p className="text-tiny line-clamp-1 w-full text-start">
                      우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도 잘벌고
                      좋아요
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
          <Pagination
            total={5}
            initialPage={1}
            variant={"light"}
            isCompact
          ></Pagination>
        </div>
        <ModalFooter className={isTabletOrMobile ? "mb-4" : ""}>
          {/* <Button
            color="danger"
            variant="light"
            onPress={() => {
              props.setIsModalVisible(false);
            }}
          >
            {indexOfModal == 0 ? "넘어가기" : "돌아가기"}
          </Button>
          <Button
            color="primary"
            onPress={() => {
              props.setIsModalVisible(false);
            }}
          >
            {indexOfModal == props.tutorialContent.length - 1
              ? "시작하기"
              : "다음으로"}
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
