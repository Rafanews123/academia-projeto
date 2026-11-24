export interface Exercise {
  id: string;
  name: string;
  category: 'Peito' | 'Costas' | 'Ombros' | 'Bíceps' | 'Tríceps' | 'Quadríceps' | 'Posterior de coxa' | 'Glúteos' | 'Panturrilhas' | 'Abdômen' | 'Cardio';
  equipment: 'Máquinas' | 'Halteres' | 'Barras' | 'Polias' | 'Cabos' | 'Peso corporal' | 'Elásticos' | 'Smith';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  primaryMuscle: string;
  secondaryMuscles: string[];
  setupPosition: string;
  executionSteps: string[];
  breathing: string;
  rangeOfMotion: string;
  commonMistakes: string[];
  tips: string[];
  defaultSets: number;
  defaultReps: string;
  defaultRest: number; // in seconds
  isFavorite?: boolean;
  alternatives: string[]; // exercise IDs
  animationType: 'bench-press' | 'lat-pulldown' | 'squat' | 'shoulder-press' | 'bicep-curl' | 'tricep-pushdown' | 'leg-press' | 'deadlift' | 'crunch' | 'generic';
  videoUrl?: string; // Tutorial video URL (MP4 / WebM)
  thumbnailUrl?: string; // Preview image / GIF
  videoChapters?: { time: string; title: string }[];
}

export interface WorkoutExerciseConfig {
  exerciseId: string;
  sets: number;
  targetReps: string;
  restTime: number; // seconds
}

export interface WorkoutDaySchedule {
  dayOfWeek: 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira' | 'Sábado' | 'Domingo';
  workoutName: string;
  focusMuscles: string[];
  exercises: WorkoutExerciseConfig[];
}

export interface WorkoutProgram {
  id: string;
  name: string;
  objective: string;
  frequency: string;
  daysPerWeek: number;
  description: string;
  estimatedDurationMin: number;
  isCustom?: boolean;
  schedule: WorkoutDaySchedule[];
}

export interface WorkoutSetLog {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface WorkoutExerciseSession {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSetLog[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  programId: string;
  programName: string;
  workoutName: string;
  date: string; // ISO string
  durationSeconds: number;
  exercises: WorkoutExerciseSession[];
  notes: string;
  volumeTotal: number;
  prsCount: number;
}

export interface BodyWeightRecord {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number;
  bodyFat?: number;
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  maxWeight: number;
  maxReps: number;
  date: string;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  currentWeight: number; // kg
  goal: 'Hipertrofia' | 'Emagrecimento' | 'Definição muscular' | 'Força' | 'Condicionamento físico';
  experience: 'Iniciante' | 'Intermediário' | 'Avançado';
  units: 'kg' | 'lb';
  defaultRest: number; // seconds
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  activeProgramId: string;
}
