import React, { Component } from 'react';
import { format } from 'date-fns';

export default class Timer extends Component {
  state = {
    isPlay: false,
  };

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    const { updateTask, id, description, timerStamp } = this.props;
    const { isPlay } = this.state;
    if (!timerStamp) {
      this.setState({ isPlay: false });
      return;
    }
    const newTime = timerStamp - 1000;
    if (!newTime) this.setState({ isPlay: false });
    if (isPlay) updateTask(id, description, newTime);
  };

  onToggleTimer = () => {
    const { isPlay } = this.state;
    this.setState({ isPlay: !isPlay });
  };

  render() {
    const { timerStamp } = this.props;
    const { isPlay } = this.state;
    return (
      <span className="description">
        {isPlay ? (
          <button type="button" onClick={this.onToggleTimer} aria-label="pause-button" className="icon icon-pause" />
        ) : (
          <button type="button" onClick={this.onToggleTimer} aria-label="play-button" className="icon icon-play" />
        )}

        {format(timerStamp, 'mm:ss')}
      </span>
    );
  }
}
