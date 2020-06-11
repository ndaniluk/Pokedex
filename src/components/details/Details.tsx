import React from 'react';
import Types from '../types/Types';
import { TypeOrCounter } from '../types/TypeOrCounter';
import EvolutionChain from '../evolutionChain/EvolutionChain';
import { DetailsResponse, DescriptionResponse } from './DetailsInterfaces';
import { getImage, firstLetterToUpperCase } from '../../utils/Utils';
import ApiInfo from '../../api.json';
import './Details.css';

export interface DetailsProps {
  id: number
}

export interface DetailsState {
  name: string,
  img: string,
  description: string,
  height: number,
  weight: number,
  types?: Types,
  counters?: Types,
  evolutionChain?: EvolutionChain
}

class Details extends React.Component<DetailsProps, DetailsState> {
  constructor(props: DetailsProps) {
    super(props);
    this.state = {
      name: '',
      img: getImage(this.props.id),
      description: '',
      height: 0,
      weight: 0
    };
  }

  componentDidMount() {
    this.fetchBasicInfo();
    this.fetchDescription();
  }

  fetchBasicInfo = () => {
    fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON + this.props.id)
      .then(response => response.json())
      .then(response => {
        const details: DetailsResponse = response;
        this.setState({
          name: details.name,
          height: details.height,
          weight: details.weight
        });
      });
  }

  fetchDescription = () => {
    fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON_SPECIES + this.props.id)
      .then(response => response.json())
      .then(response => {
        const description: DescriptionResponse = response;
        const entries = description.flavor_text_entries;
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].language.name === 'en') {
            this.setState({
              description: entries[i].flavor_text
            });
            break;
          }
        }
      });
  }

  render() {
    const pokemonName = firstLetterToUpperCase(this.state.name);
    const weightIconSrc = window.location.origin + '/icons/weight.svg';
    const heightIconSrc = window.location.origin + '/icons/height.svg';

    return (
      <>
        <h3>{pokemonName}</h3>
        <div className="img">
          <img src={this.state.img} alt={this.state.name} />
        </div>
        <div className="description">
          <p>{this.state.description}</p>
        </div>
        <div className="measurment">
          <p><img src={heightIconSrc} alt="height" className="measurmentIcon" />{this.state.height * 10}cm</p><br />
          <p><img src={weightIconSrc} alt="weight" className="measurmentIcon" />{this.state.weight / 10}kg</p>
        </div>
        <div className="detailsTypes">
          <p>Types:</p><Types id={this.props.id} requestType={TypeOrCounter.Type} /><br />
          <p>Counters:</p> <Types id={this.props.id} requestType={TypeOrCounter.Counter} />
        </div>
        <div className="evolutions">
          <h4>Evolutions:</h4> <EvolutionChain id={this.props.id} />
        </div>
      </>
    );
  }
}

export default Details;