import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorBoundry from './../error-boundry'
import ItemDetails from '../item-details';
import Row from '../row';
import { Record } from '../item-details/components/item-view/item-view';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showPlanet: true
  }

  toogleRandomPlanet = () => {
    this.setState(({ showPlanet }) => {
      return {
        showPlanet: !showPlanet
      };
    });
  };

  render() {

    const { showPlanet } = this.state;

    const randomPlanet = showPlanet ? <RandomPlanet /> : null;

    const { 
      getPerson, 
      getStarship, 
      getPlanet,
      getPersonImage,
      getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} >
          <Record field="gender" label="Gender" />
          <Record field="eyeColor" label="Eye color" />
      </ItemDetails>
    );
    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
          <Record field="model" label="Model" />
          <Record field="length" label="Lenght" />
          <Record field="costInCredits" label="Cost" />

      </ItemDetails>
    );

    return (
      <ErrorBoundry> 
        <div className="stardb-app">
        <Header />
        {/* {randomPlanet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toogleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage /> */}

        <Row 
          left={personDetails}
          rigth={starshipDetails} />
      </div>
      </ErrorBoundry>
    );
  }
}
