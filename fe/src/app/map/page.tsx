"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ModalDetail from "@/components/modal-detail";
import BaseMap from "@/components/map";
import { useEffect, useState } from "react";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const loadData = () => {
  //   const interval = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadData();
  // }, [selectedOptions]);

  return (
    <section className="z-0 flex flex-col items-center justify-center w-full h-screen">
      <div className="fixed top-0 h-fit w-full z-50">
        <Header
          // title="지도 탐색"
          isFixed
          isLogoVisible
          isFilterBoxVisible={true}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        ></Header>
      </div>
      <BaseMap></BaseMap>
      <div className="fixed bottom-0 h-fit w-full z-50">
        <Footer
          title="지도 탐색"
          isOneButton
          buttonText="이 지역 반려견 보기"
          // isLoading={isLoading}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        ></Footer>
      </div>
      <ModalDetail
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        // selectedOptions={selectedOptions}
        // setSelectedOptions={setSelectedOptions}
      ></ModalDetail>
    </section>
  );
}
