import React from 'react';
import DetailsModal from '../../hoc/DetailsModal';
import './previewList.css';

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
            elementsOnOneLoad: 24
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
                previewsArray.push(<DetailsModal pokemonId={i} key={i} />);
            }
            return ({
                currentOffset: prevState.currentOffset + this.state.elementsOnOneLoad,
                previews: previewsArray
            });
        });
    }

    render() {
        return (
            <div className="gridBg">
                <div className="parent">
                    {this.state.previews}
                </div>
                <div className="icon loadMoreButton" onClick={() => this.registerMorePreviews()}>
                </div>
            </div>
        );
    }
}

export default PreviewList;