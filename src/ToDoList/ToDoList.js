import React from 'react';
import ToDoTask from '../ToDoTask/ToDoTask';
import "./ToDoList.css"

const ToDoList = ({ todos, onDeleted, onToggleCompleted, onToggleEdited }) => {
  const elements = todos.map((el) => {
    const { id,vision, ...items } = el
    let className = "list-group-item"
    if (vision === false) className+=" none"
    return (
      <li key={id} className={className}>
        <ToDoTask {...items}
        onDeleted = {()=> onDeleted(id)}
        onToggleCompleted = {()=>onToggleCompleted(id)}
        onToggleEdited = {() => onToggleEdited(id)}/>
      </li>
    )
  })

  return (
    <ul className="list-group">
      {elements}
    </ul>
  )
}

export default ToDoList