window.ConfirmModal = function ConfirmModal({ config, onClose }) {
    if (!config) return null;

    const handleConfirm = () => {
        if (config.onConfirm) config.onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-[320px] bg-white dark:bg-darkCard rounded-[28px] shadow-2xl flex flex-col p-6 animate-slide-up border border-gray-100 dark:border-white/10">
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">{config.title}</h2>
                <p className="text-[15px] text-gray-500 text-center mb-6 leading-relaxed">{config.message}</p>
                
                <div className="flex space-x-3">
                    {/* Only show the cancel button if hideCancel is NOT true */}
                    {!config.hideCancel && (
                        <button onClick={onClose} className="flex-1 py-3 bg-gray-200/80 dark:bg-white/10 rounded-xl font-semibold text-gray-700 dark:text-gray-300 active-bounce">
                            {config.cancelText || "Keep"}
                        </button>
                    )}
                    <button onClick={handleConfirm} className={`flex-1 py-3 rounded-xl font-semibold text-white active-bounce ${config.isDestructive ? 'bg-red-500' : 'bg-brand'}`}>
                        {config.confirmText || "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};