import React from 'react';
import './CallToAction.css';
import WidgetBase from 'nypr-widget-base';

export default class CallToAction extends WidgetBase {
  render() {
    let { headline, summary, callToAction, url } = this.state;
    let previewMode = [headline, summary, callToAction, url].every(x => !x);
    if (previewMode) {
      return (
        <div className="CallToAction">
          <p className="CallToAction__placeholder">Fill out the fields and your preview will appear here</p>
        </div>
      );
    } else {
      return (
        <div className="CallToAction" style={this.style('body')}>
          <div className="CallToAction__wrapper">

            <span className="CallToAction__accent" style={this.style('accent')}></span>
            <h1
              className="CallToAction__headline"
              style={this.style('h1')}>
              {headline}
            </h1>

            <p className="CallToAction__summary">{summary}</p>

            {callToAction &&
              <div className="CallToAction__footer">
                <a
                  style={this.style('button')}
                  href={url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="CallToAction__call-out gtm__call-to-action">{callToAction}</a>
              </div>
            }

          </div>
        </div>
      );
    }
  }
}
