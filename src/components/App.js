import React from 'react';
import Header from './Header.js';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
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
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;