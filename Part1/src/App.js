const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <>
    <p>{props.part}</p>
  </>
);

const Content = (props) => (
  <>
    <Part part={props.part1} />
    <Part part={props.part2} />
    <Part part={props.part3} />
  </>
);

const Total = (props) => (
  <>
    <p>Number of exercises {props.total}</p>
  </>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
};

export default App;
