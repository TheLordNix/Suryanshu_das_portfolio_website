import React from "react";
import JumpShot from './assets/jumpshot.png';
import GameofLife from './assets/gameoflife.png';
import useDraggable from "../hooks/useDraggable";

const ProjectBox = ({ show, setShow, zIndex, bringToFront }) => {
  const { boxRef, position, zIndex: localZ, onMouseDown } = useDraggable({ x: 60, y: 70 });

  if (!show) return null;

  return (
    <div
      id="draggable-box"
      ref={boxRef}
      className="bg-white p-0 rounded-2xl shadow-lg w-[750px] h-[450px] text-center overflow-hidden fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex || localZ,
      }}
      onMouseDown={bringToFront}
    >
      <div
        onMouseDown={onMouseDown}
        className="bg-[#1c1c1c] text-white py-4 px-4 font-semibold text-xl flex justify-between items-center cursor-move"
      >
        <span>Projects</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
          className="text-white text-lg font-bold hover:scale-110 transition-transform"
          aria-label="Close Project Box"
        >
          [x]
        </button>
      </div>

      <ul className="space-y-4 pl-10 pr-8 pt-10 pb-4 overflow-y-auto text-left">
        {/* Project 1 */}
        <li className="flex items-start relative">
          <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>

          <div className="ml-6 flex-grow">
            <div className="font-semibold text-2xl">
              <a
                href="https://github.com/TheLordNix/JumpShot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                JumpShot
              </a>
            </div>
            <ul className="list-disc list-inside text-lg mt-1 space-y-1">
              <li>2D jumping game using C++ SDL2</li>
              <li>Implemented physics-based shot arcs and collisions</li>
            </ul>
          </div>

          <div className="w-48 h-36 ml-auto flex items-center justify-center">
            <img
              src={JumpShot}
              alt="JumpShot icon"
              className="max-w-full max-h-full"
            />
          </div>
        </li>

        {/* Project 2 */}
        <li className="flex items-start relative">
          <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>

          <div className="ml-6 flex-grow">
            <div className="font-semibold text-2xl">
              <a
                href="https://github.com/TheLordNix/Conway-sGameofLife"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Simulation of Conway's Game of Life
              </a>
            </div>
            <ul className="list-disc list-inside text-lg mt-1 space-y-1">
              <li>Built interactive simulation with cell grid</li>
              <li>Optimized with requestAnimationFrame</li>
              <li>Implemented pattern presets and toggles</li>
            </ul>
          </div>

          <div className="w-48 h-36 ml-auto flex items-center justify-center">
            <img
              src={GameofLife}
              alt="Conway icon"
              className="max-w-full max-h-full"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProjectBox;
