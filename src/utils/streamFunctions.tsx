import { useEffect } from 'react';


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
