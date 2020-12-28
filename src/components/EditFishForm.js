import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component{

    static propTypes = {
        fish: PropTypes.shape({
            image : PropTypes.string,
            name : PropTypes.string,
            desc : PropTypes.string ,
            status: PropTypes.string,
            price : PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    };

    handleChange = event => {
        // update that fish
        // 1. take a copy of current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };

        this.props.updateFish(this.props.index, updatedFish);
    }

    render(){
        return (
            <div className="fish-edit">
                <input name="name "  type="text" value={this.props.fish.name} onChange={this.handleChange}/>
                <input name="price" type="text" value={this.props.fish.price} onChange={this.handleChange}/>
                <select name="status" value={this.props.fish.status} onChange={this.handleChange}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" type="text" value={this.props.fish.desc} onChange={this.handleChange}/>
                <input name="image"  type="text" value={this.props.fish.image} onChange={this.handleChange}/>    
                <button onClick={ () => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        );
    }
}

export default EditFishForm;