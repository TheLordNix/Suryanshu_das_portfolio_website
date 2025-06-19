import { useState, useRef, useEffect } from 'react';

export default function useDraggable(initialPosition = { x: 0, y: 0 }) {
  const [position, setPosition] = useState(initialPosition);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // mouse down handler
  const onMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };
  
  // mouse move handler
  const onMouseMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
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

  return { position, onMouseDown };
}
