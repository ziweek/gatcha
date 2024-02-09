import { Button, Divider } from "@nextui-org/react";

export default function Footer(props: any) {
  return (
    <section className="w-screen z-50 fixed bottom-0 pb-8 p-2 border-t-2">
      <div
        className="flex flex-row w-full justify-between items-center"
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
