import { Exercise, WorkoutProgram, UserProfile, BodyWeightRecord, WorkoutSession, PersonalRecord } from '../types';
import { INITIAL_EXERCISES, INITIAL_PROGRAMS, INITIAL_USER_PROFILE, INITIAL_WEIGHT_RECORDS, INITIAL_WORKOUT_SESSIONS, INITIAL_PRS } from '../data/defaultData';

const KEYS = {
  EXERCISES: 'meutreinopro_exercises_v1',
  PROGRAMS: 'meutreinopro_programs_v1',
  PROFILE: 'meutreinopro_profile_v1',
  WEIGHTS: 'meutreinopro_weights_v1',
  SESSIONS: 'meutreinopro_sessions_v1',
  PRS: 'meutreinopro_prs_v1',
};

export function loadStoredExercises(): Exercise[] {
  try {
    const data = localStorage.getItem(KEYS.EXERCISES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading exercises', e);
  }
  return INITIAL_EXERCISES;
}

export function saveStoredExercises(exercises: Exercise[]) {
  localStorage.setItem(KEYS.EXERCISES, JSON.stringify(exercises));
}

export function loadStoredPrograms(): WorkoutProgram[] {
  try {
    const data = localStorage.getItem(KEYS.PROGRAMS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading programs', e);
  }
  return INITIAL_PROGRAMS;
}

export function saveStoredPrograms(programs: WorkoutProgram[]) {
  localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(programs));
}

export function loadStoredProfile(): UserProfile {
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading profile', e);
  }
  return INITIAL_USER_PROFILE;
}

export function saveStoredProfile(profile: UserProfile) {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function loadStoredWeights(): BodyWeightRecord[] {
  try {
    const data = localStorage.getItem(KEYS.WEIGHTS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading weights', e);
  }
  return INITIAL_WEIGHT_RECORDS;
}

export function saveStoredWeights(weights: BodyWeightRecord[]) {
  localStorage.setItem(KEYS.WEIGHTS, JSON.stringify(weights));
}

export function loadStoredSessions(): WorkoutSession[] {
  try {
    const data = localStorage.getItem(KEYS.SESSIONS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading sessions', e);
  }
  return INITIAL_WORKOUT_SESSIONS;
}

export function saveStoredSessions(sessions: WorkoutSession[]) {
  localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
}

export function loadStoredPRs(): PersonalRecord[] {
  try {
    const data = localStorage.getItem(KEYS.PRS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error loading PRs', e);
  }
  return INITIAL_PRS;
}

export function saveStoredPRs(prs: PersonalRecord[]) {
  localStorage.setItem(KEYS.PRS, JSON.stringify(prs));
}

export function exportBackupData(): string {
  const backup = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    exercises: loadStoredExercises(),
    programs: loadStoredPrograms(),
    profile: loadStoredProfile(),
    weights: loadStoredWeights(),
    sessions: loadStoredSessions(),
    prs: loadStoredPRs(),
  };
  return JSON.stringify(backup, null, 2);
}

export function importBackupData(jsonString: string): boolean {
  try {
    const backup = JSON.parse(jsonString);
    if (backup && backup.exercises && backup.programs && backup.profile) {
      saveStoredExercises(backup.exercises);
      saveStoredPrograms(backup.programs);
      saveStoredProfile(backup.profile);
      if (backup.weights) saveStoredWeights(backup.weights);
      if (backup.sessions) saveStoredSessions(backup.sessions);
      if (backup.prs) saveStoredPRs(backup.prs);
      return true;
    }
  } catch (e) {
    console.error('Invalid backup format', e);
  }
  return false;
}
