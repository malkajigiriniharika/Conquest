import "./WheelIndex.css";
import { React, useEffect, useState } from "react";
import Wheel from "./Components/Wheel";
import Confetti from "./Components/Confetti";
import ReactPlayer from "react-player";

// Import video assets
import videoDutiesRights from "./sounds/STWV_duties_rights_fundamental.mp4";
import videoDirectivePrinciples from "./sounds/STWV_directive_principles.mp4";
import videoCivilRights from "./sounds/STWV_civil_rights.mp4";
import videoChildrenWomen from "./sounds/STWV_children_and_women.mp4";
import videoEnvironmentalRights from "./sounds/STWV_environment.mp4";
import videoElections from "./sounds/STWV_elections.mp4";

function WheelIndex() {
  const [spinning, setSpinning] = useState(false);
  const [winners, setWinners] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [showTopic, setShowTopic] = useState(false);

  if (window.localStorage.getItem("duration") === null)
    localStorage.setItem("duration", 10);

  if (window.localStorage.getItem("wheelColor") === null)
    localStorage.setItem("wheelColor", "#E50303");

  if (window.localStorage.getItem("fontColor") === null)
    localStorage.setItem("fontColor", "#FFFFFF");

  const [duration, setDuration] = useState(
    window.localStorage.getItem("duration")
  );

  const [wheelColor, setWheelColor] = useState(
    window.localStorage.getItem("wheelColor")
  );

  const [fontColor, setFontColor] = useState(
    window.localStorage.getItem("fontColor")
  );

  const [items, setItems] = useState(() => {
    const value = window.localStorage.getItem("itemsList");
    return value !== null
      ? JSON.parse(value)
      : [
          "fundamental rights and duties",
          "directive principles",
          "civil rights",
          "children and women",
          "environmental rights",
          "elections",
        ];
  });

  // Map items to video links
  const videoLinks = {
    "fundamental rights and duties": videoDutiesRights,
    "directive principles": videoDirectivePrinciples,
    "civil rights": videoCivilRights,
    "children and women": videoChildrenWomen,
    "environmental rights": videoEnvironmentalRights,
    "elections": videoElections,
  };

  const selectResultEventHandler = (data) => {
    if (items.length > 0 && spinning !== true) {
      const selectedIndex = data;
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
      }, window.localStorage.getItem("duration") * 1000);

      setTimeout(() => {
        const selectedItem = items[selectedIndex];
        setWinners(winners.concat(selectedItem));
        setSelectedVideoUrl(videoLinks[selectedItem]);
        setShowTopic(true);
      }, window.localStorage.getItem("duration") * 1000);
    }
  };

  const handlePlayVideo = () => {
    setShowTopic(false);
    setOpenModal(true);
    setPlayVideo(true);
  };

  const handleGoBack = () => {
    setPlayVideo(false);
    setOpenModal(false);
    setSelectedVideoUrl(null);
  };

  let newWinnerIndex = winners.length - 1;

  return (
    //<div className='border-box m-0 p-0'>
    //  <div className="WheelIndex">
        <div
          className="WheelIndex relative min-h-screen justify-evenly align-middle lg:flex md:flex-row sm:flex flex-row"
          style={{
            alignItems: "center",
            backgroundColor: "rgb(199,249,242)",
          }}
        >
          <Wheel
            items={items}
            onChange={selectResultEventHandler}
            spinning={spinning}
            wheelColor={wheelColor}
            fontColor={fontColor}
          />

          {showTopic && (
            <div className="p-10 bg-gradient-to-t from-green-600 to-green-400 h-1/2 sm:w-full my-3 md:w-1/2 lg:w-1/2 rounded-md">
              <div
                className="flex flex-col justify-center font-bold"
                style={{ alignItems: "center" }}
              >
                <h1
                  style={{ color: "#E50303" }}
                  className="text-xl tracking-wide"
                >
                  Selected Topic: {winners[newWinnerIndex]}
                </h1>
                <button
                  onClick={handlePlayVideo}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#28A745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Play Video
                </button>
              </div>
            </div>
          )}

          {playVideo && selectedVideoUrl && (
            <div
              className="video-container"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                zIndex: 1000,
              }}
            >
              <ReactPlayer
                url={selectedVideoUrl}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
              />
              <button
                onClick={handleGoBack}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#E50303",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Go Back
              </button>
            </div>
          )}

          {openModal && <Confetti />}
        </div>
    //  </div>
    //</div>
  );
}

export default WheelIndex;



