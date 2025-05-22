import React, { useEffect, useRef, useState } from "react";
import MIS from './assets/MIS_logo.png';
import RVCE from './assets/RVCE_logo.png';

const EducationBox = ({ show, setShow, zIndex, bringToFront }) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 700, top: 45 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const newLeft = e.clientX - offset.current.x;
      const newTop = e.clientY - offset.current.y;
      setPosition({ left: newLeft, top: newTop });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

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
    e.preventDefault();
    bringToFront(); // 👉 Bring this box to the front
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsDragging(true);
  };

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      onMouseDown={bringToFront} // Also call bringToFront on box click
      className="bg-white p-0 rounded-2xl shadow-lg w-[650px] h-[400px] text-center overflow-hidden fixed"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        zIndex: zIndex || 1000,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="bg-[#1c1c1c] text-white py-4 px-4 font-semibold text-xl flex justify-between items-center cursor-null"
      >
        <span>Education</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
          className="text-white text-lg font-bold hover:scale-110 transition-transform cursor-null"
          aria-label="Close Education Box"
        >
          [x]
        </button>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-mg font-bold text-gray-800">
          <span className="text-blue-500 text-lg">Education </span>
          shapes character and outlook. I'm grateful to be part of institutions
          with over <span className="text-lg">60+</span> years of legacy that
          ignite curiosity, instill discipline, and foster the determination to
          pursue goals.
        </h1>
      </div>

      <ul className="space-y-4 pl-10 pr-8 pt-2 pb-4 h-[220px] overflow-y-auto text-left">
        {/* Project 1 */}
        <li className="flex items-start relative">
          <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>

          <div className="ml-6 flex-grow">
          <div className="font-semibold text-xl">Mother's International School, New Delhi (MIS)(2011-2024)</div>
            <ul className="list-disc list-inside text-lg mt-1 space-y-1">
              <li>CBSE X Grade: 90.8%</li>
              <li>CBSE XII Grade: 90.6% (PCM, 94%)</li>
            </ul>
          </div>

          <div className="w-48 h-36 ml-auto flex items-center justify-center">
            <img
              src={MIS}
              alt="MIS"
              className="max-w-full max-h-full"
            />
          </div>
        </li>

        {/* Project 2 */}
        <li className="flex items-start relative">
          <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>

          <div className="ml-6 flex-grow">
            <div className="font-semibold text-xl">R.V. College of Engineering, Bengaluru</div>
            <ul className="list-disc list-inside text-lg mt-1 space-y-1">
              <li>COMEDK: 809</li>
              <li>Computer Science Engineering - Cyber Security</li>
              <li>CGPA: 8.95</li>
            </ul>
          </div>

          <div className="w-48 h-36 ml-auto flex items-center justify-center">
            <img
              src={RVCE}
              alt="RVCE icon"
              className="max-w-full max-h-full"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EducationBox;
