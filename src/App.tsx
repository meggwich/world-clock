import './App.css';
import Clock from './components/Clock';
import { useState } from 'react';

function App() {
  const [clocks, setClocks] = useState<{ name: string; timeZone: string; }[]>([]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const timeZone = (form.elements.namedItem('time-zone') as HTMLInputElement).value;
    setClocks([...clocks, { name, timeZone }]);
    form.reset();
  };

  // Функция для удаления часов по индексу
  const removeClock = (index: number) => {
    setClocks((prevClocks) => prevClocks.filter((_, i) => i !== index));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="input-box">
          <label htmlFor="name">City</label>
          <input type="text" name="name" />
        </div>

        <div className="input-box">
          <label htmlFor="time-zone">Time zone</label>
          <input type="text" name="time-zone" />
        </div>
        <button className='form-btn'>add</button>
      </form>

      <div className="clock-container">
        {clocks.map((clock, index) => (
          <Clock
            key={index}
            {...clock}
            onRemove={() => removeClock(index)} // Передаем функцию удаления
          />
        ))}
      </div>
    </>
  );
}

export default App;