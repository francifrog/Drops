import React, { Component } from 'react';
import { Link } from 'react-router';
import Instructions from './Instructions';

class About extends Component {
    render(){
        const instructions = [
            "'Drops' is a place where anyone can leave a message.",
            'All the messages are stored in droplets that are located in "The Ocean."',
            "You can drag the drops wherever you like.",
            "To read a message in a drop, double-click it.",
            "When a new message is added, it is analyzed by an ultra-intelligent super-secret virtual brain that filters the messages according to their tones",
            "Droplets that contain messages with the same tone have the same color.",
            "The position of the message changes from time to time, so you will never know where your new message is",
            "If you want to find your message, you need to open more than one drop."
        ]
        return(
            <div className='about'>
                <a href="javascript: void(0)" className="jellyfish svg">jellyfish</a>
                <a href="javascript: void(0)" className="shell svg">shell</a>
                <div className='instructions'>
                    <h3>Instructions</h3>
                    <ul className='bigInstr'>
                        {instructions.map((instruction)=>{
                            return(
                                <li>{instruction}</li>
                            )
                        })}
                        <a href="javascript: void(0)" className="fish4 svg">fish4</a>
                    </ul>
                </div>
            </div>
        )
    }
}

export default About;