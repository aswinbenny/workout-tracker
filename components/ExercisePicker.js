window.ExercisePicker = function ExercisePicker({ pickerTarget, setPickerTarget, searchText, setSearchText, filteredExercises, groupedExercises, handleSelectExercise }) {
    if (!pickerTarget) return null;

    return (
        <div className="fixed inset-0 w-full h-full bg-lightBg dark:bg-darkBg z-[300] flex flex-col pt-safe animate-fullscreen-slide-up">
            <div className="w-full max-w-md mx-auto flex flex-col h-full relative">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white/10 shrink-0">
                    <h2 className="text-xl font-bold">Add Exercise</h2>
                    <button onClick={() => setPickerTarget(null)} className="text-brand font-semibold active-bounce text-lg">Cancel</button>
                </div>
                
                <div className="p-4 shrink-0">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search exercises..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full bg-gray-200/60 dark:bg-darkInput border-none rounded-xl h-12 pl-10 pr-4 text-[17px] outline-none focus:ring-2 focus:ring-brand transition-all text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4 pb-safe hide-scrollbar">
                   {searchText.trim() ? (
                       <div className="pb-8 space-y-2">
                           {filteredExercises.length === 0 ? (
                               <div className="text-center text-gray-500 mt-8 font-medium">No exercises found.</div>
                           ) : (
                               <div className="bg-lightCard dark:bg-darkCard rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden mb-8">
                                   {filteredExercises.map((ex, idx) => (
                                       <div key={ex.id} onClick={() => handleSelectExercise(ex)} className={`p-4 flex flex-col active:bg-gray-200 dark:active:bg-white/10 cursor-pointer ${idx !== filteredExercises.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}>
                                           <span className="text-[17px] font-semibold text-gray-900 dark:text-white leading-tight">{ex.name}</span>
                                           <span className="text-[13px] text-gray-500 font-medium mt-0.5">{ex.muscle}</span>
                                       </div>
                                   ))}
                               </div>
                           )}
                       </div>
                   ) : (
                       <div className="pb-8">
                           {Object.keys(groupedExercises).map(muscle => (
                               <div key={muscle} className="mb-6">
                                   <h3 className="text-[13px] uppercase font-bold text-gray-500 tracking-wider mb-2 pl-2 sticky top-0 py-1 z-10 bg-lightBg/95 dark:bg-darkBg/95 backdrop-blur-sm">{muscle}</h3>
                                   <div className="bg-lightCard dark:bg-darkCard rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                                       {groupedExercises[muscle].map((ex, idx) => (
                                           <div key={ex.id} onClick={() => handleSelectExercise(ex)} className={`p-4 flex flex-col active:bg-gray-200 dark:active:bg-white/10 cursor-pointer ${idx !== groupedExercises[muscle].length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}>
                                               <span className="text-[17px] font-semibold text-gray-900 dark:text-white leading-tight">{ex.name}</span>
                                               <span className="text-[13px] text-gray-500 font-medium mt-0.5">{ex.muscle}</span>
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           ))}
                       </div>
                   )}
                </div>
            </div>
        </div>
    );
};