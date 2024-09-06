import { useEffect, useState } from 'react';
import hole from '/hole.png';
import mole from '/mole.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [seconds, setSeconds] = useState(30);
  const [gameActive, setGameActive] = useState(true);

  const MolesSetter = (index, changeTo) => {
    setMoles((curr) => {
      const newMoles = [...curr];
      newMoles[index] = changeTo;
      return newMoles;
    });
  };

  const whackMole = (idx) => {
    if (moles[idx] && seconds > 0 && gameActive) {
      MolesSetter(idx, false);
      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (seconds > 0 && gameActive) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, gameActive]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        MolesSetter(randomIndex, true);

        setTimeout(() => {
          MolesSetter(randomIndex, false);
        }, 1500);
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [moles, gameActive]);

  const restartGame = () => {
    setCount(0);
    setMoles(new Array(9).fill(false));
    setSeconds(30);
    setGameActive(true);
  };

  const endGame = () => {
    setGameActive(false);
  };

  return (
    <>
      <h1> Timer: {seconds} | Score: {count} </h1>

      {seconds === 0 || !gameActive ? (
        <div className="final-score-overlay">
          <h2>Your final score is: {count}</h2>
        </div>
      ) : null}

      <div className='main'>
        <div className='grid'>
          {moles.map((each, idx) => (
            <img
              key={idx}
              onClick={() => whackMole(idx)}
              src={each ? mole : hole}
              alt="mole"
            />
          ))}
        </div>
      </div>

      {/* Centered buttons with space around them */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary mx-3" onClick={restartGame}>Restart Game</button>
        <button className="btn btn-danger mx-3" onClick={endGame}>End Game</button>
      </div>
    </>
  );
}

export default App;
