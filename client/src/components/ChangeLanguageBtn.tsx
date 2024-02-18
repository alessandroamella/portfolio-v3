"use client";

import React, { FC } from "react";
import { useRouter, usePathname } from "@/navigation";
import Dropdown, { Option } from "@gilbarbara/react-dropdown";
import { useLocale } from "next-intl";

interface ChangeLanguageBtnProps {
    options: Option[];
}

const ChangeLanguageBtn: FC<ChangeLanguageBtnProps> = ({ options }) => {
    const lang = useLocale();

    const router = useRouter();
    const pathname = usePathname();

    const curValue = options.find(e => e.value === lang)!;

    const handleChange = (vals: Option[]) => {
        const locale = vals[0].value.toString();
        router.push(pathname, { locale });
    };

    return (
        <Dropdown
            options={options}
            closeOnSelect
            searchable={false}
            onChange={handleChange}
            styles={{
                borderColor: "transparent",
                color: "rgb(229, 231, 235)",
                hoverColor: "rgb(209, 213, 219)",
                hoverOpacity: 0.15
            }}
            values={[curValue]}
        />
    );
};

export default ChangeLanguageBtn;
