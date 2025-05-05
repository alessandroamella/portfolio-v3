"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import Dropdown, { Option } from "@gilbarbara/react-dropdown";
import { useLocale } from "next-intl";
import { FC } from "react";

interface ChangeLanguageBtnProps {
  options: Option[];
}

const ChangeLanguageBtn: FC<ChangeLanguageBtnProps> = ({ options }) => {
  const lang = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const curValue = options.find((e) => e.value === lang)!;

  const handleChange = (vals: Option[]) => {
    const locale = vals[0].value.toString();
    router.push(pathname, { locale });
  };

  return (
    <>
      <div className="dark:hidden">
        <Dropdown
          options={options}
          closeOnSelect
          searchable={false}
          onChange={handleChange}
          styles={{
            borderColor: "transparent",
            color: "rgb(229, 231, 235)",
            hoverColor: "rgb(209, 213, 219)",
            hoverOpacity: 0.15,
          }}
          values={[curValue]}
        />
      </div>
      <div className="hidden dark:block dark-dropdown">
        <Dropdown
          options={options}
          closeOnSelect
          searchable={false}
          onChange={handleChange}
          styles={{
            borderColor: "transparent",
            color: "rgb(55, 65, 81)",
            hoverColor: "rgb(25, 25, 25)",
            hoverOpacity: 0.15,
            bgColor: "rgb(25, 35, 45)",
            placeholderColor: "red",
          }}
          values={[curValue]}
        />
      </div>
    </>
  );
};

export default ChangeLanguageBtn;
