import React from "react";
import "./ToDoTask.css";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

export default class ToDoTask extends React.Component {
  state = {
    label: this.props.label,
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

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
    return (
      <div className="task">
        <div className={className}>
          <input type="checkbox" onClick={this.props.onToggleCompleted} />
          <div className="text">{this.state.label}</div>
        </div>
        <span className="task__time">
          {`created ${formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
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
};

ToDoTask.propTypes = {
  completed: PropTypes.bool,
  edited: PropTypes.bool,
  label: PropTypes.string,
  date: PropTypes.any,
  onToggleCompleted: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
};
