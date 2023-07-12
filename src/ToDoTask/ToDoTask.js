import React, { useState, useEffect } from "react";
import "./ToDoTask.css";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

function ToDoTask(props) {
  function findTimerId() {
    const { toDoData, id } = props;
    const idx = toDoData.findIndex((el) => el.id === id);
    return idx;
  }

  const [label, setLabel] = useState(props.label);
  const [minutes, setMinutes] = useState(
    props.toDoData[findTimerId()].timer[0]
  );
  const [seconds, setSeconds] = useState(
    props.toDoData[findTimerId()].timer[1]
  );
  const [pause, setPause] = useState(false);

  const tick = () => {
    if (pause) return;
    props.timeToTask([minutes, seconds]);
    setSeconds((prev) => prev + 1);
    if (seconds === 59) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
  };

  function handleClickOutside(event) {
    const domNode = document.querySelector(".edited");
    if (domNode) {
      if (!domNode.contains(event.target) && props.edited || event.key === "Escape" && props.edited) {
        props.onToggleEdited(props.label);
        setLabel(props.label);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleClickOutside, true);
    document.addEventListener("click", handleClickOutside, true);
    const myInterval = setInterval(() => tick(), 1000);
    return  () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleClickOutside, true);
      clearInterval(myInterval);
    };
  }, [pause, handleClickOutside, props.edited]);

  function onStopClick() {
    setPause((prev) => !prev);
  }

  function onRestartClick() {
    setMinutes(0);
    setSeconds(0);
  }

  const onChange = (e) => {
    setLabel(e.target.value);
  };

  function timeOff() {
    const arr = props.time.split(":");
    const res = Number(arr[0]) * 60 + Number(arr[1]);
    if (res === minutes * 60 + seconds && pause === false) {
      props.timeToTask([minutes, seconds]);
      setPause(true);
    }
    return res;
  }

  const { completed, edited, date } = props;

  let className = "item";
  if (completed) {
    className += " completed";
  }
  if (edited)
    return (
      <form className="edited">
        <button
          className="bi bi-check-lg"
          onClick={() => props.onToggleEdited(label)}
        />
        <input
          className="edited__input"
          value={label}
          onChange={onChange}
          autoFocus
        />
      </form>
    );

  const startClass = pause ? "bi bi-skip-start" : "bi bi-stop-fill";
  const timeLimit =
    minutes * 60 + seconds === timeOff() ? (
      "time off"
    ) : (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );

  return (
    <div className="task">
      <div className={className}>
        <input type="checkbox" onClick={props.onToggleCompleted} />
        <div className="text">{label}</div>
      </div>
      <div className="Timer">
        {timeLimit}
        {timeLimit === "time off" ? null : (
          <button className={startClass} onClick={() => onStopClick()} />
        )}
        <button
          className="bi bi-arrow-repeat"
          onClick={() => onRestartClick()}
        />
      </div>
      <span className="task__time">
        {`${formatDistanceToNow(date, {
          includeSeconds: true,
        })}`}
      </span>
      <div className="task__btn">
        <button
          className="bi bi-pencil-fill"
          onClick={() => props.onToggleEdited(label)}
        />
        <button className="bi bi-trash3-fill" onClick={props.onDeleted} />
      </div>
    </div>
  );
}

export default ToDoTask;

ToDoTask.defaultProps = {
  completed: false,
  edited: false,
  date: new Date(),
  label: "hey!",
  onToggleCompleted: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
  toDoData: [],
  id: 0,
  timeToTask: () => {},
  time: "00:00",
};

ToDoTask.propTypes = {
  completed: PropTypes.bool,
  edited: PropTypes.bool,
  label: PropTypes.string,
  date: PropTypes.any,
  onToggleCompleted: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  toDoData: PropTypes.array,
  id: PropTypes.number,
  timeToTask: PropTypes.func,
  time: PropTypes.string,
};
