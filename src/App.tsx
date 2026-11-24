/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  loadStoredExercises,
  saveStoredExercises,
  loadStoredPrograms,
  saveStoredPrograms,
  loadStoredProfile,
  saveStoredProfile,
  loadStoredWeights,
  saveStoredWeights,
  loadStoredSessions,
  saveStoredSessions,
  loadStoredPRs,
  saveStoredPRs,
} from './utils/storage';
import { Exercise, WorkoutProgram, UserProfile, BodyWeightRecord, WorkoutSession, PersonalRecord } from './types';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { TabInicio } from './components/TabInicio';
import { TabTreinos } from './components/TabTreinos';
import { TabExercicios } from './components/TabExercicios';
import { TabEvolucao } from './components/TabEvolucao';
import { TabChat } from './components/TabChat';
import { TabPerfil } from './components/TabPerfil';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { PlateCalculatorModal } from './components/PlateCalculatorModal';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'treinos' | 'exercicios' | 'evolucao' | 'chat' | 'perfil'>('inicio');

  // Persistent data state
  const [exercises, setExercises] = useState<Exercise[]>(loadStoredExercises());
  const [programs, setPrograms] = useState<WorkoutProgram[]>(loadStoredPrograms());
  const [profile, setProfile] = useState<UserProfile>(loadStoredProfile());
  const [weights, setWeights] = useState<BodyWeightRecord[]>(loadStoredWeights());
  const [sessions, setSessions] = useState<WorkoutSession[]>(loadStoredSessions());
  const [prs, setPrs] = useState<PersonalRecord[]>(loadStoredPRs());

  // Modals state
  const [selectedExerciseDetail, setSelectedExerciseDetail] = useState<Exercise | null>(null);
  const [showPlateCalculator, setShowPlateCalculator] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<{ programId: string; dayIndex: number } | null>(null);

  // Handlers
  const handleToggleFavorite = (exerciseId: string) => {
    const updated = exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, isFavorite: !ex.isFavorite } : ex
    );
    setExercises(updated);
    saveStoredExercises(updated);
    if (selectedExerciseDetail && selectedExerciseDetail.id === exerciseId) {
      setSelectedExerciseDetail({ ...selectedExerciseDetail, isFavorite: !selectedExerciseDetail.isFavorite });
    }
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveStoredProfile(newProfile);
  };

  const handleSelectProgram = (programId: string) => {
    const updated = { ...profile, activeProgramId: programId };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handleSavePrograms = (newPrograms: WorkoutProgram[]) => {
    setPrograms(newPrograms);
    saveStoredPrograms(newPrograms);
  };

  const handleSaveWeight = (weightVal: number) => {
    const newRecord: BodyWeightRecord = {
      id: `w-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      weight: weightVal,
    };
    const updatedWeights = [...weights, newRecord];
    setWeights(updatedWeights);
    saveStoredWeights(updatedWeights);

    const updatedProfile = { ...profile, currentWeight: weightVal };
    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  const handleFinishWorkout = (session: WorkoutSession) => {
    const updatedSessions = [session, ...sessions];
    setSessions(updatedSessions);
    saveStoredSessions(updatedSessions);

    // Check PRs
    const newPrs = [...prs];
    session.exercises.forEach((exSession) => {
      const maxW = Math.max(...exSession.sets.map((s) => (s.completed ? s.weight : 0)));
      const maxR = Math.max(...exSession.sets.map((s) => (s.completed ? s.reps : 0)));
      if (maxW > 0) {
        const existingPrIdx = newPrs.findIndex((p) => p.exerciseId === exSession.exerciseId);
        if (existingPrIdx >= 0) {
          if (maxW >= newPrs[existingPrIdx].maxWeight) {
            newPrs[existingPrIdx] = {
              ...newPrs[existingPrIdx],
              maxWeight: maxW,
              maxReps: maxR,
              date: new Date().toISOString().slice(0, 10),
            };
          }
        } else {
          newPrs.push({
            id: `pr-${Date.now()}-${exSession.exerciseId}`,
            exerciseId: exSession.exerciseId,
            exerciseName: exSession.exerciseName,
            maxWeight: maxW,
            maxReps: maxR,
            date: new Date().toISOString().slice(0, 10),
          });
        }
      }
    });
    setPrs(newPrs);
    saveStoredPRs(newPrs);

    setActiveWorkout(null);
    setActiveTab('evolucao');
  };

  const activeProgObj = programs.find((p) => p.id === activeWorkout?.programId) || programs[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-20">
      <TopHeader
        profile={profile}
        onOpenPlateCalculator={() => setShowPlateCalculator(true)}
      />

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {activeTab === 'inicio' && (
          <TabInicio
            profile={profile}
            programs={programs}
            sessions={sessions}
            prs={prs}
            onStartWorkout={(progId, dayIdx) => setActiveWorkout({ programId: progId, dayIndex: dayIdx })}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'treinos' && (
          <TabTreinos
            programs={programs}
            exercises={exercises}
            profile={profile}
            onSelectProgram={handleSelectProgram}
            onStartWorkout={(progId, dayIdx) => setActiveWorkout({ programId: progId, dayIndex: dayIdx })}
            onSavePrograms={handleSavePrograms}
          />
        )}

        {activeTab === 'exercicios' && (
          <TabExercicios
            exercises={exercises}
            onToggleFavorite={handleToggleFavorite}
            onSelectExercise={(ex) => setSelectedExerciseDetail(ex)}
          />
        )}

        {activeTab === 'evolucao' && (
          <TabEvolucao
            weights={weights}
            sessions={sessions}
            prs={prs}
            profile={profile}
            onSaveWeight={handleSaveWeight}
          />
        )}

        {activeTab === 'chat' && (
          <TabChat profile={profile} />
        )}

        {activeTab === 'perfil' && (
          <TabPerfil
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onRefreshData={() => {
              setExercises(loadStoredExercises());
              setPrograms(loadStoredPrograms());
              setProfile(loadStoredProfile());
              setWeights(loadStoredWeights());
              setSessions(loadStoredSessions());
              setPrs(loadStoredPRs());
            }}
          />
        )}
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExerciseDetail}
        exercisesLibrary={exercises}
        onClose={() => setSelectedExerciseDetail(null)}
        onToggleFavorite={handleToggleFavorite}
        onSelectAlternative={(altId) => {
          const alt = exercises.find((e) => e.id === altId);
          if (alt) setSelectedExerciseDetail(alt);
        }}
      />

      {/* Plate Calculator Modal */}
      <PlateCalculatorModal
        isOpen={showPlateCalculator}
        onClose={() => setShowPlateCalculator(false)}
      />

      {/* Active Workout Session Runner Modal */}
      {activeWorkout && (
        <ActiveWorkoutModal
          program={activeProgObj}
          dayIndex={activeWorkout.dayIndex}
          exercisesLibrary={exercises}
          onFinishWorkout={handleFinishWorkout}
          onCancelWorkout={() => setActiveWorkout(null)}
        />
      )}
    </div>
  );
}
