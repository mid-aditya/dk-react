import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    // Start at bottom-rightish position by default or saved position
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Adjust initial position if needed on mount
        setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        // Prevent default browser actions (like scrolling) strictly on the button
        e.preventDefault();
        
        isDragging.current = false;
        
        // Calculate offset where the user clicked relative to button "origin" (top-left of button)
        // But since we position by Top/Left, we just need current mouse vs current pos.
        // Actually simplest is to track delta.
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };

        const handlePointerMove = (moveEvent: PointerEvent) => {
            // Check formatted distance to determine if it's a drag
            isDragging.current = true;
            
            let newX = moveEvent.clientX - dragStart.current.x;
            let newY = moveEvent.clientY - dragStart.current.y;

            // Optional: Boundary checks to keep button on screen
            const maxX = window.innerWidth - 60; // Button approx 48px + margin
            const maxY = window.innerHeight - 60;

            newX = Math.max(10, Math.min(newX, maxX));
            newY = Math.max(10, Math.min(newY, maxY));

            setPosition({ x: newX, y: newY });
        };

        const handlePointerUp = () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
            
            // If we didn't really drag (flag wasn't set or movement was tiny), it's a click
            // However, pointermove fires very easily. 
            // We can resolve this by checking dragging state in handleClick or here.
            // But separating click and drag is cleaner with a timeout or threshold.
            // For now, relies on isDragging flag set in move. 
            // If move never fired, isDragging is false.
        };

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };

    const handleClick = () => {
        // If we were dragging, do not toggle
        if (!isDragging.current) {
            toggleTheme();
        }
    };

    if (!isClient) return null;

    return (
        <button
            onPointerDown={handlePointerDown}
            onClick={handleClick}
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 9999,
                touchAction: 'none', // Critical for dragging on touch devices
            }}
            className={`
                w-14 h-14 rounded-full border-none shadow-[0_4px_12px_rgba(0,0,0,0.3)] 
                cursor-grab active:cursor-grabbing flex items-center justify-center 
                transition-colors duration-300
                ${theme === 'light' 
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                    : 'bg-white text-slate-800 hover:bg-gray-100'}
            `}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            <i className={`bx ${theme === 'light' ? 'bx-moon' : 'bx-sun'} text-2xl pointer-events-none`}></i>
        </button>
    );
};

export default FloatingThemeToggle;
