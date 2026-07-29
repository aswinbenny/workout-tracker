const { useState, useEffect } = React;

const TabButton = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-16 active-bounce transition-colors ${active ? 'text-brand' : 'text-gray-400 dark:text-gray-500'}`}>
        <div className="mb-1">{icon}</div>
        <span className="text-[10px] font-semibold tracking-wide">{label}</span>
    </button>
);

function App() {
    const [plan, setPlan] = window.useLocalStorage('workout_plan', window.DEFAULT_PLAN);
    const [history, setHistory] = window.useLocalStorage('workout_history', []);
    const [theme, setTheme] = window.useLocalStorage('workout_theme', 'dark');
    const [currentTab, setCurrentTab] = useState('home');
    const [activeWorkout, setActiveWorkout] = useState(null);
    
    // ADDED
    const [confirmConfig, setConfirmConfig] = useState(null);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    if (activeWorkout) {
        return (
            <React.Fragment>
                <window.WorkoutScreen 
                    workout={activeWorkout} 
                    finishWorkout={(completedWorkout) => {
                        setHistory([{ id: window.generateId(), date: new Date().toISOString(), ...completedWorkout }, ...history]);
                        setActiveWorkout(null);
                    }}
                    // UPDATED
                    cancelWorkout={() => {
                        setConfirmConfig({
                            title: "Cancel Workout?",
                            message: "No progress will be saved.",
                            isDestructive: true,
                            confirmText: "Cancel",
                            cancelText: "Resume",
                            onConfirm: () => setActiveWorkout(null)
                        });
                    }}
                    history={history}
                />
                {/* ADDED MODAL RENDER TO WORKOUT VIEW */}
                <window.ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative hide-scrollbar pb-[90px]">
                <div className="w-full pt-safe min-h-full">
                    {currentTab === 'home' && <window.HomeScreen plan={plan} startWorkout={(w) => setActiveWorkout(w)} />}
                    {currentTab === 'history' && <window.HistoryScreen history={history} />}
                    {currentTab === 'plan' && <window.PlanScreen plan={plan} setPlan={setPlan} />}
                    {currentTab === 'settings' && <window.SettingsScreen theme={theme} setTheme={setTheme} setPlan={setPlan} setHistory={setHistory} />}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto glass border-t border-gray-200/50 dark:border-white/10 pb-safe pt-2 px-6 flex justify-between z-[100] transition-all">
                <TabButton icon={<window.Icons.Home active={currentTab==='home'} />} label="Home" active={currentTab==='home'} onClick={() => setCurrentTab('home')} />
                <TabButton icon={<window.Icons.History active={currentTab==='history'} />} label="History" active={currentTab==='history'} onClick={() => setCurrentTab('history')} />
                <TabButton icon={<window.Icons.Plan active={currentTab==='plan'} />} label="Plan" active={currentTab==='plan'} onClick={() => setCurrentTab('plan')} />
                <TabButton icon={<window.Icons.Settings active={currentTab==='settings'} />} label="Settings" active={currentTab==='settings'} onClick={() => setCurrentTab('settings')} />
            </div>
            
            {/* ADDED MODAL RENDER TO MAIN TABS VIEW */}
            <window.ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />
        </React.Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);