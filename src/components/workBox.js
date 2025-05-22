import React, { useEffect, useRef, useState } from "react";
import sriaurobindo from './assets/SriAurobindoSociety_logo.png';
import IISC from './assets/IISC_logo.png';

const WorkBox = ({ show, setShow }) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 100, top: 300 });
  const [zIndex, setZIndex] = useState(1000);
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

    // Draggable offset calculation
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsDragging(true);

    // Z-index bump logic
    const allBoxes = document.querySelectorAll("[id^='draggable-box']");
    let maxZ = 1000;
    allBoxes.forEach((box) => {
      const z = parseInt(window.getComputedStyle(box).zIndex) || 1000;
      if (z > maxZ) maxZ = z;
    });
    setZIndex(maxZ + 1);
  };

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      className="bg-white p-0 rounded-2xl shadow-lg w-[550px] h-[350px] text-center overflow-hidden fixed"
      style={{ left: `${position.left}px`, top: `${position.top}px`, zIndex }}
    >
      {/* Draggable Top Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="bg-[#1c1c1c] text-white py-4 px-4 font-semibold text-xl flex justify-between items-center cursor-null"
      >
        <span>Experience</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
          className="text-white text-lg font-bold hover:scale-110 transition-transform"
          aria-label="Close Work Box"
        >
          [x]
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="px-6 pt-3 pb-4 h-[265px] overflow-y-auto text-left text-gray-700">
        <h1 className="text-md font-bold mb-4">
          Work <span className="text-blue-500 text-lg">experience </span> shapes professionalism and decision-making. I'm grateful 
          for opportunities that strengthened my problem-solving abilities, enhanced 
          communication in real-world contexts, and taught the importance of accountability, 
          time management, and delivering under pressure.
        </h1>

        <ul className="space-y-4 pl-4 pr-2">
          <li className="flex items-center relative">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>

            <div className="ml-6">
              Student Teacher Assistant at Sri Aurobindo Society (Kechla)
            </div>

            <div className="w-14 h-14 ml-auto flex items-center justify-center">
              <img
                src={sriaurobindo}
                alt="Sri Aurobindo Society"
                className="max-w-full max-h-full"
              />
            </div>
          </li>
          <li className="flex items-center relative">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>

            <div className="ml-6">
              Ethical Hacking Workshop at IISc Bengaluru (Certification)
            </div>

            <div className="w-14 h-14 ml-auto flex items-center justify-center">
              <img
                src={IISC}
                alt="IISc Bengaluru"
                className="max-w-full max-h-full"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorkBox;
