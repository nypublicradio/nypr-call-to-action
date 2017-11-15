import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    window.addEventListener('message', ({data, origin}) => {
      if (origin !== process.env.REACT_APP_TOOLKIT_ORIGIN && process.env.NODE_ENV !== 'test') {
        return;
      } else {
        this.listener(data);
      }
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1 className="App__headline">{this.props.headline || this.state.headline}</h1>

        <p className="App__summary">{this.props.summary || this.state.summary}</p>

        {(this.props.callToAction || this.state.callToAction) &&
          <div className="App__footer">
            <a href={this.props.url || this.state.url} target="_blank" rel="nofollow noopener" className="App__call-out">{this.props.callToAction || this.state.callToAction}</a>
          </div>
        }
      
      </div>
    );
  }
  
  parse(data) {
    let message = {};
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch(e) {/* Ignored */}
    }
    return message;
  }
  
  listener(data) {
    let { query } = this.parse(data);
    this.setState(query);
  }
}

export default App;
