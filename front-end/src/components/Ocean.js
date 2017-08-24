import React, { Component } from 'react';
import { Link } from 'react-router';
import Svg from './Svg'; 
import question from '../img/questionmark.svg';
import bubbles from '../img/bubble.svg';
import Message from './Message';
import Instructions from './Instructions';

class Ocean extends Component {

    render(){
        let state = this.props.state
        let drops = this.props.state.drops
        let emotions = this.props.state.emotions
        return(
            <div className={'Ocean'}>
                <Svg/>
                <div className = 'option'>
                    <button className= 'info' onClick={this.props.info}><img className= 'info' src= {question}/></button>
                    {emotions.map((emot, i)=>{
                        return(
                            <button className={emot} onClick={(e)=>{this.props.oneColor(emot)}}>{emot}</button>
                        )
                    })
                    }
                </div>
                <Instructions 
                    display = {state.info} 
                    instructions = {state.instructions}
                />
                <div className = 'dropsSpace'>
                {drops.map((drop, i)=>{
                    let randomStyle = Math.random()
                    let dropAnim;
                    if (drop.tone === 'Joy' || drop.tone === 'Anger'){
                        dropAnim = 'anim';
                    }else{
                        dropAnim = 'anim2'
                    }
                        return(
                            <div key={i} className={dropAnim} >    
                                <Message 
                                    biggerState = {state}
                                    tone = {drop.tone} 
                                    randomStyle= {randomStyle} 
                                    id = {i}
                                    author = {drop.author} 
                                    message = {drop.message}
                                    pleaseWork= {this.props.pleaseWork}
                                    displayMsg = {this.props.displayMsg}
                                />
                            </div>
                        )
                    })
                }  
                </div>
                        <div className='bubbleAnim'>
          <img className ='firstBubble'src={bubbles} />
          <img className ='secondBubble'src={bubbles} />
          <img className ='thirdBubble'src={bubbles} />
        </div>
            </div>
        )
    }
}



export default Ocean;
