import React from "react";
import sriaurobindo from './assets/SriAurobindoSociety_logo.png';
import IISC from './assets/IISC_logo.png';
import RTDS from './assets/rtds_logo.png';
import useDraggable from "../hooks/useDraggable";

const WorkBox = ({ show, setShow, zIndex, bringToFront }) => {
  const { boxRef, position, zIndex: localZ, onMouseDown } = useDraggable({ x: 100, y: 300 });

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      className="bg-white p-0 rounded-2xl shadow-lg w-[550px] h-[350px] text-center overflow-hidden fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex || localZ,
      }}
      onMouseDown={bringToFront}
    >
      {/* Draggable Top Bar */}
      <div
        onMouseDown={onMouseDown}
        className="bg-[#1c1c1c] text-white py-4 px-4 font-semibold text-xl flex justify-between items-center cursor-move"
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

      {/* Intro text (non-scrollable) */}
      <div className="px-6 py-3">
        <h1 className="text-md font-bold text-gray-800">
          Work <span className="text-blue-500 text-lg">experience </span> shapes professionalism and decision-making. I'm grateful 
          for opportunities that strengthened my core skills needed, enhanced 
          communication in real-world contexts.
        </h1>
      </div>

      {/* Scrollable list */}
      <ul className="space-y-4 pl-6 pr-4 pt-2 h-[180px] overflow-y-auto text-left text-gray-700">
                <li className="flex items-center relative">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>

          <div className="ml-6">
            IT Security Intern at RTDS Gurgaon
          </div>

          <div className="w-14 h-14 ml-auto flex items-center justify-center">
            <img
              src={RTDS}
              alt="RTDS Gurgaon"
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

        {/* Spacer for bottom breathing room */}
        <div className="h-6"></div>
      </ul>
    </div>
  );
};

export default WorkBox;

