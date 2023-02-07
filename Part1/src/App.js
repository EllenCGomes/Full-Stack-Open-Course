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
  const course = {
    name: "Half Stack application development",
    parts: [
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
  }
  return (
    <>
      <Header course={course.name} />
      <Content>
        <Part part={course.parts[0].name} exercise={course.parts[0].exercises} />
        <Part part={course.parts[1].name} exercise={course.parts[1].exercises} />
        <Part part={course.parts[2].name} exercise={course.parts[2].exercises} />
      </Content>
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </>
  )
};

export default App;
