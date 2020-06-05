import React from 'react';
import Preview from '../preview/Preview';
import ApiInfo from '../../api.json';
import { PokemonLimitationResponse } from './PreviewListInterfaces';

export interface PreviewListProps {

}

export interface PreviewListState {
    currentOffset: number,
    previews: JSX.Element[],
    elementsOnOneLoad: number
}

class PreviewList extends React.Component<PreviewListProps, PreviewListState> {
    constructor(props: PreviewListProps) {
        super(props);
        this.state = {
            currentOffset: 1,
            previews: [],
            elementsOnOneLoad: 23
        };
    }

    componentDidMount() {
        this.registerMorePreviews();
    }

    componentWillUnmount() {
        localStorage.setItem('appState', JSON.stringify(this.state));
      }

    registerMorePreviews = () => {
        this.setState(prevState => {
            let previewsArray: JSX.Element[] = prevState.previews;
            for (let i = this.state.currentOffset; i < this.state.currentOffset + this.state.elementsOnOneLoad; i++) {
                previewsArray.push(<Preview id={i} />);
            }
            return ({
                currentOffset: prevState.currentOffset + this.state.elementsOnOneLoad,
                previews: previewsArray
            });
        });
    }

    render() {
        return (
            <div>
                <div>{this.state.previews}</div>
                <button onClick={() => this.registerMorePreviews()}>Load More</button>
            </div>
        );
    }
}

export default PreviewList;