import { useState, useEffect, useRef, useCallback } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { TimerStatus } from '@/types/timer';

interface UseTimerOptions {
  duration: number; // in seconds
  autoStart?: boolean;
  onExpire?: () => void;
}

export interface UseTimerReturn {
  remaining: number;
  totalDuration: number;
  elapsed: number;
  status: TimerStatus;
  progress: number; // 1 (full) down to 0 (empty)
  progressAnim: ReturnType<typeof useSharedValue<number>>;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  isExpired: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
  reset: () => void;
  finish: () => void;
}

export function useTimer({
  duration,
  autoStart = true,
  onExpire,
}: UseTimerOptions): UseTimerReturn {
  const safeDuration = Math.max(1, Math.round(duration || 30));
  const [remaining, setRemaining] = useState<number>(safeDuration);
  const [status, setStatus] = useState<TimerStatus>(autoStart ? 'running' : 'idle');
  const totalDuration = safeDuration;

  const progressAnim = useSharedValue(1);

  // References for timestamp-based precision
  const endTimeRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clearTimerInterval = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const startTicker = useCallback(() => {
    clearTimerInterval();
    timerIntervalRef.current = setInterval(() => {
      if (!endTimeRef.current) return;
      const now = Date.now();
      const diffMs = endTimeRef.current - now;
      const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));

      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        clearTimerInterval();
        setStatus('expired');
        progressAnim.value = 0;
        if (onExpireRef.current) {
          onExpireRef.current();
        }
      }
    }, 250);
  }, [clearTimerInterval, progressAnim]);

  const start = useCallback(() => {
    const now = Date.now();
    endTimeRef.current = now + safeDuration * 1000;
    pauseTimeRef.current = null;
    setRemaining(safeDuration);
    setStatus('running');

    progressAnim.value = 1;
    progressAnim.value = withTiming(0, {
      duration: safeDuration * 1000,
      easing: Easing.linear,
    });

    startTicker();
  }, [safeDuration, progressAnim, startTicker]);

  const pause = useCallback(() => {
    if (status !== 'running') return;
    clearTimerInterval();
    pauseTimeRef.current = Date.now();
    setStatus('paused');
    // Freeze animated progress at current value
    progressAnim.value = progressAnim.value;
  }, [status, clearTimerInterval, progressAnim]);

  const resume = useCallback(() => {
    if (status !== 'paused' || !pauseTimeRef.current || !endTimeRef.current) return;
    const pausedDuration = Date.now() - pauseTimeRef.current;
    endTimeRef.current += pausedDuration;
    pauseTimeRef.current = null;
    setStatus('running');

    // Resume smooth progress animation
    const currentRemainingMs = Math.max(0, endTimeRef.current - Date.now());
    progressAnim.value = withTiming(0, {
      duration: currentRemainingMs,
      easing: Easing.linear,
    });

    startTicker();
  }, [status, progressAnim, startTicker]);

  const togglePause = useCallback(() => {
    if (status === 'running') {
      pause();
    } else if (status === 'paused') {
      resume();
    }
  }, [status, pause, resume]);

  const reset = useCallback(() => {
    const now = Date.now();
    endTimeRef.current = now + safeDuration * 1000;
    pauseTimeRef.current = null;
    setRemaining(safeDuration);
    setStatus('running');

    progressAnim.value = 1;
    progressAnim.value = withTiming(0, {
      duration: safeDuration * 1000,
      easing: Easing.linear,
    });

    startTicker();
  }, [safeDuration, progressAnim, startTicker]);

  const finish = useCallback(() => {
    clearTimerInterval();
    setStatus('finished');
    progressAnim.value = 1;
  }, [clearTimerInterval, progressAnim]);

  // Initial mount: auto-start timer if configured
  useEffect(() => {
    if (autoStart) {
      const now = Date.now();
      endTimeRef.current = now + safeDuration * 1000;
      pauseTimeRef.current = null;
      setRemaining(safeDuration);
      setStatus('running');

      progressAnim.value = 1;
      progressAnim.value = withTiming(0, {
        duration: safeDuration * 1000,
        easing: Easing.linear,
      });

      startTicker();
    }

    return () => clearTimerInterval();
  }, [autoStart, safeDuration, progressAnim, startTicker, clearTimerInterval]);

  const progress = totalDuration > 0 ? remaining / totalDuration : 0;
  const elapsed = Math.max(0, totalDuration - remaining);

  return {
    remaining,
    totalDuration,
    elapsed,
    status,
    progress,
    progressAnim,
    isRunning: status === 'running',
    isPaused: status === 'paused',
    isFinished: status === 'finished',
    isExpired: status === 'expired',
    start,
    pause,
    resume,
    togglePause,
    reset,
    finish,
  };
}
