import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

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
        className="flex flex-row w-full justify-between items-center pb-8 p-2 border-t-1 bg-white dark:bg-black min-h-[60px]"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div className="flex flex-col justify-center items-center">
          <Button
            variant={"light"}
            onPress={() => {
              props.setTabIndex(0);
            }}
          >
            분양받기
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button
            variant={"light"}
            onPress={() => {
              props.setTabIndex(1);
            }}
          >
            관리받기
          </Button>
        </div>
      </div>
    </section>
  );
}
