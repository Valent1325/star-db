import React from 'react';

import ErrorButton from '../../../error-button';

import './item-view.css';

export const Record = ({item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
}

const ItemView = (props) => {

  const { id, name, gender, birthYear, eyeColor } = props.item;
  const { image } = props;

  return (
    <React.Fragment>
      
      <img className="item-image"
          alt={`${id}.${name}`}
          src={image} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {props.children}
          {/* <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li> */}
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};

export default ItemView;