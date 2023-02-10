const Course = (props) => {
  const sumExercises = props.course.parts.map(item => item.exercises).reduce((sum, i) => sum + i);
  return (
    <>
      <Header course={props.course.name} />
      <Content>
        {props.course.parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}></Part>)}
      </Content>
      <Total exercises={sumExercises} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
};

const Content = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
};

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  )
};

const Total = ({ exercises }) => {

  return (
    <>
      <p>Number of exercises {exercises}</p>
    </>
  )
};

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {course.map(course => <Course key={course.id} course={course} />)}
    </>
  )
};

export default App;

