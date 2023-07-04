import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ToDoForm.css";

export default class ToDoForm extends Component {
  state = {
    label: "",
    time: "00:00"
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimeChange = (e) => {
    this.setState({
      time: e.target.value,
    });
  };


  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label, this.state.time);
    this.setState({
      label: "",
      time: "00:00"
    });
  };

  render() {
    return (
      <header className="ToDoForm">
        <h1 className="ToDo__title">
          <i className="bi bi-check2-circle" />
          ToDo
        </h1>
        <form className="add__form" onSubmit={this.onSubmit}>
          <input
            className="add__form-input"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.label}
            onChange={this.onLabelChange}
          />
          <input
            type="time"
            min="00:01"
            value={this.state.time}
            className="addTime"
            placeholder="hh:mm"
            onChange={this.onTimeChange}/>
            <button className="time_button" type="submit"/>
        </form>
      </header>
    );
  }
}

ToDoForm.defaultProps = {
  onAdd: () => {},
};

ToDoForm.propTypes = {
  onAdd: PropTypes.func,
};
