import Header from "./Header";
import Content from "./Content";
import Part from "./Part";
import Total from "./Total";

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

export default Course;