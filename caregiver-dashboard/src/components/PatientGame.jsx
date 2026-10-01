
import { useEffect, useState } from 'react';
const POOL = ['🍵', '🌾', '🐘', '🎋', '🥁', '🌺', '🦚', '🏔️', '🎣', '🛶'];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function PatientGame({ onFinish, patientName }) {
  const [difficultyLevel, setDifficultyLevel] = useState(2);
  const [target, setTarget] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]);
  const [roundStart, setRoundStart] = useState(Date.now());
  const [result, setResult] = useState(null); // { score, accuracy, nextLevel } once finished

  useEffect(() => {
    newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function newRound() {
    const gridSize = Math.min(8, Math.max(3, difficultyLevel + 2));
    const shuffled = shuffle(POOL);
    setTarget(shuffled[0]);
    setOptions(shuffle(shuffled.slice(0, gridSize)));
    setRoundStart(Date.now());
  }

  function onOptionClick(opt) {
    const elapsed = Date.now() - roundStart;
    const newTimes = [...responseTimes, elapsed];
    setResponseTimes(newTimes);

    const correct = opt === target;
    const newScore = correct ? score + 10 * difficultyLevel : score;
    const newCorrectCount = correct ? correctCount + 1 : correctCount;
    const newRound = round + 1;

    setScore(newScore);
    setCorrectCount(newCorrectCount);
    setRound(newRound);

    if (newRound >= 5) {
      finishSession(newScore, newCorrectCount, newRound, newTimes);
    } else {
      newRoundReset();
    }
  }

  function newRoundReset() {
    const gridSize = Math.min(8, Math.max(3, difficultyLevel + 2));
    const shuffled = shuffle(POOL);
    setTarget(shuffled[0]);
    setOptions(shuffle(shuffled.slice(0, gridSize)));
    setRoundStart(Date.now());
  }

    function finishSession(finalScore, finalCorrect, totalRounds, times) {
    const accuracy = finalCorrect / totalRounds;
    const avgResponseTime = times.reduce((a, b) => a + b, 0) / times.length;

    let nextLevel = difficultyLevel;
    if (accuracy >= 0.85 && avgResponseTime < 4000) nextLevel = Math.min(5, difficultyLevel + 1);
    else if (accuracy < 0.5 || avgResponseTime > 9000) nextLevel = Math.max(1, difficultyLevel - 1);

    const session = {
      id: Date.now().toString(),
      game_type: 'pattern_match',
      score: finalScore,
      accuracy,
      avg_response_time_ms: avgResponseTime,
      difficulty_level: difficultyLevel,
      timestamp: new Date().toISOString(),
    };

    import('../store.js').then(({ addSession }) => addSession(session, patientName));
    setResult({ score: finalScore, accuracy, nextLevel });
  }

  if (result) {
    return (
      <div className="patient-shell">
        <div className="patient-result-card">
          <h2>Well done!</h2>
          <p>Score: {result.score}</p>
          <p>Accuracy: {Math.round(result.accuracy * 100)}%</p>
          <p>Next round difficulty: {result.nextLevel}</p>
          <button
            className="patient-tile patient-tile-small"
            onClick={() => onFinish && onFinish()}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-shell">
      <p className="patient-round-label">Round {round + 1} of 5</p>
      <p className="patient-instruction">Find this:</p>
      <div className="patient-target">{target}</div>

      <div className="patient-game-grid">
        {options.map((opt, i) => (
          <button key={i} className="patient-game-tile" onClick={() => onOptionClick(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
