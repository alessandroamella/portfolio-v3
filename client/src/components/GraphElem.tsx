import React, { useState } from "react";

function GraphElem() {
    // const [values, setValues] = useState([
    //     Math.floor(Math.random() * 50),
    //     Math.floor(Math.random() * 50) + 50,
    //     Math.floor(Math.random() * 50) + 100
    // ]);

    // function incrementValue(index: number) {
    //     const newValues = [...values];
    //     newValues[index] += 1;
    //     newValues.sort((a, b) => a - b);
    //     setValues(newValues);
    // }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex items-center flex-col relative">
                {/* Nodo 1 */}
                {/* <div className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center z-10"> */}
                <button
                    // onMouseOver={() => incrementValue(1)}
                    className="w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10"
                >
                    {/* <span className="text-gray-500 font-semibold tracking-tighter">
                        {values[1]}
                    </span> */}
                </button>

                {/* Arco tra nodo 1 e nodo 2 */}
                <div className="absolute bottom-[3.9rem] left-10 w-8 h-0.5 bg-white dark:bg-gray-900 border border-gray-200 transform -rotate-45 origin-top-left"></div>

                <div className="flex gap-8 mt-4">
                    {/* Nodo 2 */}
                    {/* <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center z-10"> */}
                    <button
                        // onMouseOver={() => incrementValue(0)}
                        className="w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10"
                    >
                        {/* <span className="text-gray-500 font-semibold tracking-tighter">
                            {values[0]}
                        </span> */}
                    </button>

                    {/* Nodo 3 */}
                    {/* <div className="w-16 h-16 bg-red-500 rounded-full flex justify-center items-center z-10"> */}
                    <button
                        // onMouseOver={() => incrementValue(2)}
                        className="w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10"
                    >
                        {/* <span className="text-gray-500 font-semibold tracking-tighter">
                            {values[2]}
                        </span> */}
                    </button>
                </div>

                {/* Arco tra nodo 1 e nodo 3 */}
                <div className="absolute bottom-[3.9rem] right-10 w-0.5 h-8 bg-black border border-gray-200 transform -rotate-45 origin-bottom-right"></div>
            </div>
        </div>
    );
}

export default GraphElem;
