const { useState: usePlanState, useMemo: usePlanMemo } = React;

window.PlanScreen = function PlanScreen({ plan, setPlan }) {
    const updatePlan = (newPlan) => setPlan([...newPlan]);
    
    const [modalConfig, setModalConfig] = usePlanState(null);
    const [confirmConfig, setConfirmConfig] = usePlanState(null); // ADDED
    const [pickerTarget, setPickerTarget] = usePlanState(null);
    const [searchText, setSearchText] = usePlanState("");

    const addWeek = () => setModalConfig({
        title: "Add Week", subtitle: "Enter a name for your workout week.", placeholder: "Week A", initialValue: "",
        onSave: (name) => { updatePlan([...plan, { id: window.generateId(), name, days: [] }]); setModalConfig(null); }
    });
    
    const renameWeek = (wIdx) => setModalConfig({
        title: "Rename Week", subtitle: "Enter a new name for this week.", placeholder: "Week A", initialValue: plan[wIdx].name,
        onSave: (name) => { plan[wIdx].name = name; updatePlan(plan); setModalConfig(null); }
    });
    
    // UPDATED
    const deleteWeek = (wIdx) => { 
        setConfirmConfig({
            title: "Delete Week?",
            message: "Are you sure you want to delete this entire week?",
            isDestructive: true,
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: () => { plan.splice(wIdx, 1); updatePlan(plan); }
        });
    };
    
    const addDay = (wIdx) => setModalConfig({
        title: "Add Workout Day", 
        subtitle: "Enter the day and its focus.", 
        showDescriptionInput: true,
        placeholder: "Day (e.g., Monday)", 
        descriptionPlaceholder: "Focus (e.g., Upper Body)",
        initialValue: "",
        initialDescription: "",
        onSave: (data) => { 
            plan[wIdx].days.push({ 
                id: window.generateId(), 
                name: data.name, 
                description: data.description, 
                exercises: [] 
            }); 
            updatePlan(plan); 
            setModalConfig(null); 
        }
    });
    
    const renameDay = (wIdx, dIdx) => {
        const currentDay = plan[wIdx].days[dIdx];
        setModalConfig({
            title: "Edit Workout Day", 
            subtitle: "Update the day and its focus.", 
            showDescriptionInput: true,
            placeholder: "Day (e.g., Monday)", 
            descriptionPlaceholder: "Focus (e.g., Upper Body)",
            initialValue: currentDay.name,
            initialDescription: currentDay.description || "",
            onSave: (data) => { 
                currentDay.name = data.name; 
                currentDay.description = data.description;
                updatePlan(plan); 
                setModalConfig(null); 
            }
        });
    };
    
    // UPDATED
    const deleteDay = (wIdx, dIdx) => { 
        setConfirmConfig({
            title: "Delete Day?",
            message: "Are you sure you want to delete this day?",
            isDestructive: true,
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: () => { plan[wIdx].days.splice(dIdx, 1); updatePlan(plan); }
        });
    };
    
    const moveDay = (wIdx, dIdx, dir) => { const arr = plan[wIdx].days; if (dIdx + dir < 0 || dIdx + dir >= arr.length) return; [arr[dIdx], arr[dIdx+dir]] = [arr[dIdx+dir], arr[dIdx]]; updatePlan(plan); };
    
    const triggerAddExercise = (wIdx, dIdx) => { setPickerTarget({ wIdx, dIdx }); setSearchText(""); };

    // UPDATED
    const handleSelectExercise = (exercise) => {
        const { wIdx, dIdx } = pickerTarget;
        const currentExercises = plan[wIdx].days[dIdx].exercises;
        if (currentExercises.some(ex => ex.id === exercise.id)) {
            return setConfirmConfig({
                title: "Already Added",
                message: "This exercise is already added to this day.",
                hideCancel: true,
                confirmText: "OK"
            });
        }
        currentExercises.push({ id: exercise.id });
        updatePlan(plan);
        setPickerTarget(null);
    };
    
    const deleteExercise = (wIdx, dIdx, eIdx) => { plan[wIdx].days[dIdx].exercises.splice(eIdx, 1); updatePlan(plan); };
    const moveExercise = (wIdx, dIdx, eIdx, dir) => { const arr = plan[wIdx].days[dIdx].exercises; if (eIdx + dir < 0 || eIdx + dir >= arr.length) return; [arr[eIdx], arr[eIdx+dir]] = [arr[eIdx+dir], arr[eIdx]]; updatePlan(plan); };

    const filteredExercises = usePlanMemo(() => {
        if (!searchText.trim()) return window.DEFAULT_EXERCISE_LIBRARY;
        const q = searchText.toLowerCase();
        return window.DEFAULT_EXERCISE_LIBRARY.filter(ex => ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q));
    }, [searchText]);

    const groupedExercises = usePlanMemo(() => {
        if (searchText.trim()) return null;
        const groups = {};
        filteredExercises.forEach(ex => { if (!groups[ex.muscle]) groups[ex.muscle] = []; groups[ex.muscle].push(ex); });
        return groups;
    }, [filteredExercises, searchText]);

    const { Plus, ChevronUp, ChevronDown, Trash } = window.Icons;

    return (
        <div className="p-5 pb-8 space-y-8">
            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold tracking-tight">Plan Editor</h1>
                <button onClick={addWeek} className="flex items-center text-brand font-bold bg-brand/10 px-4 py-2 rounded-full active-bounce"><Plus /> <span className="ml-1 text-sm">Week</span></button>
            </div>

            {plan.map((week, wIdx) => (
                <div key={week.id} className="space-y-4">
                    <div className="flex justify-between items-end px-1 border-b border-gray-200 dark:border-white/10 pb-2">
                        <h2 className="text-2xl font-bold">{week.name}</h2>
                        <div className="flex space-x-3 mb-1">
                            <button onClick={() => renameWeek(wIdx)} className="text-sm text-brand font-semibold">Rename</button>
                            <button onClick={() => deleteWeek(wIdx)} className="text-sm text-red-500 font-semibold">Delete</button>
                        </div>
                    </div>

                    {week.days.map((day, dIdx) => (
                        <div key={day.id} className="bg-lightCard dark:bg-darkCard rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 p-0 overflow-hidden mb-4 shadow-sm">
                            <div className="bg-gray-100/80 dark:bg-darkCard p-4 flex justify-between items-center border-b border-gray-200/50 dark:border-white/5">
                                <h3 className="font-bold text-lg cursor-pointer flex-1 truncate pr-2" onClick={() => renameDay(wIdx, dIdx)}>
                                    {day.name} {day.description ? `— ${day.description}` : ""}
                                </h3>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <button onClick={() => moveDay(wIdx, dIdx, -1)} className="p-2 active-bounce"><ChevronUp/></button>
                                    <button onClick={() => moveDay(wIdx, dIdx, 1)} className="p-2 active-bounce"><ChevronDown/></button>
                                    <button onClick={() => deleteDay(wIdx, dIdx)} className="p-2 text-red-500 active-bounce"><Trash /></button>
                                </div>
                            </div>
                            <div className="p-2">
                                {day.exercises.map((ex, eIdx) => (
                                    <div key={ex.id} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-white/5 last:border-0 group">
                                        <div className="flex-1 font-medium text-gray-800 dark:text-gray-200 text-lg pr-2 truncate">{window.exerciseMap[ex.id]?.name || ex.name}</div>
                                        <div className="flex items-center text-gray-400">
                                           <button onClick={() => moveExercise(wIdx, dIdx, eIdx, -1)} className="p-2 active-bounce"><ChevronUp/></button>
                                           <button onClick={() => moveExercise(wIdx, dIdx, eIdx, 1)} className="p-2 active-bounce"><ChevronDown/></button>
                                           <button onClick={() => deleteExercise(wIdx, dIdx, eIdx)} className="p-2 text-red-500 active-bounce"><Trash /></button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => triggerAddExercise(wIdx, dIdx)} className="w-full text-left p-3 text-brand font-semibold flex items-center">
                                    <Plus /> <span className="ml-2">Add Exercise</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addDay(wIdx)} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl text-gray-500 dark:text-gray-400 font-bold active-bounce">
                        + Add Day
                    </button>
                </div>
            ))}

            <window.InputModal config={modalConfig} onClose={() => setModalConfig(null)} />
            {/* ADDED MODAL RENDER */}
            <window.ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />
            
            <window.ExercisePicker pickerTarget={pickerTarget} setPickerTarget={setPickerTarget} searchText={searchText} setSearchText={setSearchText} filteredExercises={filteredExercises} groupedExercises={groupedExercises} handleSelectExercise={handleSelectExercise} />
        </div>
    );
};