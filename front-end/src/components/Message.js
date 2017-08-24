import React, { Component } from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; 


class Message extends Component{

    render(){
        let biggerState = this.props.biggerState
        let emSelect = this.props.biggerState.emSelect;
        return( 
            
            <Draggable >
                <div style={{display: (emSelect === 'All' || emSelect === this.props.tone) ? 'inline-block' : 'none'}} onDoubleClick = {()=>{this.props.displayMsg(this.props.id)}}>
                    <div className ={this.props.tone +' drop rotate'} id = {this.props.randomStyle > 0.5 ? 'large' : 'small' }></div>
                    <div className = 'bigBubble' style={{visibility: (biggerState.id ===this.props.id) ? 'visible' : 'hidden'}}>
                        <p className = 'textMsg title'>-{this.props.author}-</p>
                        <p className = 'textMsg messag'>{this.props.message}</p>
                    </div>
                </div>
            </Draggable>
        )
    }
}


export default Message;