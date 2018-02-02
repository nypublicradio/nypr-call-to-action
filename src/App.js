import React from 'react';
import './App.css';
import WidgetBase from 'nypr-widget-base';

export default class CallToAction extends WidgetBase {
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
        <div className="App" style={this.style('body')}>
          <h1
            className="App__headline"
            style={this.style('h1')}>
            {headline}
          </h1>

          <p className="App__summary">{summary}</p>

          {callToAction &&
            <div className="App__footer">
              <a
                style={this.style('button')}
                href={url}
                target="_blank"
                rel="nofollow noopener"
                className="App__call-out gtm__call-to-action">{callToAction}</a>
            </div>
          }
        </div>
      );
    }
  }
}
