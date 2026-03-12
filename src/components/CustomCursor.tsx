import { useEffect, useState } from 'react';

interface CursorProps {
  color?: string;
}

export function useCustomCursor(color: string = '#14b8a6') {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.closest('a') || target.closest('button') ||
          target.classList.contains('hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return { position, isHovering };
}

export function CustomCursor({ color = '#14b8a6' }: CursorProps) {
  const { position, isHovering } = useCustomCursor(color);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          borderColor: color,
          opacity: isHovering ? 0.5 : 0.3,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

// Hide default cursor on desktop
export function CursorStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (min-width: 1024px) {
        body {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}
