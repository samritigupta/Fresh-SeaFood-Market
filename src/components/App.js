import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.js';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount(){
        const {params} = this.props.match;

        // first reinstantiate our local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate(){
        console.log("update");
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    componentWillUnmount(){
        base.removeBinding(this.ref);
    };

    addFish = fish => {
        // can't update state directly, need to do it using setState
        //this.state.fishes.fish1=fish;

        // 1. Take a copy of existing state and assign.
        // if try to directly assign state while changing can lead to performance and things updating out of order.  
        const fishes = {...this.state.fishes};

        // 2. Add our new fish
        fishes[`fish${Date.now()}`] = fish;

        // 3. update
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order}); 
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="FRESH SEAFOOD MARKET"/>   
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(
                            key =>  
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}></Fish>
                        )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish} 
                    deleteFish={this.deleteFish} 
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}/>
            </div>
        );
    }
}

export default App;