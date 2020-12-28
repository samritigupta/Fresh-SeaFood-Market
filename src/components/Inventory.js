import React from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import base, {firebaseApp} from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        deleteFish: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.authHandler({user});
            }
        })
    }

    authHandler = async authData => {
        // 1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this})
        // 2. claim it if their is no owner
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid
            });
        }
        // 3. set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };

    authenticate = (provider) => {
        const authProvider =  new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render(){
        const logout = <button onClick={this.logout}>Log Out</button>
        // 1. check if already logged in
        if(!this.state.uid){
            return (<Login authenticate={this.authenticate}/>);
        }

        // 2. check if they are not owner of the store   
        if(this.state.uid !== this.state.owner){
            return(<div>
                <p>Sorry you are not the owner!!!</p>
                {logout}
            </div>);
        }

        // 3. They must be owner so render inventory
        return (
            <div className="Inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                    <EditFishForm key={key} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} index={key} fish={this.props.fishes[key]}/>
                )}
                <AddFishForm addFish={this.props.addFish}></AddFishForm>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;