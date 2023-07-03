import React from "react";
import "./ToDoTask.css";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

export default class ToDoTask extends React.Component {
  state = {
    label: this.props.label,
    minutes: this.props.toDoData[this.findTimerId()].timer[1],
    seconds: this.props.toDoData[this.findTimerId()].timer[2],
    hours: this.props.toDoData[this.findTimerId()].timer[0],
    pause: false,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { hours, minutes, seconds, pause } = this.state;
      if (pause !== true) {
        this.props.timeToTask([hours, minutes, seconds]);
        this.setState(({ seconds }) => ({
          seconds: seconds + 1,
        }));
      }
      if (seconds === 59) {
        this.setState(({ minutes }) => ({
          minutes: minutes + 1,
          seconds: 0,
        }));
      }
      if (minutes === 59 && seconds === 59) {
        this.setState(({ hours }) => ({
          hours: hours + 1,
          minutes: 0,
          seconds: 0,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  onStopClick() {
    this.setState(({ pause }) => ({
      pause: !pause,
    }));
  }

  onRestartClick() {
    this.setState({
      minutes: 0,
      seconds: 0,
    });
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  timeOff() {
    const { hours, minutes, seconds } = this.state;
    const arr = this.props.time.split(":");
    const res = Number(arr[0]) * 60 + Number(arr[1]);
    if (res === hours * 60 + minutes && this.state.pause === false) {
      this.props.timeToTask([hours, minutes, seconds]);
      this.setState({
        pause: true,
      });
    }
    return res;
  }

  findTimerId() {
    const { toDoData, id } = this.props;
    const idx = toDoData.findIndex((el) => el.id === id);
    return idx;
  }

  render() {
    const { completed, edited, date } = this.props;

    let className = "item";
    if (completed) {
      className += " completed";
    }
    if (edited)
      return (
        <form className="edited">
          <button
            className="bi bi-check-lg"
            onClick={this.props.onToggleEdited}
          />
          <input
            className="edited__input"
            value={this.state.label}
            onChange={this.onChange}
          />
        </form>
      );

    const { hours, minutes, seconds, pause } = this.state;
    const startClass = pause ? "bi bi-skip-start" : "bi bi-stop-fill";
    const timeLimit =
      hours * 60 + minutes === this.timeOff() ? (
        "time off"
      ) : (
        <span>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );

    return (
      <div className="task">
        <div className={className}>
          <input type="checkbox" onClick={this.props.onToggleCompleted} />
          <div className="text">{this.state.label}</div>
        </div>
        <div className="Timer">
          {timeLimit}
          {timeLimit === "time off" ? null : (
            <button className={startClass} onClick={() => this.onStopClick()} />
          )}
          <button
            className="bi bi-arrow-repeat"
            onClick={() => this.onRestartClick()}
          />
        </div>
        <span className="task__time">
          {`${formatDistanceToNow(date, {
            includeSeconds: true,
            // addSuffix: true,
          })}`}
        </span>
        <div className="task__btn">
          <button
            className="bi bi-pencil-fill"
            onClick={this.props.onToggleEdited}
          />
          <button
            className="bi bi-trash3-fill"
            onClick={this.props.onDeleted}
          />
        </div>
      </div>
    );
  }
}

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
