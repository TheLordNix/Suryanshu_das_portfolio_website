import React, { useState } from 'react';
import useIsMobile from './hooks/useMobile';
import MobileLayout from './components/mobileLayout';
import RainCanvas from './components/RainCanvas';
import WaveCanvas from './components/wavebackground';
import EducationBox from './components/educationBox';
import LinksBox from './components/linksBox';
import WorkBox from './components/workBox';
import ProjectBox from './components/projectsBox';
import AboutBox from './components/aboutMeBox';
import ButtonToggle from './components/buttonToggle';
import work from './components/assets/icon_work3.png';
import edu from './components/assets/icon_edu2.png';
import project from './components/assets/icon_project.png';
import about from './components/assets/icon_about.png';
import links from './components/assets/icon_links.png';

export default function App() {
  const [rainActive, setRainActive] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  const [showEducation, setShowEducation] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Z-index management
  const [zIndexes, setZIndexes] = useState({});
  const [globalZ, setGlobalZ] = useState(1000);

  const bringToFront = (boxId) => {
    setGlobalZ((prev) => prev + 1);
    setZIndexes((prev) => ({
      ...prev,
      [boxId]: globalZ + 1,
    }));
  };

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileLayout
        setShowAbout={setShowAbout}
        setShowProject={setShowProject}
        setShowWork={setShowWork}
        setShowEducation={setShowEducation}
        setShowLinks={setShowLinks}
        nightMode={nightMode}
        rainActive={rainActive}
        setNightMode={setNightMode}
        setRainActive={setRainActive}
      />
    );
  }

  return (
    <div
      className={`relative transition-all duration-700 h-screen overflow-hidden ${
        nightMode ? 'bg-[#6b5d43]' : 'bg-[#ebc686]'
      }`}
    >
      <RainCanvas rainActive={rainActive} nightMode={nightMode} />
      <WaveCanvas nightMode={nightMode} />

      {/* Buttons container */}
      <div className="fixed top-4 right-4 flex gap-4 z-30">
        <ButtonToggle
          label="rain"
          isActive={rainActive}
          onToggle={() => setRainActive(!rainActive)}
        />
        <ButtonToggle
          label="night"
          isActive={nightMode}
          onToggle={() => setNightMode(!nightMode)}
        />
      </div>

      <main className="w-full h-full flex flex-col items-center justify-center relative z-10 overflow-hidden">
        <div
          id="home-box" 
          className="bg-white rounded-2xl shadow-lg w-full max-w-3xl text-center overflow-hidden draggable relative z-20"
        >
          <div className="bg-[#1c1c1c] text-white py-4 px-8 font-semibold text-xl text-left">
            Home
          </div>
          <div className="p-12 pb-16">
            <h1 className="text-5xl font-bold text-gray-800 mt-6">
              hi! <span className="text-orange-500">i'm Suryanshu</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4">a student and engineer</p>
          </div>
          <div className="flex justify-center gap-12 py-8">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowAbout(!showAbout)}
            >
              <img src={about} alt="About" className="w-12 h-12" />
              <p className="text-sm text-gray-700 mt-2">About</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowProject(!showProject)}
            >
              <img src={project} alt="Project" className="w-12 h-12" />
              <p className="text-sm text-gray-700 mt-2">Project</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowWork(!showWork)}
            >
              <img src={work} alt="Work" className="w-12 h-12" />
              <p className="text-sm text-gray-700 mt-2">Experience</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowEducation(!showEducation)}
            >
              <img src={edu} alt="Edu" className="w-12 h-12" />
              <p className="text-sm text-gray-700 mt-2">Education</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowLinks(!showLinks)}
            >
              <img src={links} alt="Links" className="w-12 h-12" />
              <p className="text-sm text-gray-700 mt-2">Links</p>
            </div>
          </div>
        </div>
      </main>

      {/* Draggable Boxes with zIndex & bringToFront props */}
      <EducationBox
        show={showEducation}
        setShow={setShowEducation}
        zIndex={zIndexes["edu"] || 1000}
        bringToFront={() => bringToFront("edu")}
      />
      <LinksBox
        show={showLinks}
        setShow={setShowLinks}
        zIndex={zIndexes["links"] || 1000}
        bringToFront={() => bringToFront("links")}
      />
      <WorkBox
        show={showWork}
        setShow={setShowWork}
        zIndex={zIndexes["work"] || 1000}
        bringToFront={() => bringToFront("work")}
      />
      <ProjectBox
        show={showProject}
        setShow={setShowProject}
        zIndex={zIndexes["proj"] || 1000}
        bringToFront={() => bringToFront("proj")}
      />
      <AboutBox
        show={showAbout}
        setShow={setShowAbout}
        zIndex={zIndexes["about"] || 1000}
        bringToFront={() => bringToFront("about")}
      />
    </div>
  );
}
