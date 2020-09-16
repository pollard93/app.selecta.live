import { useEffect } from 'react';
import { formatTime } from './functions';


/**
 * If stream has not yet started
 * Get the time is does start and set a timeout to execute onStarted when it does
 */
export const useStreamStart = (timeFrom: string, onStarted: () => void) => {
  useEffect(() => {
    const now = new Date();
    const startTime = new Date(timeFrom);

    /**
     * If stream has started stop here
     */
    if (new Date(timeFrom) < now) return undefined;

    /**
     * Get how long until start time
     */
    const timeToStart = startTime.getTime() - now.getTime();

    /**
     * setTimeout to refetch stream url
     */
    const id = setTimeout(() => {
      onStarted();
    }, timeToStart);

    /**
     * Clear timeout on cleanup
     */
    return () => {
      clearTimeout(id);
    };
  }, []);
};


type StreamTimes = {
  timeFrom: string;
  timeFromLive: string;
  timeTo: string;
  timeToLive: string;
}


/**
 * Takes stream data, and returns duration in ms
 */
export const getStreamDurationMs = (data: StreamTimes) => new Date(data.timeToLive || data.timeTo).getTime() - new Date(data.timeFromLive || data.timeFrom).getTime();


/**
 * Takes stream data, and returns hours and minutes values to be displayed
 */
export const getStreamDuration = (data: StreamTimes) => {
  const durationMs = getStreamDurationMs(data);
  const hours = Math.floor(durationMs / 3.6e+6);
  const minutes = (durationMs / 60000) - (hours * 60);
  return { hours, minutes };
};


/**
 * Takes stream data, and returns hours and minutes values to be displayed
 * If pretty is given, return string of formatted time
 */
export const getStreamDurationPretty = (data: StreamTimes) => {
  const durationMs = getStreamDurationMs(data);
  return formatTime(durationMs / 1000);
};
