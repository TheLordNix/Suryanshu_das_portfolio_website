import React, { useEffect, useRef, useState } from "react";
import pfp from './assets/pfp.jpg'; // adjust relative path as needed

const AboutMeBox = ({ show, setShow }) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 60, top: 30 });
  const [zIndex, setZIndex] = useState(999);
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
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsDragging(true);

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
      className="bg-white p-0 rounded-2xl shadow-lg w-[800px] h-[450px] text-center overflow-hidden fixed"
      style={{ left: `${position.left}px`, top: `${position.top}px`, zIndex }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="bg-[#1c1c1c] text-white py-4 px-4 font-semibold text-xl flex justify-between items-center cursor-null"
      >
        <span>About</span>
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
      <div className="flex items-center p-6 gap-6">
        <img
          src={pfp}
          alt="Suryanshu"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-gray-800 leading-snug">
            <span className="text-blue-500">Suryanshu </span>
            <span className="text-orange-400 text-xl">| सूर्यांशु</span>
          </h1>
          <p className="text-gray-700 mt-2 max-w-sm">
            Indian CSE-CY Student at R.V. College of Engineering, Bengaluru
          </p>
        </div>
      </div>
      <div className="px-6 pl-12 pb-2 h-[220px] overflow-y-auto text-left text-gray-600 text-lg mt-1">
        <ul className="list-disc pl-10 space-y-1">
          <li>Hello there! I'm Suryanshu, a passionate engineer with a keen sense towards learning.</li>
          <li>I am an Indian software engineer with a passion for technology and a love for problem-solving.</li>
          <li>I have created this website to showcase my work and projects.</li>
          <li>Along with my work, I have also had leadership roles (Executive Secretary) in my school's Physics Club (Impulse).</li>
        </ul>

        <p className="mt-4 font-semibold">Coding:</p>
        <ul className="list-disc pl-10 space-y-1">
          <li>leetcode: Rank 1,369,558</li>
          <li>hackerOne: ?</li>
          <li>Game Development</li>
        </ul>

        <p className="mt-4 font-semibold">Hobbies:</p>
        <ul className="list-disc pl-10 space-y-1">
          <li>Sketching</li>
          <li>Origami</li>
        </ul>

        <p className="mt-4 font-semibold">Language Proficiency:</p>
        <ul className="list-disc pl-10 space-y-1">
          <li>Hindi</li>
          <li>English</li>
          <li>French and Kannada (basic)</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMeBox;
