import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function Timer({ initialTimer = 0, onToggleCompleted = () => {}, id, completed = false }) {
  const [isPlay, setIsPlay] = useState(false);
  const [timerStamp, setTimerStamp] = useState(initialTimer);

  const onToggleTimer = () => {
    setIsPlay((prev) => !prev);
  };

  useEffect(() => {
    if (completed) {
      setIsPlay(false);
      setTimerStamp(0);
    }
  }, [completed]);

  useEffect(() => {
    if (isPlay) {
      const intervalID = setInterval(() => {
        setTimerStamp((prev) => Math.max(prev - 1000, 0));
        if (!timerStamp) {
          onToggleTimer();
          onToggleCompleted(id);
        }
      }, 1000);
      return () => {
        clearInterval(intervalID);
      };
    }
    return () => {};
  }, [isPlay, timerStamp, id, onToggleCompleted]);

  return (
    <span className="description">
      {isPlay ? (
        <button type="button" onClick={onToggleTimer} aria-label="pause-button" className="icon icon-pause" />
      ) : (
        <button type="button" onClick={onToggleTimer} aria-label="play-button" className="icon icon-play" />
      )}

      {format(timerStamp, 'mm:ss')}
    </span>
  );
}

Timer.propTypes = {
  initialTimer: PropTypes.number,
  onToggleCompleted: PropTypes.func,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool,
};
