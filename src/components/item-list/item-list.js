import React from 'react';

import SwapiService from './../../services/swapi-service';

import { withData } from '../hoc-helpers';

import './item-list.css';

const ItemList = (props) => {

    const { data, onPersonSelected, children: labelRender } = props;

    const items = data.map((item) => {

      const { id } = item;
      const lable = labelRender(item);

      return (
        <li className="list-group-item" 
            key={id}
            onClick={() => onPersonSelected(id)}>
          {lable}
        </li>
      );
    });

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
}

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);