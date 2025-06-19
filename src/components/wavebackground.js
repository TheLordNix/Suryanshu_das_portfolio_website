import React, { useState, useEffect, useRef } from "react";
import Wavify from "react-wavify";

const WaveBackground = ({ nightMode }) => {
  const [svgHeight, setSvgHeight] = useState(750);
  const [waveBaseline, setWaveBaseline] = useState(650); // initial baseline
  const [amplitude, setAmplitude] = useState(50);
  const [speed, setSpeed] = useState(0.15);
  const [points, setPoints] = useState(4);
  const animationRef = useRef(null);

  const prevNightMode = useRef(nightMode);

  useEffect(() => {
    const animateValue = (from, to, setter, duration = 1000) => {
      const start = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = from + (to - from) * progress;
        setter(value);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        }
      };

      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(step);
    };

    if (nightMode !== prevNightMode.current) {
      // Animate both height and baseline
      animateValue(
        waveBaseline,
        nightMode ? 400 : 650, // baseline: smaller means wave appears higher
        setWaveBaseline
      );

      setSvgHeight(nightMode ? (window.innerHeight + 350) : 750); // animate via CSS
      setAmplitude(nightMode ? 70 : 50);
      setSpeed(nightMode ? 0.18 : 0.12);
      setPoints(nightMode ? 4 : 4);

      prevNightMode.current = nightMode;
    }
    
    return () => cancelAnimationFrame(animationRef.current);
  }, [nightMode]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-0 pointer-events-none"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Wavify
        fill={nightMode ? "#0a1736" : "#4a8fff"}
        paused={false}
        options={{
          height: waveBaseline,
          amplitude,
          speed,
          points,
        }}
        style={{
          width: "100%",
          height: `${svgHeight}px`,
          position: "absolute",
          bottom: 0,
          transition: "height 1s ease-in-out",
        }}
      />
    </div>
  );
};

export default WaveBackground;
