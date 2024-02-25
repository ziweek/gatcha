import { Button, Divider, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IconAdoption, IconCare } from "./icons";

export default function Footer(props: any) {
  const router = useRouter();

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
        <div className="flex flex-row w-full justify-between items-center pb-8 pt-4 border-t-1 bg-white dark:bg-black px-4 border-white dark:border-gray-500">
          <Button
            isLoading={props.isLoading}
            radius={"sm"}
            fullWidth
            size={"lg"}
            className={`font-bold flex flex-row ${
              props.isLoading ? "justify-between" : ""
            }`}
            color={"primary"}
            endContent={
              props.isLoading && <Spinner className="opacity-0"></Spinner>
            }
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
