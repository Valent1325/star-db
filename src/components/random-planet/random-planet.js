import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import PlanetView from './components/planet-view';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updatePlanet();
    this.intervalId = setInterval(this.updatePlanet, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onPlanetLoaded = (planet) => {
    setTimeout(() => {
      this.setState({ planet, loading: false });
    }, 1000);
  }

  onError = (error) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {

    const { planet, loading, error } = this.state;

    const hasDate = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasDate ? <PlanetView planet={planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { spinner }
        { content }
        { errorMessage }
      </div>
    );
  }
}
