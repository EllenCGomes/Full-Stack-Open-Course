import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, title }) => <button onClick={handleClick}>{title}</button>


const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);


  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} title="plus" />
      <Button handleClick={decreaseByOne} title="minus" />
      <Button handleClick={setToZero} title="reset" />
    </>
  );
}

export default App;
