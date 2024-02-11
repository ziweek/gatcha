import { Button, Divider, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface propsForHeader {
  title?: string;
}

export default function Header(props: propsForHeader) {
  const router = useRouter();

  return (
    <section className="top-0 z-50 w-screen">
      <div className="flex flex-row w-full justify-between items-center border-b-1 bg-white dark:bg-dark min-h-[60px] p-2">
        <div className="flex flex-row items-center justify-center w-full gap-1">
          <Button
            isIconOnly
            variant={"light"}
            onPress={() => {
              router.back();
            }}
            disableAnimation
          >
            {"<"}
          </Button>
          <p className="w-full text-xl font-bold select-none text-start">
            {props.title}
          </p>
        </div>
      </div>
    </section>
  );
}
