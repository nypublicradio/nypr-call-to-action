import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
}

export default App;
