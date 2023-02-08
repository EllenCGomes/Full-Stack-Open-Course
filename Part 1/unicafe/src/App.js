import { useState } from "react";

const Button = ({ onClick, value }) => <button onClick={onClick}>{value} </button>

const Display = ({ title }) => <h3>{title}</h3>

const Statistics = ({ title, value }) => <p>{title} {value}</p>



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const all = good + bad + neutral;
  const avg = (good !== 0 && bad !== 0) ? (good - bad) / all : 0;
  const positive = (good !== 0) ? `${(good / all) * 100} %` : `${0} %`


  return (
    <div>
      <Display title="Give FeedBack" />
      <Button onClick={handleGood} value="good" />
      <Button onClick={handleNeutral} value="neutral" />
      <Button onClick={handleBad} value="bad" />
      <Display title="Statistics" />
      <Statistics title="good" value={good} />
      <Statistics title="neutral" value={neutral} />
      <Statistics title="bad" value={bad} />
      <Statistics title="all" value={all} />
      <Statistics title="average" value={avg} />
      <Statistics title="positive" value={positive} />

    </div>
  );
}

export default App;
