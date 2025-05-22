import React, { useEffect, useRef, useState } from "react";
import leetcode from './assets/leetcode_logo.png';
import linkedin from './assets/linkedin_logo.png';
import github from './assets/hithub_logo.png';

const LinkBox = ({ show, setShow }) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 980, top: 400 });
  const [zIndex, setZIndex] = useState(999);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newLeft = e.clientX - offset.current.x;
      const newTop = e.clientY - offset.current.y;
      setPosition({ left: newLeft, top: newTop });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsDragging(true);

    // Dynamic z-index update
    const allBoxes = document.querySelectorAll("[id='draggable-box']");
    let maxZ = 999;
    allBoxes.forEach((box) => {
      const z = parseInt(window.getComputedStyle(box).zIndex) || 999;
      if (z > maxZ) maxZ = z;
    });
    setZIndex(maxZ + 1);
  };

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      className="bg-white rounded-2xl shadow-xl w-[450px] h-[220px] text-center fixed overflow-hidden border border-gray-300"
      style={{ left: `${position.left}px`, top: `${position.top}px`, zIndex }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="bg-[#1c1c1c] text-white py-3 px-4 font-semibold text-xl flex justify-between items-center cursor-null"
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
