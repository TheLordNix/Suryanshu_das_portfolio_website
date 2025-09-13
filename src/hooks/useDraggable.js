import { useState, useRef, useEffect } from 'react';

export default function useDraggable(initialPosition = { x: 60, y: 30 }) {
  const [position, setPosition] = useState(initialPosition);
  const [zIndex, setZIndex] = useState(999);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  // mouse down handler
  const onMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;

    const rect = boxRef.current?.getBoundingClientRect();
    startPos.current = {
      x: e.clientX - (rect?.left || 0),
      y: e.clientY - (rect?.top || 0),
    };

    // bump z-index
    const allBoxes = document.querySelectorAll("[id='draggable-box']");
    let maxZ = 999;
    allBoxes.forEach((box) => {
      const z = parseInt(window.getComputedStyle(box).zIndex) || 999;
      if (z > maxZ) maxZ = z;
    });
    setZIndex(maxZ + 1);
  };

  // mouse move handler
  const onMouseMove = (e) => {
    if (!isDragging.current || !boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    const boxWidth = rect.width;
    const boxHeight = rect.height;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newX = e.clientX - startPos.current.x;
    let newY = e.clientY - startPos.current.y;

    // ✅ clamp inside viewport
    newX = Math.max(0, Math.min(newX, viewportWidth - boxWidth));
    newY = Math.max(0, Math.min(newY, viewportHeight - boxHeight));

    setPosition({ x: newX, y: newY });
  };

  // mouse up handler
  const onMouseUp = () => {
    isDragging.current = false;
  };

  // attach/remove listeners globally
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return { boxRef, position, zIndex, onMouseDown };
}
