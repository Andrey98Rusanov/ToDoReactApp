import React, { useState } from "react";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [id, setId] = useState(1);
  const [toDoData, setToDoData] = useState([]);

  function createToDoItem(label, taskTime) {
    setId((id) => id + 1);
    return {
      label,
      completed: false,
      edited: false,
      id: id,
      vision: true,
      date: new Date(),
      time: taskTime,
      timer: [0, 0],
    };
  }

  const deleteTask = (id) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      toDoData.splice(idx, 1);
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx);
      const newArr = [...before, ...after];
      return newArr;
    });
  };

  const addTask = (text, time) => {
    let newTask;
    if (text.split("").length !== 0 && text.split("")[0] !== " " && time) {
      newTask = createToDoItem(text, time);
      setToDoData((toDoData) => {
        const newArr = [...toDoData, newTask];
        return newArr;
      });
    }
  };

  const onToggleCompleted = (id) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldTask = toDoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx + 1);
      const newArr = [...before, newTask, ...after];
      return newArr;
    });
  };

  const onToggleEdited = (id, text) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldTask = toDoData[idx];
      const newTask = {
        ...oldTask,
        edited: !oldTask.edited,
        label: text,
      };
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx + 1);
      const newArr = [...before, newTask, ...after];
      if (!oldTask.completed) {
        return newArr;
      }
    });
  };

  const statusFilter = (text) => {
    if (text === "completed") {
      setToDoData((toDoData) => {
        const copy = toDoData.slice(0)
        for (const el of copy) {
          if (el.completed === false) {
            el.vision = false;
          } else el.vision = true;
        }
        return copy
      });
    }
    if (text === "all") {
      setToDoData((toDoData) => {
        const copy = toDoData.slice(0)
        for (const el of copy) {
          if (el.vision === false) {
            el.vision = true;
          }
        }
        return copy
      });
    }
    if (text === "active") {
      setToDoData((toDoData) => {
        const copy = toDoData.slice(0)
        for (const el of copy) {
          if (el.completed === true) {
            el.vision = false;
          } else el.vision = true;
        }
        return copy
      });
    }
  };

  const clearCompleted = () => {
    setToDoData((toDoData) => {
      const arr = toDoData.filter((el) => el.completed === false);
      return arr || [];
    });
  };

  const timeToTask = (arr, id) => {
    const idx = toDoData.findIndex((el) => el.id === id);
    const task = toDoData[idx];
    task.timer = arr;
    setToDoData(toDoData || []);
  };

  const completedCount =
    toDoData !== undefined
      ? toDoData.filter((el) => el.completed === false).length
      : 0;

  return (
    <div className="ToDoApp">
      <ToDoForm onAdd={addTask} />
      <ToDoList
        todos={toDoData}
        onDeleted={deleteTask}
        onToggleCompleted={onToggleCompleted}
        onToggleEdited={onToggleEdited}
        timeToTask={timeToTask}
      />
      <Footer
        completedCount={completedCount}
        statusFilter={statusFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}
export default App;
