import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import drops_img from './img/drops.svg'
import { Link } from 'react-router';
import bubbles from './img/bubble.svg';

class App extends Component {
  constructor() {
    super()
    this.state = {
      visibility: 'hidden',
      instructions: [
        'Double-click a drop to see its message!',
        'Click and drag a drop wherever you like.',
        'The buttons on the side allow you to display drops of that particular color.',
        'Click on "Add a drop" to add your own message to "The Ocean."'
      ],
      info: 'hidden',
      emSelect: 'All',
      emotions: ['All', 'Anger', 'Joy', 'Sadness', 'Fear', 'Disgust'],
      drops: [
        {
          author: 'franci',
          message: 'first drop ever!',
          mood: 'happy'
        },
      ],
      id: 99
    }
    this.newMsg = this.newMsg.bind(this);
    this.updateState = this.updateState.bind(this);
    this.oneColor = this.oneColor.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.displayMsg = this.displayMsg.bind(this);
  }

  updateState() {
    console.log('IM UPDATING THE STATE');
    axios.get('/messages')
      .then((res) => {
        console.log('res.data', res.data);
        this.theSetter(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  componentWillMount() {
    console.log('mounting!!!!!!')

    this.updateState()

  }

  displayMsg(id) {
    console.log('displayMsg');
    let stateId = this.state.id;
    let newStateId = '';
    let currentVis = this.state.visibility;
    let newVis = '';
    stateId !== id ? newStateId = id : newStateId = -1;
    this.setState({
      id: newStateId
    })
  }

  componentWillUnmount() {
    console.log("-unmonting-")
    axios.post('/messages', this.state.drops)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      })
  }


  shuffleArray(array) {
    console.log('SHUFFLING')
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  theSetter(data) {
    this.shuffleArray(data);
    this.setState({
      drops: data
    })
  }

  newMsg(e, autVal, msgVal, sound) {
    /*debugger;*/
    e.preventDefault();
    let lastDrop = {
      author: autVal,
      message: msgVal
    };
    axios.post('/messages', lastDrop)
      .then((res) => {
        console.log('res from AXIOS', res);
        let newDrops = this.state.drops.concat([res.data]);
        this.theSetter(newDrops);
      })
      .catch(function (err) {
        console.log(err);
      })
    sound.play()
    console.log('state', this.state.drops)
  }

  displayInfo() {
    console.log('displaying info')
    let oldInfo = this.state.info;
    let newInfo = '';
    (oldInfo === 'hidden') ? newInfo = 'visible' : newInfo = 'hidden';
    this.setState({
      info: newInfo
    })
  }


  oneColor(color) {
    console.log('one color!!')
    console.log('SELECTED', this.state.emSelect)
    console.log('COLOR', color)
    let selected = this.state.emSelect;
    let newColor = '';
    (color === selected) ? newColor = 'All' : newColor = color;
    console.log('NEWCOLOR', newColor)
    this.setState({
      emSelect: newColor,
      id: 'all'
    })
  }

  render() {
    const APIkey = 'AIzaSyD5Ta6BshtuVLzUsszt1tuuHb_cHjF0aj8';
    return (
      <div className="App">
        <div className='header'>
          <div>
            <h1>Drops</h1>
            <img src={drops_img} />
          </div>
          <button className='nav'><Link className="links" to='/'>How it works</Link></button>
          <button className='nav'><Link className="links" to='/post'>Add a drop</Link></button>
          <button className='nav'><Link className="links" to='/ocean'>See The Ocean</Link></button>
        </div>
        {React.cloneElement(this.props.children, {
          state: this.state,
          newBubble: this.createABubble,
          handleMsgIn: this.handleMsgIn,
          handleAutIn: this.handleAutIn,
          handleMoodIn: this.handleMoodIn,
          newMsg: this.newMsg,
          oneColor: this.oneColor,
          info: this.displayInfo,
          pleaseWork: this.pleaseWork,
          displayMsg: this.displayMsg,
          shuffleArray: this.shuffleArray
        })
        }
      </div>
    );
  }
}

export default App;
