import React, { Component } from 'react';
import './App.css';
import pym from 'pym.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: this.props.headline,
      summary: this.props.summary,
      url: this.props.url,
      callToAction: this.props.callToAction
    };
    new pym.Child({polling: 200});
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
    let { headline, summary, callToAction, url } = this.state;
    let previewMode = [headline, summary, callToAction, url].every(x => !x);
    if (previewMode) {
      return (
        <div className="App">
          <p className="App__placeholder">Fill out the fields and your preview will appear here</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1 className="App__headline">{headline}</h1>

          <p className="App__summary">{summary}</p>

          {callToAction &&
            <div className="App__footer">
              <a href={url} target="_blank" rel="nofollow noopener" className="App__call-out">{callToAction}</a>
            </div>
          }
        </div>
      );
    }
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
