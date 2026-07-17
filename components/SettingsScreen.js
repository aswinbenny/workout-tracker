window.SettingsScreen = function SettingsScreen({ theme, setTheme, setPlan, setHistory }) {
    const exportData = () => {
        const data = JSON.stringify({ plan: JSON.parse(localStorage.getItem('workout_plan')), history: JSON.parse(localStorage.getItem('workout_history')) });
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'workout_backup.json';
        a.click();
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (data.plan && data.history) {
                    setPlan(data.plan);
                    setHistory(data.history);
                    alert("Data imported successfully!");
                } else throw new Error();
            } catch(err) { alert("Invalid backup file."); }
        };
        reader.readAsText(file);
    };

    const clearData = () => {
        if(confirm("DANGER: Delete all history and reset plan?")) {
            setHistory([]);
            setPlan(window.DEFAULT_PLAN);
        }
    };

    const SettingRow = ({ label, onClick, children, isDanger }) => (
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-white/5 last:border-0 bg-white dark:bg-darkCard cursor-pointer active:bg-gray-50 dark:active:bg-white/5 transition-colors" onClick={onClick}>
            <span className={`font-medium text-lg ${isDanger ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{label}</span>
            <div className="flex items-center text-gray-400">
                {children || <window.Icons.ChevronRight />}
            </div>
        </div>
    );

    return (
        <div className="p-5 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight mt-4 mb-2">Settings</h1>
            
            <div>
                <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 pl-4">Appearance</h3>
                <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
                    <SettingRow label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                </div>
            </div>

            <div>
                <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 pl-4">Data Management</h3>
                <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
                    <SettingRow label="Export Backup (JSON)" onClick={exportData} />
                    <label className="flex justify-between items-center p-4 bg-white dark:bg-darkCard cursor-pointer active:bg-gray-50 dark:active:bg-white/5 transition-colors">
                        <span className="font-medium text-lg text-gray-900 dark:text-white">Import Backup</span>
                        <window.Icons.ChevronRight className="text-gray-400" />
                        <input type="file" accept=".json" className="hidden" onChange={importData} />
                    </label>
                </div>
            </div>

            <div>
                <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 pl-4">Danger Zone</h3>
                <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
                    <SettingRow label="Reset All Data" onClick={clearData} isDanger={true} />
                </div>
            </div>
        </div>
    );
};