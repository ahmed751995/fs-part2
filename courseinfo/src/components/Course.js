import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, value) => sum + value.exercises, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p>total of {total} exercises</p>
    </>
  );
};

export default Course;
