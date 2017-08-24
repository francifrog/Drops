import React, { Component } from 'react';

class Instructions extends Component {
   
    render(){
        let ins = this.props.instructions
        return(
            <ul style={{visibility: this.props.display}}>
                {ins.map((instruction)=>{
                    return(
                        <li>{instruction}</li>
                    )
                })}
            </ul>
        )
    }
}
    export default Instructions;