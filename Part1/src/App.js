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
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </Content>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </>
  )
};

export default App;
