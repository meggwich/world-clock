import React, { useEffect, useState } from 'react';

interface ClockProps {
  name: string;
  timeZone: string; // Время в формате "HH:MM:SS"
  onRemove: () => void; // Функция для удаления часов
}
 
const Clock: React.FC<ClockProps> = ({ name, timeZone, onRemove }) => {
  const [time, setTime] = useState(new Date());

  // Обновляем время каждую секунду
  useEffect(() => {
    const [hours, minutes, seconds] = timeZone.split(':').map(Number);
    const initialTime = new Date();
    initialTime.setUTCHours(hours, minutes, seconds);

    setTime(initialTime);

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setSeconds(newTime.getSeconds() + 1);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  // Вычисляем углы для стрелок
  const hours = time.getUTCHours() % 12;
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();

  const hoursDegree = (360 / 12) * hours + (30 / 60) * minutes;
  const minutesDegree = (360 / 60) * minutes + (6 / 60) * seconds;
  const secondsDegree = (360 / 60) * seconds;

  return (
    <div className="clock-box">
      <h2>{name}</h2>
      <button className="cross-button" onClick={onRemove}>
        ✖
      </button>
      <div className="clock">
        {/* Рисуем деления на циферблате */}
        {Array.from({ length: 60 }).map((_, index) => (
          <span
            key={index}
            className={`clock__stroke ${
              index % 5 === 0 ? '' : 'clock__stroke--small'
            } clock__stroke--${index + 1}`}
          />
        ))}

        {/* Стрелки часов */}
        <div className="clock__hand-container">
          <span
            className="clock__hand clock__hand--hour"
            style={{ transform: `rotate(${hoursDegree}deg)` }}
          />
          <span
            className="clock__hand clock__hand--minute"
            style={{ transform: `rotate(${minutesDegree}deg)` }}
          />
          <span
            className="clock__hand clock__hand--second"
            style={{ transform: `rotate(${secondsDegree}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clock;