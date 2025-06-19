import React, { useState } from "react";
import LinkBox from "LinkBox";
import ProjectBox from "ProjectBox";
import AboutMeBox from "AboutMeBox";
import EducationBox from "EducationBox";
import WorkBox from "WorkBox";

const BoxesContainer = () => {
  const [zIndexes, setZIndexes] = useState({});
  const [globalZ, setGlobalZ] = useState(1000);

  const bringToFront = (boxId) => {
    setGlobalZ((prevGlobalZ) => {
      const newZ = prevGlobalZ + 1;
      setZIndexes((prevZIndexes) => ({
        ...prevZIndexes,
        [boxId]: newZ,
      }));
      return newZ;
    });
  };

  const [showLinks, setShowLinks] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showAboutMe, setShowAboutMe] = useState(true);
  const [showEdu, setShowEdu] = useState(true);
  const [showWork, setShowWork] = useState(true);

  return (
    <>
      <LinkBox
        show={showLinks}
        setShow={setShowLinks}
        zIndex={zIndexes["links"] || 1000}
        bringToFront={() => bringToFront("links")}
      />
      <ProjectBox
        show={showProjects}
        setShow={setShowProjects}
        zIndex={zIndexes["projects"] || 1000}
        bringToFront={() => bringToFront("projects")}
      />
      <AboutMeBox
        show={showAboutMe}
        setShow={setShowAboutMe}
        zIndex={zIndexes["aboutMe"] || 1000}
        bringToFront={() => bringToFront("aboutMe")}
      />
      <EducationBox
        show={showEdu}
        setShow={setShowEdu}
        zIndex={zIndexes["edu"] || 1000}
        bringToFront={() => bringToFront("edu")}
      />
      <WorkBox
        show={showWork}
        setShow={setShowWork}
        zIndex={zIndexes["work"] || 1000}
        bringToFront={() => bringToFront("work")}
      />
    </>
  );
};

export default BoxesContainer;
