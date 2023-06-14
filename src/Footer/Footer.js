import React from 'react';
import Filters from '../Filters/Filters';
import './Footer.css'


const Footer = ({completedCount, statusFilter, clearCompleted}) => {
    return (
      <div className='Footer'>
        <span>{completedCount} items left</span>
        <Filters statusFilter = {statusFilter}/>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    )
  }

export default Footer