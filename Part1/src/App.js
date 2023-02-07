function Header({ course }) {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
};

function Part({ part, exercise }) {
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  )
};

function Content({ children }) {
  return (
    <>
      {children}
    </>
  )
};

const Total = (props) => (
  <>
    <p>Number of exercises {props.total}</p>
  </>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  }
  const part3 = {
    name: "State of a component",
    exercises: 14,
  }

  return (
    <>
      <Header course={course} />
      <Content>
        <Part part={part1.name} exercise={part1.exercises} />
        <Part part={part2.name} exercise={part2.exercises} />
        <Part part={part3.name} exercise={part3.exercises} />
      </Content>
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
};

export default App;
