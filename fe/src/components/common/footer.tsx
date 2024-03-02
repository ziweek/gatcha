import { Button, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IconAdoption, IconCare } from "./icons";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function Footer(props: any) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["activatedFilters"],
    queryFn: () => {},
    staleTime: Infinity,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    const interval = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // console.log(data);
    setIsLoading(true);
    loadData();
  }, [data]);

  return (
    <section className="w-screen z-50 fixed bottom-0">
      {props.tabIndex == 1 && (
        <Button
          fullWidth
          radius={"none"}
          size={"lg"}
          color={"warning"}
          onPress={() => {
            router.push("/search");
          }}
        >
          펫케어 지금 바로 시작하기
        </Button>
      )}
      {props.isOneButton ? (
        <div className="flex flex-col w-full justify-between items-center pb-8 pt-4 px-4">
          <Button
            isDisabled
            isLoading={isLoading}
            className="bg-white rounded-b-none offset opacity-100 drop-shadow-md shadow-lg"
          >
            {!isLoading && "32마리"}
          </Button>
          <Button
            // isLoading={isLoading}
            radius={"sm"}
            fullWidth
            size={"lg"}
            className={`font-bold flex flex-row shadow-xl ${
              isLoading ? "justify2-between" : ""
            }`}
            color={"primary"}
            // endContent={isLoading && <Spinner className="opacity-0"></Spinner>}
            onPress={() => {
              props.setIsModalVisible(!props.isModalVisible);
            }}
          >
            {props.buttonText}
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-row w-full justify-between items-center pb-8 pt-2 border-t-1 bg-white dark:bg-black"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="flex flex-col justify-center items-center">
            <Button
              variant={"light"}
              onPress={() => {
                props.setTabIndex(0);
              }}
              className="h-full"
              disableAnimation={true}
            >
              <div className="flex flex-col justify-center items-center gap-2 pt-1">
                <IconAdoption
                  width={"25px"}
                  isActive={props.tabIndex == 0}
                ></IconAdoption>
                분양받기
              </div>
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button
              variant={"light"}
              onPress={() => {
                props.setTabIndex(1);
              }}
              className="h-full"
              disableAnimation={true}
            >
              <div className="flex flex-col justify-center items-center gap-2 pt-1">
                <IconCare
                  width={"25px"}
                  isActive={props.tabIndex == 1}
                ></IconCare>
                관리받기
              </div>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
