import React from 'react';
import PropTypes from 'prop-types';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {

    /* constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
    }

    // will give error this is undefined. either define constructor or define all method using arrow function that does binding by deafult
    goToStore(event) {
        event.preventDefault();   // by default form will submit to action all the conent in form tag and whole page will load. To prevent it use this.
        console.log(this);
    } */

    static propTypes = {
        history: PropTypes.object
    };

    myInput = React.createRef();
    goToStore = event => {
        // 1. Stop the form submitting
        event.preventDefault();   
        
        // 2. get the text from input
        const storeName = this.myInput.current.value;

        // 3. change the page from /storex/what-ever-they-enter
        this.props.history.push(`/store/${storeName}`);
    }

    render(){
        //return <p>Hello!</p>
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()}/>
                <button type="submit">Visit Store → </button>
            </form>
        );
    }
}

export default StorePicker;