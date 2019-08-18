import React from 'react'

const Part = (props) => {
    const part = props.part
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>  
    )
}

const Content = (props) => {
    const parts = props.parts
    
    const allParts = () => {
        return (
          parts.map(part => 
              <Part key={part.id} part={part}/>
          )
        )
    }

    return (
      <div>
        {allParts()}
      </div>  
    )
  }

const Header = (props) => {
    return (
      <div>
        <h1> {props.name} </h1>
      </div>  
    )
}


const Total = (props) => {
    const parts = props.parts

    const total = parts.reduce( (previous, current) =>
                    (previous + current.exercises), 0
    )               
    return (
        <div>
            <b>Total of {total} exercises.</b>
        </div>  
    )
}

const Course = (props) => {
    const course = props.course
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>  
    )
}


export default Course