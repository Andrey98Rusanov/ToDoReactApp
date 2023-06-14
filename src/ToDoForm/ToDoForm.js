import React, { Component } from 'react';
import PropTypes from 'prop-types'
import "./ToDoForm.css"

export default class ToDoForm extends Component {

    state = {
        label: ""
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label)
        this.setState({
            label: ""
        })
    }

    render () {
        const {onAdd} = this.props;
        return (
        <header className="ToDoForm">
            <h1 className='ToDo__title'>
                <i className="bi bi-check2-circle"></i>
                ToDo's
            </h1>
            <form className='add__form'
            onSubmit = {this.onSubmit}>
                <input className='add__form-input' placeholder="What needs to be done?" autoFocus 
                value={this.state.label}
                onChange = {this.onLabelChange}/>
                <button className="bi bi-check-lg"></button>
            </form>
        </header>
        )
    }
}

ToDoForm.defaultProps = {
    onAdd: () => {}
}

ToDoForm.propTypes = {
    onAdd: PropTypes.func
}