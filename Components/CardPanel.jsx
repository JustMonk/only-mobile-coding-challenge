import React from 'react';

export const CardPanel = (props) => {
  return <div className={`card-panel ${props.color}`}>
    {props.children}
  </div>
}