/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            }
        }
    },
    plugins: [require("flowbite/plugin")],
    important: true,
    safelist: ["bg-green-100", "bg-green-200", "bg-red-100", "bg-red-200"]
};
