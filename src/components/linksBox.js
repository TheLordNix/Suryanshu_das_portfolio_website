import React from "react";
import leetcode from './assets/leetcode_logo.png';
import linkedin from './assets/linkedin_logo.png';
import github from './assets/hithub_logo.png';
import useDraggable from "../hooks/useDraggable";

const LinkBox = ({ show, setShow, zIndex, bringToFront }) => {
  const { boxRef, position, zIndex: localZ, onMouseDown } = useDraggable({ x: 980, y: 400 });

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      className="bg-white rounded-2xl shadow-xl w-[450px] h-[220px] text-center fixed overflow-hidden border border-gray-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex || localZ,
      }}
      onMouseDown={bringToFront}
    >
      {/* Title Bar */}
      <div
        onMouseDown={onMouseDown}
        className="bg-[#1c1c1c] text-white py-3 px-4 font-semibold text-xl flex justify-between items-center cursor-move"
      >
        <span>Links</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
          className="text-white font-bold text-lg hover:scale-110 transition-transform"
        >
          [x]
        </button>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-3 gap-6 p-6">
        <a href="https://leetcode.com/u/Suryanshu_Das/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
          <img src={leetcode} alt="LeetCode" className="w-10 h-10" />
          <span className="mt-2 text-sm font-medium text-gray-800">leetcode</span>
        </a>

        <a href="https://github.com/TheLordNix" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
          <img src={github} alt="GitHub" className="w-10 h-10" />
          <span className="mt-2 text-sm font-medium text-gray-800">github</span>
        </a>

        <a href="https://www.linkedin.com/in/suryanshu-das-7a0002332/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
          <img src={linkedin} alt="LinkedIn" className="w-10 h-10" />
          <span className="mt-2 text-sm font-medium text-gray-800">linkedin</span>
        </a>
      </div>

      {/* Bottom Contact Info */}
      <div className="text-xs text-gray-500 pb-4">
        contact me @ <br />
        <span className="block font-medium">suryanshudas.03@gmail.com</span>
        <span className="block font-medium">+91-9319684823</span>
      </div>
    </div>
  );
};

export default LinkBox;
