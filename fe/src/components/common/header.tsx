import {
  Button,
  Divider,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";

interface propsForHeader {
  title?: string;
}

export default function Header(props: propsForHeader) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set(["설정된 필터 없음"])
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <section className="top-0 z-50 w-screen border-b-1">
      <div className="flex flex-row w-full justify-between items-center bg-white dark:bg-black min-h-[60px] p-2">
        <div className="flex flex-row items-center justify-center w-full gap-1">
          <Button
            isIconOnly
            variant={"light"}
            onPress={() => {
              router.back();
            }}
            disableAnimation
          >
            <p className="w-full text-xl font-bold select-none">{"<"}</p>
          </Button>
          <p className="w-full text-xl font-bold select-none text-start">
            {props.title}
          </p>
        </div>
      </div>
      {pathname == "/map" && (
        <div className="bg-white flex flex-col justify-center items-start w-full p-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={"light"}
                className="capitalize"
                color={"default"}
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={(k: any) => {
                if (k["anchorKey"] == "필터 모두 해제하기") {
                  setSelectedKeys(new Set(["설정된 필터 없음"]));
                } else {
                  setSelectedKeys(k);
                }
              }}
            >
              <DropdownSection showDivider>
                <DropdownItem key="가격대">가격대</DropdownItem>
                <DropdownItem key="견종">견종</DropdownItem>
                <DropdownItem key="성별">성별</DropdownItem>
                <DropdownItem key="거리순">거리순</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem
                  key="필터 모두 해제하기"
                  className="text-danger"
                  color="danger"
                >
                  필터 모두 해제하기
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </section>
  );
}
