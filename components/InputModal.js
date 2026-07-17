const { useState, useEffect, useRef } = React;

window.InputModal = function InputModal({ config, onClose }) {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (config) {
            setValue(config.initialValue || "");
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 50);
        }
    }, [config]);

    if (!config) return null;

    const isSaveDisabled = !value.trim();

    const handleSave = () => {
        if (!isSaveDisabled) config.onSave(value.trim());
    };

    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-[320px] bg-white dark:bg-darkCard rounded-[28px] shadow-2xl flex flex-col p-6 animate-slide-up border border-gray-100 dark:border-white/10">
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-1">{config.title}</h2>
                {config.subtitle && <p className="text-[13px] text-gray-500 text-center mb-5 leading-tight">{config.subtitle}</p>}
                
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder={config.placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="w-full bg-gray-100 dark:bg-[#2C2C2E] border-none rounded-xl h-12 px-4 text-[17px] outline-none focus:ring-2 focus:ring-brand transition-all text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mb-6 shadow-sm"
                />

                <div className="flex space-x-3">
                    <button onClick={onClose} className="flex-1 py-3 bg-gray-200/80 dark:bg-white/10 rounded-xl font-semibold text-gray-700 dark:text-gray-300 active-bounce">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaveDisabled} className={`flex-1 py-3 rounded-xl font-semibold text-white active-bounce transition-opacity ${isSaveDisabled ? 'bg-brand/50 opacity-50 cursor-not-allowed' : 'bg-brand'}`}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};