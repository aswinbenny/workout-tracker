const { useState: useWorkoutState, useMemo: useWorkoutMemo } = React;

window.WorkoutScreen = function WorkoutScreen({ workout, finishWorkout, cancelWorkout, history }) {
    const [exIndex, setExIndex] = useWorkoutState(0);
    const [workoutData, setWorkoutData] = useWorkoutState(
        workout.exercises.map(ex => ({ id: ex.id, name: window.exerciseMap[ex.id]?.name || ex.name, sets: [{ weight: '', reps: '' }], notes: '' }))
    );

    const exercise = workoutData[exIndex];
    const currentData = workoutData[exIndex];

    const previousWorkouts = useWorkoutMemo(() => {
        return history
            .filter(w =>
                w.exercises.some(ex => (window.exerciseMap[ex.id]?.name || ex.name) === exercise.name && ex.sets.some(s => s.weight || s.reps))
            )
            .slice(0, 1)
            .map(w => ({
                date: new Date(w.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
                exercise: w.exercises.find(ex => (window.exerciseMap[ex.id]?.name || ex.name) === exercise.name)
            }));
    }, [exercise.name, history]);

    const updateSet = (setIdx, field, value) => {
        const newData = [...workoutData];
        newData[exIndex].sets[setIdx][field] = value;
        setWorkoutData(newData);
    };

    const addSet = () => {
        const newData = [...workoutData];
        const lastSet = newData[exIndex].sets[newData[exIndex].sets.length - 1];
        newData[exIndex].sets.push(lastSet ? { ...lastSet } : { weight: '', reps: '' });
        setWorkoutData(newData);
    };

    const removeSet = (setIdx) => {
        const newData = [...workoutData];
        newData[exIndex].sets.splice(setIdx, 1);
        setWorkoutData(newData);
    };

    const updateNotes = (val) => {
        const newData = [...workoutData];
        newData[exIndex].notes = val;
        setWorkoutData(newData);
    };

    const nextExercise = () => {
        if (exIndex < workout.exercises.length - 1) setExIndex(exIndex + 1);
        else finishWorkout({ weekName: workout.weekName, dayName: workout.dayName, exercises: workoutData });
    };

    const { Plus, Trash } = window.Icons;

    return (
        <div className="fixed inset-0 w-full h-full bg-lightBg dark:bg-darkBg z-[200] flex flex-col pt-safe">
            <div className="flex-none h-14 flex items-center justify-between px-5 glass border-b border-gray-200/50 dark:border-white/5 z-10 w-full">
                <button onClick={cancelWorkout} className="text-red-500 font-semibold active-bounce">Cancel</button>
                <div className="font-bold text-gray-500 text-sm tracking-widest uppercase">
                    {exIndex + 1} OF {workout.exercises.length}
                </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar px-5 pt-6 pb-32">
                <h2 className="text-3xl font-black mb-6 leading-tight tracking-tight break-words pr-4">{exercise.name}</h2>

                <div className="mb-8">
                    <h3 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-2 pl-1">Previous Workout</h3>
                    {previousWorkouts.length > 0 ? (
                        <div className="space-y-3">
                            {previousWorkouts.map((w, idx) => (
                                <div key={idx} className="bg-gray-200/50 dark:bg-darkCard rounded-2xl p-4">
                                    <div className="text-xs font-bold text-brand mb-3">{w.date}</div>
                                    {w.exercise.sets.filter(s => s.weight || s.reps).map((set, i) => (
                                        <div key={i} className="flex items-center py-1 text-gray-600 dark:text-gray-300 font-semibold">
                                            <span className="w-8 text-sm text-gray-400">{i + 1}</span>
                                            <span>{set.weight ? `${set.weight} kg × ${set.reps}` : `${set.reps} reps`}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-200/50 dark:bg-darkCard rounded-2xl p-4 text-sm text-gray-500 font-medium">
                            No previous data for this exercise.
                        </div>
                    )}
                </div>

                <h3 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-2 pl-1">Today</h3>
                <div className="w-full">
                    <div className="grid grid-cols-[2rem_1fr_1fr_2.5rem] gap-2 items-center mb-2 px-1">
                        <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Set</div>
                        <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">KG</div>
                        <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reps</div>
                        <div></div>
                    </div>
                    {currentData.sets.map((set, i) => (
                        <div key={i} className="grid grid-cols-[2rem_1fr_1fr_2.5rem] gap-3 items-center mb-3">
                            <div className="text-center font-bold text-gray-400">{i + 1}</div>
                            <input type="number" inputMode="decimal" placeholder="0" value={set.weight} onChange={e => updateSet(i, 'weight', e.target.value)}
                                className="w-full min-w-0 bg-white dark:bg-darkInput border-none rounded-xl h-14 text-center text-xl font-bold shadow-sm outline-none focus:ring-2 focus:ring-brand transition-all text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-600" />
                            <input type="number" inputMode="numeric" placeholder="0" value={set.reps} onChange={e => updateSet(i, 'reps', e.target.value)}
                                className="w-full min-w-0 bg-white dark:bg-darkInput border-none rounded-xl h-14 text-center text-xl font-bold shadow-sm outline-none focus:ring-2 focus:ring-brand transition-all text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-600" />
                            <button onClick={() => removeSet(i)} className="flex justify-center items-center w-full h-full text-red-500/80 active-bounce"><Trash /></button>
                        </div>
                    ))}
                </div>

                <button onClick={addSet} className="w-full h-14 mt-2 rounded-xl font-bold text-brand bg-brand/10 active-bounce flex items-center justify-center mb-8">
                    <span className="mr-2"><Plus /></span> Add Set
                </button>

                <h3 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-2 pl-1">Notes</h3>
                <textarea placeholder="e.g. Felt heavy, increase rest time" value={currentData.notes} onChange={e => updateNotes(e.target.value)}
                    className="w-full bg-white dark:bg-darkInput border-none rounded-xl p-4 text-gray-800 dark:text-gray-200 min-h-[100px] shadow-sm outline-none focus:ring-2 focus:ring-brand resize-none"></textarea>
            </div>

            <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-t from-lightBg via-lightBg to-transparent dark:from-darkBg dark:via-darkBg pb-safe pt-8 px-5 z-20">
                <button onClick={nextExercise}
                    className={`w-full text-white text-xl font-bold h-16 rounded-2xl shadow-lg shadow-black/20 transform active-bounce ${exIndex < workout.exercises.length - 1 ? 'bg-black dark:bg-white dark:text-black' : 'bg-brandGreen'}`}>
                    {exIndex < workout.exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
                </button>
            </div>
        </div>
    );
};