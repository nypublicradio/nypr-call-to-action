import React, { Component } from 'react';
import './App.css';

const THEMES = process.env.REACT_APP_THEMES;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: this.props.headline,
      summary: this.props.summary,
      url: this.props.url,
      callToAction: this.props.callToAction,
      styles: {}
    };
    props.embed.onMessage('incoming', this.listener);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.embed.remove();
  }

  componentDidUpdate(props, { brand }) {
    if (this.state.brand !== brand) {
      this.updateBrand();
    }
  }

  updateBrand() {
    fetch(`${THEMES}/${this.state.brand}.json`)
      .then(r => r.json())
      .then(styles => this.setState({styles}));
  }

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
              <a href={url} target="_blank" rel="nofollow noopener" className="App__call-out gtm__call-to-action">{callToAction}</a>
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

  listener = data => {
    let query = this.parse(data);
    this.setState(query);
  }
}

export default App;
