import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    FunctionComponent,
} from "react";

type ButtonAndHrefProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ButtonAndHrefProps {
    color?: "red" | "blue" | "green" | "light" | "purple" | "dark";
}

const Button: FunctionComponent<ButtonProps> = ({
    children,
    href,
    className,
    color,
    ...rest
}) => {
    const _className = `p-2 text-white ${
        color === "red"
            ? "bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300"
            : color === "blue"
              ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300"
              : color === "green"
                ? "bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-300"
                : color === "light"
                  ? "text-black border hover:border-gray-600 active:border-gray-700 disabled:border-gray-300"
                  : color === "purple"
                    ? "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-purple-300"
                    : "bg-gray-700 hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-500"
    } border-none outline-none transition-colors duration-75 ${className || ""}`;

    return href ? (
        <a href={href} className={_className} {...rest}>
            {children}
        </a>
    ) : (
        <button className={_className} {...rest}>
            {children}
            <a className="bg-yellow-500"></a>
        </button>
    );
};

export default Button;
