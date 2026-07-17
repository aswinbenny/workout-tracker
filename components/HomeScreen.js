const { useState, useEffect } = React;

window.HomeScreen = function HomeScreen({ plan, startWorkout }) {
    const [selectedWeekId, setSelectedWeekId] = useState(plan[0]?.id);
    const [selectedDayId, setSelectedDayId] = useState(null);

    const week = plan.find(w => w.id === selectedWeekId) || plan[0];
    const day = week?.days.find(d => d.id === selectedDayId) || week?.days[0];

    useEffect(() => {
        if (week && !week.days.find(d => d.id === selectedDayId)) {
            setSelectedDayId(week.days[0]?.id);
        }
    }, [selectedWeekId, week, selectedDayId]);

    if (!plan || plan.length === 0) return <div className="p-6 pt-20 text-center text-gray-500 font-medium">No plan found. Create one in the Plan tab.</div>;

    return (
        <div className="p-5 pb-32">
            <div className="mt-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-6">Workout</h1>
                
                <div className="flex space-x-2 overflow-x-auto hide-scrollbar snap-x">
                    {plan.map(w => (
                        <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                            className={`snap-start px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${w.id === selectedWeekId ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'bg-gray-200 dark:bg-darkCard text-gray-600 dark:text-gray-400'}`}>
                            {w.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto hide-scrollbar snap-x mb-6">
                {week?.days.map(d => (
                    <button key={d.id} onClick={() => setSelectedDayId(d.id)}
                        className={`snap-start px-4 py-2 rounded-2xl font-semibold whitespace-nowrap transition-all ${d.id === selectedDayId ? 'bg-brand/10 text-brand border border-brand/20' : 'bg-transparent text-gray-500 border border-transparent'}`}>
                        {d.name.split('—')[0].trim()}
                    </button>
                ))}
            </div>

            {day && (
                <div className="bg-lightCard dark:bg-darkCard rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 p-0 overflow-hidden mb-6">
                    <div className="bg-gray-50/50 dark:bg-black/20 p-5 border-b border-gray-100 dark:border-white/5">
                        <h3 className="text-xl font-bold">{day.name}</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">{day.exercises.length} exercises</p>
                    </div>
                    <div className="p-2">
                        {day.exercises.map((ex, i) => (
                            <div key={ex.id} className="flex items-center px-3 py-3 text-gray-800 dark:text-gray-200 font-medium text-lg border-b border-gray-100 dark:border-white/5 last:border-0">
                                <span className="text-gray-300 dark:text-gray-600 w-8 text-sm">{i+1}</span>
                                <span className="truncate">{window.exerciseMap[ex.id]?.name || ex.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {day && (
                <div className="fixed bottom-[90px] left-0 right-0 w-full max-w-md mx-auto px-5 z-40 pointer-events-none pb-safe">
                    <button onClick={() => startWorkout({ weekName: week.name, dayName: day.name, exercises: day.exercises })}
                        className="w-full bg-brand text-white text-xl font-bold py-4 rounded-[20px] shadow-lg shadow-brand/30 pointer-events-auto active-bounce">
                        Start Workout
                    </button>
                </div>
            )}
        </div>
    );
};