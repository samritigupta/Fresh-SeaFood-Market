import React from 'react';

// When your compoent is not doing anything except render method then we can convert it into stateless function instead of defining class.

const Header = ({tagline}) => (
    <header className="top">
                <h1>
                    catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>    
                    </span> 
                    day
                </h1>
           
                <h3 className="tagline">
                    <span>{tagline}</span>
                </h3>
            </header>
);

/* class Header extends React.Component{
    render(){
        return (
            
        );
    }
} */

export default Header;