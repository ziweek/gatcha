"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ModalDetail from "@/components/modal-detail";
import BaseMap from "@/components/map";
import { useEffect, useState } from "react";
// import { ToastContainer, toast, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = () => {
    const interval = setTimeout(() => {
      setIsLoading(false);
      // toast.success("반려견 n마리 탐색 완료");
    }, 2000);
  };

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [selectedOptions]);

  return (
    <section className="z-0 flex flex-col items-center justify-center w-full h-screen">
      <div className="fixed top-0 h-fit w-full z-50">
        <Header
          title="지도 탐색"
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        ></Header>
      </div>
      {/* <ToastContainer
        autoClose={1500}
        limit={1}
        position={"bottom-center"}
        // theme="colored"
        toastClassName={"bottom-[100px] mx-4"}
        transition={Zoom}
      /> */}
      <BaseMap></BaseMap>
      <div className="fixed bottom-0 h-fit w-full z-50">
        <Footer
          title="지도 탐색"
          isOneButton
          buttonText="이 지역 반려견 보기"
          isLoading={isLoading}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        ></Footer>
      </div>
      <ModalDetail
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></ModalDetail>
    </section>
  );
}
