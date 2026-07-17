const { useState: useHistoryState } = React;

window.HistoryScreen = function HistoryScreen({ history }) {
    const [expandedId, setExpandedId] = useHistoryState(null);
    const { ChevronDown } = window.Icons;

    if (history.length === 0) return <div className="p-6 pt-20 text-center text-gray-500 font-medium">No completed workouts yet.</div>;

    return (
        <div className="p-5 pb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight mb-6 mt-4">History</h1>
            {history.map(w => {
                const dateStr = new Date(w.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
                const isExp = expandedId === w.id;
                return (
                    <div key={w.id} className="bg-lightCard dark:bg-darkCard rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300">
                        <div className="p-5 active:bg-gray-50 dark:active:bg-white/5 cursor-pointer flex justify-between items-center" onClick={() => setExpandedId(isExp ? null : w.id)}>
                            <div>
                                <div className="text-brand font-semibold text-sm mb-1">{dateStr}</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{w.dayName.split('—')[0]}</div>
                                <div className="text-sm text-gray-500 mt-1">{w.exercises.length} exercises</div>
                            </div>
                            <div className={`text-gray-400 transition-transform duration-300 ${isExp ? 'rotate-180' : ''}`}>
                                <ChevronDown />
                            </div>
                        </div>
                        
                        {isExp && (
                            <div className="bg-gray-50/50 dark:bg-black/20 p-5 border-t border-gray-100 dark:border-white/5 space-y-5">
                                {w.exercises.filter(ex => ex.sets.some(s => s.weight || s.reps)).map((ex, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">{window.exerciseMap[ex.id]?.name || ex.name}</div>
                                        <div className="space-y-1 ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {ex.sets.map((s, idx) => (s.weight || s.reps) && (
                                                <div key={idx} className="flex items-center">
                                                    <span className="w-6 text-gray-400">{idx+1}.</span>
                                                    <span>{s.weight ? `${s.weight} kg × ${s.reps}` : `${s.reps} reps`}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {ex.notes && <div className="mt-2 text-sm italic text-gray-500 bg-gray-200/50 dark:bg-white/5 p-3 rounded-xl border border-gray-200/50 dark:border-white/5">“{ex.notes}”</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};