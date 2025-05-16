import React, { useState, useEffect } from 'react';

function FightTimer({ fight, onStart, onEnd }) {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(fight.is_active);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
        onStart();
    };

    const handleEnd = () => {
        setIsRunning(false);
        onEnd();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="card p-4 mb-4 text-center">
            <h3>Tiempo de Combate</h3>
            <h4>{formatTime(time)}</h4>
            <div>
                {!isRunning ? (
                    <button className="btn btn-success mx-2" onClick={handleStart}>
                        Iniciar
                    </button>
                ) : (
                    <button className="btn btn-danger mx-2" onClick={handleEnd}>
                        Finalizar
                    </button>
                )}
            </div>
        </div>
    );
}

export default FightTimer;