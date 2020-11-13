import { useEffect, useRef } from 'react';
import { formatTime } from './functions';
import { useGetStreamProfileLiveLazyQuery } from '../API/query/getStreamProfile/getStreamProfileLive';
import { useGetStreamSelfLiveLazyQuery } from '../API/query/getStreamSelf/getStreamSelfLive';


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
export const getStreamDurationMs = (data: StreamTimes) => {
  // Live duration, if both are set
  if (data.timeFromLive && data.timeToLive) {
    return new Date(data.timeToLive).getTime() - new Date(data.timeFromLive).getTime();
  }

  // Scheduled
  return new Date(data.timeTo).getTime() - new Date(data.timeFrom).getTime();
};


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


/**
 * Tests if the given stream can go live (is within half an hour of timeFrom)
 */
export const canGoLive = (data: StreamTimes) => new Date(data.timeFrom).getTime() - Date.now() <= 1.8e+6;


/**
 * Poll streamProfile every 10 seconds and updates stream.timeFromLive and stream.timeToLive and stream.liveConsumersEdge in cache
 * Polls before stream is live, until it has ended (timeToLive is set)
 */
export const usePollLive = (id: string) => {
  const [query, queryResult] = useGetStreamProfileLiveLazyQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const interval = useRef<number>();
  useEffect(() => {
    if (!queryResult.data?.getStreamProfile.timeFromLive || !queryResult.data?.getStreamProfile.timeToLive) {
      interval.current = setInterval(() => {
        query();
      }, 10000);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [queryResult]);
};


/**
 * Poll streamSelf every 10 seconds to update stream.liveConsumersEdge in cache
 * Polls indefinitely
 */
export const usePollSelfLive = (id: string) => {
  const [query, queryResult] = useGetStreamSelfLiveLazyQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const interval = useRef<number>();
  useEffect(() => {
    interval.current = setInterval(() => {
      query();
    }, 10000);

    return () => {
      clearInterval(interval.current);
    };
  }, [queryResult]);
};


export type GoLiveState = 'WAITING' | 'CONNECTED' | 'LIVE_CONFIRM' | 'LIVE' | 'END_CONFIRM' | 'ENDED';
