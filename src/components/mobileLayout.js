import React, { useState, useRef } from "react";
import about from './assets/icon_about.png';
import project from './assets/icon_project.png';
import work from './assets/icon_work3.png';
import edu from './assets/icon_edu2.png';
import links from './assets/icon_links.png';
import pfp from './assets/pfp2.jpg';
import MIS from './assets/MIS_logo.png';
import RVCE from './assets/RVCE_logo.png';
import sriaurobindo from './assets/SriAurobindoSociety_logo.png';
import IISC from './assets/IISC_logo.png';
import RTDS from './assets/rtds_logo.png';
import ButtonToggle from './buttonToggle';
import WaveCanvas from './wavebackground';
import RainCanvas from './RainCanvas';
import SlideInBox from './slideInBox';

export default function MobileLayout({
  nightMode, setNightMode,
  rainActive, setRainActive,
}) {
  const [activePanel, setActivePanel] = useState(null);
  const touchStartY = useRef(null);

  // Common button classes for equal sizing
  const buttonClass =
    "flex flex-col items-center bg-yellow-50 rounded-xl py-3 shadow h-[88px] w-full";

  // Swipe down to close logic
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 60) {
      setActivePanel(null);
      touchStartY.current = null;
    }
  };
  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  // Panel content mapping (desktop info brought in, with images)
  const panelContent = {
    about: {
      title: "about",
      content: (
        <div className="flex flex-col items-center text-center px-2 sm:px-4">
          <img src={pfp} alt="Suryanshu" className="w-28 h-28 rounded-full object-cover shadow-md mb-4" />
          <h2 className="text-3xl font-bold text-orange-500 mb-1">Suryanshu <span className="text-orange-400 text-xl align-middle">| सूर्यांशु</span></h2>
          <div className="text-lg text-gray-700 mb-2">Indian CSE-CY Student at R.V. College of Engineering, Bengaluru</div>
          <ul className="list-disc pl-6 text-left text-gray-600 text-base mb-4 space-y-1">
            <li>Hello there! I'm Suryanshu, a passionate engineer with a keen sense towards learning.</li>
            <li>I am an Indian software engineer with a passion for technology and a love for problem-solving.</li>
            <li>I have created this website to showcase my work and projects.</li>
            <li>Along with my work, I have also had leadership roles (Executive Secretary) in my school's Physics Club (Impulse).</li>
          </ul>
          <div className="w-full text-left">
            <p className="mt-4 font-semibold">Coding:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>leetcode: Rank 1,369,558</li>
              <li>hackerOne: ?</li>
              <li>Game Development</li>
            </ul>
            <p className="mt-4 font-semibold">Hobbies:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sketching</li>
              <li>Origami</li>
            </ul>
            <p className="mt-4 font-semibold">Language Proficiency:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hindi</li>
              <li>English</li>
              <li>French and Kannada (basic)</li>
            </ul>
          </div>
        </div>
      ),
    },
    links: {
      title: "links",
      content: (
        <div className="flex flex-col items-center text-center px-2 sm:px-4">
          <div className="grid grid-cols-3 gap-6 mb-6 mt-4">
            <a href="https://leetcode.com/u/Suryanshu_Das/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
              <img src={require('./assets/leetcode_logo.png')} alt="LeetCode" className="w-10 h-10" />
              <span className="mt-2 text-sm font-medium text-gray-800">leetcode</span>
            </a>
            <a href="https://github.com/TheLordNix" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
              <img src={require('./assets/hithub_logo.png')} alt="GitHub" className="w-10 h-10" />
              <span className="mt-2 text-sm font-medium text-gray-800">github</span>
            </a>
            <a href="https://www.linkedin.com/in/suryanshu-das-7a0002332/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform">
              <img src={require('./assets/linkedin_logo.png')} alt="LinkedIn" className="w-10 h-10" />
              <span className="mt-2 text-sm font-medium text-gray-800">linkedin</span>
            </a>
          </div>
          <div className="text-xs text-gray-500 pb-4">
            contact me @ <br />
            <span className="block font-medium">suryanshudas.03@gmail.com</span>
            <span className="block font-medium">+91-9319684823</span>
          </div>
        </div>
      ),
      maxHeight: "40vh",
    },
    work: {
      title: "work",
      content: (
        <div className="flex flex-col items-center text-left px-2 sm:px-4">
          <p className="mt-2 text-gray-700 text-base text-center">
            Work <span className="text-blue-500 text-lg">experience </span> shapes professionalism and decision-making. I'm grateful 
            for opportunities that strengthened my core skills needed, enhanced 
            communication in real-world contexts.
          </p>
          <ul className="space-y-4 pl-0 pr-0 mt-4">
            <li className="flex items-center relative">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                IT Security Intern at RTDS Gurgaon
              </div>
              <div className="w-14 h-14 ml-auto flex items-center justify-center">
                <img src={RTDS} alt="RTDS Gurgaon" className="max-w-full max-h-full" />
              </div>
            </li>
            <li className="flex items-center relative">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                Ethical Hacking Workshop at IISc Bengaluru (Certification)
              </div>
              <div className="w-14 h-14 ml-auto flex items-center justify-center">
                <img src={IISC} alt="IISc Bengaluru" className="max-w-full max-h-full" />
              </div>
            </li>
                        <li className="flex items-center relative">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                Student Teacher Assistant at Sri Aurobindo Society (Kechla)
              </div>
              <div className="w-14 h-14 ml-auto flex items-center justify-center">
                <img src={sriaurobindo} alt="Sri Aurobindo Society" className="max-w-full max-h-full" />
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    education: {
      title: "education",
      content: (
        <div className="flex flex-col items-center text-left px-2 sm:px-4">
          <p className="mt-2 text-gray-700 text-base text-center">
            <span className="text-blue-500 text-lg">Education </span>
            shapes character and outlook. I'm grateful to be part of institutions
            with over <span className="text-lg">60+</span> years of legacy that
            ignite curiosity, instill discipline, and foster the determination to
            pursue goals.
          </p>
          <ul className="space-y-4 pl-0 pr-0 mt-4">
            <li className="flex items-center relative">
              <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                <div className="font-semibold">Mother's International School, New Delhi (MIS) (2011-2024)</div>
                <ul className="list-disc list-inside text-base mt-1 space-y-1">
                  <li>CBSE X Grade: 90.8%</li>
                  <li>CBSE XII Grade: 90.6% (PCM, 94%)</li>
                </ul>
              </div>
              <div className="w-14 h-14 ml-auto flex items-center justify-center">
                <img src={MIS} alt="MIS" className="max-w-full max-h-full" />
              </div>
            </li>
            <li className="flex items-center relative">
              <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                <div className="font-semibold">R.V. College of Engineering, Bengaluru</div>
                <ul className="list-disc list-inside text-base mt-1 space-y-1">
                  <li>COMEDK: 809</li>
                  <li>Computer Science Engineering - Cyber Security</li>
                  <li>CGPA: 8.98</li>
                </ul>
              </div>
              <div className="w-14 h-14 ml-auto flex items-center justify-center">
                <img src={RVCE} alt="RVCE" className="max-w-full max-h-full" />
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    project: {
      title: "projects",
      content: (
        <div className="flex flex-col items-center text-left px-2 sm:px-4">
          <ul className="space-y-6">
            <li className="flex items-start relative">
              <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                <div className="font-semibold text-lg">
                  <a
                    href="https://github.com/TheLordNix/JumpShot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    JumpShot
                  </a>
                </div>
                <ul className="list-disc list-inside text-base mt-1 space-y-1">
                  <li>2D jumping game using C++ SDL2</li>
                  <li>Implemented physics-based shot arcs and collisions</li>
                </ul>
              </div>
              <div className="w-20 h-16 ml-auto flex items-center justify-center">
                <img src={require('./assets/jumpshot.png')} alt="JumpShot icon" className="max-w-full max-h-full" />
              </div>
            </li>
            <li className="flex items-start relative">
              <span className="absolute left-0 top-3 w-2 h-2 bg-gray-800 rounded-full"></span>
              <div className="ml-6 flex-1">
                <div className="font-semibold text-lg">
                  <a
                    href="https://github.com/TheLordNix/Conway-sGameofLife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Simulation of Conway's Game of Life
                  </a>
                </div>
                <ul className="list-disc list-inside text-base mt-1 space-y-1">
                  <li>Built interactive simulation with cell grid</li>
                  <li>Optimized with requestAnimationFrame</li>
                  <li>Implemented pattern presets and toggles</li>
                </ul>
              </div>
              <div className="w-20 h-16 ml-auto flex items-center justify-center">
                <img src={require('./assets/gameoflife.png')} alt="Conway icon" className="max-w-full max-h-full" />
              </div>
            </li>
          </ul>
        </div>
      ),
    },
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${nightMode ? 'bg-[#6b5d43]' : 'bg-[#ebc686]'}`}>
      {/* Rain overlay */}
      <RainCanvas rainActive={rainActive} nightMode={nightMode} mobile />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-transparent z-20">
        <div className="flex gap-2">
          <ButtonToggle
            label="night"
            isActive={nightMode}
            onToggle={() => setNightMode(!nightMode)}
          />
          <ButtonToggle
            label="rain"
            isActive={rainActive}
            onToggle={() => setRainActive(!rainActive)}
          />
        </div>
      </div>

      {/* Main Content (always rendered, blurred when panel open) */}
      <div className={`main-home-box flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-2 z-10 transition-all duration-300 ${activePanel ? 'pointer-events-none select-none opacity-70 blur-sm' : ''}`}>
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          hi! <span className="text-orange-500">i'm Suryanshu</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">student and engineer</p>
        {/* Top row: about, education, work */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-4">
          <button onClick={() => setActivePanel('about')} className={buttonClass + " rain-hitbox"}>
            <img src={about} alt="About" className="w-10 h-10" />
            <span className="font-bold text-base mt-2">about</span>
          </button>
          <button onClick={() => setActivePanel('education')} className={buttonClass + " rain-hitbox"}>
            <img src={edu} alt="Edu" className="w-10 h-10" />
            <span className="font-bold text-base mt-2">education</span>
          </button>
          <button onClick={() => setActivePanel('work')} className={buttonClass + " rain-hitbox"}>
            <img src={work} alt="Work" className="w-10 h-10" />
            <span className="font-bold text-base mt-2">work</span>
          </button>
        </div>
        {/* Bottom row: projects, links */}
        <div className="grid grid-cols-2 gap-4 w-60 max-w-xs">
          <button onClick={() => setActivePanel('project')} className={buttonClass + " rain-hitbox"}>
            <img src={project} alt="Project" className="w-10 h-10" />
            <span className="font-bold text-base mt-2">projects</span>
          </button>
          <button onClick={() => setActivePanel('links')} className={buttonClass + " rain-hitbox"}>
            <img src={links} alt="Links" className="w-10 h-10" />
            <span className="font-bold text-base mt-2">links</span>
          </button>
        </div>
      </div>

      {/* Slide-in Box */}
      <SlideInBox
        open={!!activePanel}
        onClose={() => setActivePanel(null)}
        title={activePanel ? panelContent[activePanel].title : ""}
        maxHeight={activePanel && panelContent[activePanel].maxHeight ? panelContent[activePanel].maxHeight : "80vh"}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activePanel ? panelContent[activePanel].content : null}
      </SlideInBox>

      {/* Wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <WaveCanvas nightMode={nightMode} />
      </div>
    </div>
  );
}