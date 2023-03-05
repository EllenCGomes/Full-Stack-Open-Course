import { useState } from "react";

const Button = ({ onClick, value }) => <button onClick={onClick}>{value}</button>

const Header = ({ title }) => <h3>{title}</h3>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td style={{ paddingLeft: "20px" }}>{value}</td>
    </tr>
  )
}
const Statistics = ({ isShown, children }) => {
  if (isShown) {
    return (
      <table>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>

}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const all = good + bad + neutral;
  const avg = (good !== 0 && bad !== 0) ? (good - bad) / all : 0;
  const positive = (good !== 0) ? `${(good / all) * 100}%` : 0

  const isShow = (all !== 0) ? true : false

  return (
    <div>
      <Header title="Give FeedBack" />
      <Button onClick={handleGood} value="good" />
      <Button onClick={handleNeutral} value="neutral" />
      <Button onClick={handleBad} value="bad" />
      <Header title="Statistics" />
      <Statistics isShown={isShow}>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positive} />
      </Statistics>
    </div>
  );
}

export default App;
