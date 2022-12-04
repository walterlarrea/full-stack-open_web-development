const Header = ({ course }) => <h3>{course.name}</h3>

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)

  return <p><b>total of {total} exercises</b></p>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Course = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course