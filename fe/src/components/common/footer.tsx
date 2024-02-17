import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IconAdoption, IconCare, IconDog } from "./icons";

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
    </section>
  );
}
