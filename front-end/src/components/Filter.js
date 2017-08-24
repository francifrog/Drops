import React, { Component } from 'react';
import { Link } from 'react-router';


class Filter extends Component {
    
    render(){
        let state = this.props.state
        console.log('STATE', state)
        return(
            <div>
                <button className='Disgust'>Disgust</button>
                <button className = 'Joy'>Joy</button>
                <button className = 'Anger'>Anger</button>
                <button className = 'Fear'>Fear</button>
                <button className = 'Sadness'>Sadness</button>
            </div>
        )
    }
}


export default Filter;