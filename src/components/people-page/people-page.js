import React, { Component } from 'react';

import SwapiService from './../../services/swapi-service';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';

import './people-page.css';
import Row from './../row';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPersonId: null
  };

  personSelected = (id) => {
    this.setState({
      selectedPersonId: id
    })
  };

  render() {
    
    const { selectedPersonId } = this.state;

    const itemList = (
      <ItemList 
        onPersonSelected={this.personSelected}
        getData={this.swapiService.getAllPeople} >

          {(i) => (
            `${i.name} (${i.birthYear})`
          )}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={selectedPersonId} />
      </ErrorBoundry>
    );

    return (
      <Row 
        left={itemList} 
        rigth={personDetails} />
    );
  }
}