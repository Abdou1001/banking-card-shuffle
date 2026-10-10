export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished' | 'expired';

export interface TimerState {
  remaining: number;
  totalDuration: number;
  status: TimerStatus;
  progress: number; // 0 to 1
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  isExpired: boolean;
}
