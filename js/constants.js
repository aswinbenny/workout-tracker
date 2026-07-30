window.DEFAULT_PLAN = [
    {
        id: "w1",
        name: "Week A",
        days: [
            {
                id: "d1",
                name: "Monday",
                description: "Upper Body A (Push/Pull Strength)",
                exercises: [
                    { id: "chest_flat_barbell" },
                    { id: "back_barbell_row" },
                    { id: "chest_incline_db" },
                    { id: "back_pullup" },
                    { id: "tri_single_db_ext" },
                    { id: "shoulder_lateral_db" } 
                ]
            },
            {
                id: "d2",
                name: "Wednesday",
                description: "Lower Body A (Squat Emphasis)",
                exercises: [
                    { id: "leg_back_squat" },
                    { id: "leg_rdl" },
                    { id: "leg_bulgarian" },
                    { id: "leg_lunge" },
                    { id: "calf_standing" },
                    { id: "leg_sumo_squat" }
                ]
            },
            {
                id: "d3",
                name: "Friday",
                description: "Upper Body B (Shoulder & Arm Emphasis)",
                exercises: [
                    { id: "shoulder_barbell_press" },
                    { id: "chest_dips" },
                    { id: "back_db_row" },
                    { id: "shoulder_reverse_pecdeck" },
                    { id: "shoulder_lateral_cable" }, 
                    { id: "bicep_hammer" }
                ]
            },
            {
                id: "d4",
                name: "Saturday",
                description: "Lower Body B (Machine Hypertrophy)",
                exercises: [
                    { id: "leg_leverage_squat" },
                    { id: "leg_legpress" },
                    { id: "leg_extension" },
                    { id: "back_hyperextension" },
                    { id: "leg_curl_seated" },
                    { id: "calf_standing" }
                ]
            }
        ]
    },
    {
        id: "w2",
        name: "Week B",
        days: [
            {
                id: "d5",
                name: "Monday",
                description: "Upper Body C (Incline & Lat Focus)",
                exercises: [
                    { id: "chest_machine_incline_press" },
                    { id: "back_cable_row" },
                    { id: "chest_pecdeck" },
                    { id: "back_lat_pulldown" },
                    { id: "tri_skull" },
                    { id: "bicep_machine" },
                    { id: "shoulder_facepull" } 
                ]
            },
            {
                id: "d6",
                name: "Wednesday",
                description: "Lower Body C (Deadlift & Power Focus)",
                exercises: [
                    { id: "back_deadlift" }, // Moved in for Power Focus
                    { id: "leg_legpress" },  // Moved in to replace Back Hyperextension
                    { id: "leg_bulgarian" },
                    { id: "leg_extension" },
                    { id: "leg_curl_seated" },
                    { id: "calf_standing" }
                ]
            },
            {
                id: "d7",
                name: "Friday",
                description: "Upper Body D (Dumbbell Mastery)",
                exercises: [
                    { id: "shoulder_db_press" },
                    { id: "back_close_pulldown" },
                    { id: "chest_cable_fly_mid" },
                    { id: "shoulder_lateral_cable" }, 
                    { id: "tri_bar" },
                    { id: "bicep_cable" }
                ]
            },
            {
                id: "d8",
                name: "Saturday",
                description: "Lower Body D (Speed & Volume)",
                exercises: [
                    { id: "leg_back_squat" }, // Moved in for Speed/Volume
                    { id: "leg_curl_seated" },
                    { id: "leg_bulgarian" },
                    { id: "back_hyperextension" }, // Moved in to replace Leg Press
                    { id: "calf_legpress" },
                    { id: "leg_extension" }
                ]
            }
        ]
    }
];

window.DEFAULT_EXERCISE_LIBRARY = [
    { id: "chest_flat_barbell", name: "Barbell Bench Press", muscle: "Chest" },
    { id: "chest_incline_barbell", name: "Incline Barbell Bench Press", muscle: "Chest" },
    { id: "chest_decline_barbell", name: "Decline Barbell Bench Press", muscle: "Chest" },
    { id: "chest_flat_db", name: "Dumbbell Bench Press", muscle: "Chest" },
    { id: "chest_incline_db", name: "Incline Dumbbell Press", muscle: "Chest" },
    { id: "chest_decline_db", name: "Decline Dumbbell Press", muscle: "Chest" },
    { id: "chest_machine_press", name: "Machine Chest Press", muscle: "Chest" },
    { id: "chest_machine_incline_press", name: "Machine Incline Press", muscle: "Chest" },
    { id: "chest_smith_press", name: "Smith Machine Bench Press", muscle: "Chest" },
    { id: "chest_pecdeck", name: "Pec Deck Fly", muscle: "Chest" },
    { id: "chest_cable_fly_mid", name: "Cable Fly", muscle: "Chest" },
    { id: "chest_cable_fly_high", name: "High to Low Cable Fly", muscle: "Chest" },
    { id: "chest_cable_fly_low", name: "Low to High Cable Fly", muscle: "Chest" },
    { id: "chest_pushup", name: "Push-up", muscle: "Chest" },
    { id: "chest_weighted_pushup", name: "Weighted Push-up", muscle: "Chest" },
    { id: "chest_dips", name: "Chest Dips", muscle: "Chest" },
    { id: "chest_machine_fly", name: "Machine Fly", muscle: "Chest" },
    { id: "back_pullup", name: "Pull-up", muscle: "Back" },
    { id: "back_chinup", name: "Chin-up", muscle: "Back" },
    { id: "back_assisted_pullup", name: "Assisted Pull-up", muscle: "Back" },
    { id: "back_lat_pulldown", name: "Wide Grip Lat Pulldown", muscle: "Back" },
    { id: "back_close_pulldown", name: "Close Grip Lat Pulldown", muscle: "Back" },
    { id: "back_reverse_pulldown", name: "Reverse Grip Lat Pulldown", muscle: "Back" },
    { id: "back_barbell_row", name: "Barbell Row", muscle: "Back" },
    { id: "back_pendlay", name: "Pendlay Row", muscle: "Back" },
    { id: "back_db_row", name: "One Arm Dumbbell Row", muscle: "Back" },
    { id: "back_machine_row", name: "Machine Row", muscle: "Back" },
    { id: "back_cable_row", name: "Seated Cable Row", muscle: "Back" },
    { id: "back_tbar", name: "T-Bar Row", muscle: "Back" },
    { id: "back_chest_supported", name: "Chest Supported Row", muscle: "Back" },
    { id: "back_meadows", name: "Meadows Row", muscle: "Back" },
    { id: "back_straight_arm", name: "Straight Arm Pulldown", muscle: "Back" },
    { id: "back_deadlift", name: "Deadlift", muscle: "Back" },
    { id: "back_rackpull", name: "Rack Pull", muscle: "Back" },
    { id: "back_hyperextension", name: "Back Extension", muscle: "Back" },
    { id: "shoulder_db_press", name: "Dumbbell Shoulder Press", muscle: "Shoulders" },
    { id: "shoulder_machine_press", name: "Machine Shoulder Press", muscle: "Shoulders" },
    { id: "shoulder_barbell_press", name: "Barbell Overhead Press", muscle: "Shoulders" },
    { id: "shoulder_seated_barbell", name: "Seated Barbell Press", muscle: "Shoulders" },
    { id: "shoulder_arnold", name: "Arnold Press", muscle: "Shoulders" },
    { id: "shoulder_lateral_db", name: "Dumbbell Lateral Raise", muscle: "Shoulders" },
    { id: "shoulder_lateral_cable", name: "Cable Lateral Raise", muscle: "Shoulders" },
    { id: "shoulder_front_db", name: "Front Raise", muscle: "Shoulders" },
    { id: "shoulder_front_cable", name: "Cable Front Raise", muscle: "Shoulders" }, 
    { id: "shoulder_front_plate", name: "Plate Front Raise", muscle: "Shoulders" },
    { id: "shoulder_rear_db", name: "Rear Delt Fly", muscle: "Shoulders" },
    { id: "shoulder_reverse_pecdeck", name: "Reverse Pec Deck", muscle: "Shoulders" },
    { id: "shoulder_facepull", name: "Face Pull", muscle: "Shoulders" },
    { id: "shoulder_upright", name: "Upright Row", muscle: "Shoulders" },
    { id: "shoulder_shrug_db", name: "Dumbbell Shrugs", muscle: "Traps" },
    { id: "shoulder_shrug_barbell", name: "Barbell Shrugs", muscle: "Traps" },
    { id: "bicep_db_curl", name: "Dumbbell Curl", muscle: "Biceps" },
    { id: "bicep_alternating", name: "Alternating Dumbbell Curl", muscle: "Biceps" },
    { id: "bicep_hammer", name: "Hammer Curl", muscle: "Biceps" },
    { id: "bicep_crossbody", name: "Cross Body Hammer Curl", muscle: "Biceps" },
    { id: "bicep_incline", name: "Incline Dumbbell Curl", muscle: "Biceps" },
    { id: "bicep_preacher", name: "Preacher Curl", muscle: "Biceps" },
    { id: "bicep_machine", name: "Machine Preacher Curl", muscle: "Biceps" },
    { id: "bicep_ez", name: "EZ Bar Curl", muscle: "Biceps" },
    { id: "bicep_barbell", name: "Barbell Curl", muscle: "Biceps" },
    { id: "bicep_drag", name: "Drag Curl", muscle: "Biceps" },
    { id: "bicep_concentration", name: "Concentration Curl", muscle: "Biceps" },
    { id: "bicep_cable", name: "Cable Curl", muscle: "Biceps" },
    { id: "bicep_bayesian", name: "Bayesian Cable Curl", muscle: "Biceps" },
    { id: "bicep_spider", name: "Spider Curl", muscle: "Biceps" },
    { id: "tri_rope", name: "Rope Pushdown", muscle: "Triceps" },
    { id: "tri_bar", name: "Straight Bar Pushdown", muscle: "Triceps" },
    { id: "tri_vbar", name: "V-Bar Pushdown", muscle: "Triceps" },
    { id: "tri_reverse", name: "Reverse Grip Pushdown", muscle: "Triceps" },
    { id: "tri_overhead_rope", name: "Overhead Rope Extension", muscle: "Triceps" },
    { id: "tri_overhead_db", name: "Overhead Dumbbell Extension", muscle: "Triceps" },
    { id: "tri_single_db_ext", name: "Single-Arm Dumbbell Tricep Extension", muscle: "Triceps" },
    { id: "tri_skull", name: "Skull Crushers", muscle: "Triceps" },
    { id: "tri_closegrip", name: "Close Grip Bench Press", muscle: "Triceps" },
    { id: "tri_bench_dips", name: "Bench Dips", muscle: "Triceps" },
    { id: "tri_parallel_dips", name: "Parallel Bar Dips", muscle: "Triceps" },
    { id: "tri_kickback", name: "Tricep Kickback", muscle: "Triceps" },
    { id: "leg_back_squat", name: "Back Squat", muscle: "Legs" },
    { id: "leg_front_squat", name: "Front Squat", muscle: "Legs" },
    { id: "leg_goblet_squat", name: "Dumbbell Goblet Squat", muscle: "Legs" },
    { id: "leg_leverage_squat", name: "Leverage Machine Squat", muscle: "Legs" },
    { id: "leg_sumo_squat", name: "Dumbbell Sumo Squat", muscle: "Legs" },
    { id: "leg_smith_squat", name: "Smith Machine Squat", muscle: "Legs" },
    { id: "leg_hack", name: "Hack Squat", muscle: "Legs" },
    { id: "leg_legpress", name: "Leg Press", muscle: "Legs" },
    { id: "leg_bulgarian", name: "Bulgarian Split Squat", muscle: "Legs" },
    { id: "leg_lunge", name: "Walking Lunges", muscle: "Legs" },
    { id: "leg_stepup", name: "Step Up", muscle: "Legs" },
    { id: "leg_rdl", name: "Romanian Deadlift", muscle: "Hamstrings" },
    { id: "leg_stiff", name: "Stiff Leg Deadlift", muscle: "Hamstrings" },
    { id: "leg_goodmorning", name: "Good Morning", muscle: "Hamstrings" },
    { id: "leg_extension", name: "Leg Extension", muscle: "Quads" },
    { id: "leg_curl_lying", name: "Lying Leg Curl", muscle: "Hamstrings" },
    { id: "leg_curl_seated", name: "Seated Leg Curl", muscle: "Hamstrings" },
    { id: "leg_glutebridge", name: "Glute Bridge", muscle: "Glutes" },
    { id: "leg_hipthrust", name: "Hip Thrust", muscle: "Glutes" },
    { id: "calf_standing", name: "Standing Calf Raise", muscle: "Calves" },
    { id: "calf_seated", name: "Seated Calf Raise", muscle: "Calves" },
    { id: "calf_legpress", name: "Leg Press Calf Raise", muscle: "Calves" },
    { id: "calf_donkey", name: "Donkey Calf Raise", muscle: "Calves" },
    { id: "core_plank", name: "Plank", muscle: "Core" },
    { id: "core_sideplank", name: "Side Plank", muscle: "Core" },
    { id: "core_crunch", name: "Crunch", muscle: "Core" },
    { id: "core_decline", name: "Decline Sit-up", muscle: "Core" },
    { id: "core_legraise", name: "Hanging Leg Raise", muscle: "Core" },
    { id: "core_reverse", name: "Reverse Crunch", muscle: "Core" },
    { id: "core_abwheel", name: "Ab Wheel Rollout", muscle: "Core" },
    { id: "core_cable", name: "Cable Crunch", muscle: "Core" },
    { id: "core_russian", name: "Russian Twist", muscle: "Core" },
    { id: "core_deadbug", name: "Dead Bug", muscle: "Core" },
    { id: "core_bird", name: "Bird Dog", muscle: "Core" },
    { id: "cardio_treadmill", name: "Treadmill Walk", muscle: "Cardio" },
    { id: "cardio_run", name: "Running", muscle: "Cardio" },
    { id: "cardio_cycle", name: "Cycling", muscle: "Cardio" },
    { id: "cardio_rower", name: "Rowing Machine", muscle: "Cardio" },
    { id: "cardio_stairmaster", name: "Stair Climber", muscle: "Cardio" },
    { id: "cardio_elliptical", name: "Elliptical", muscle: "Cardio" },
    { id: "cardio_jumprope", name: "Jump Rope", muscle: "Cardio" }
];

window.exerciseMap = Object.fromEntries(
    window.DEFAULT_EXERCISE_LIBRARY.map(ex => [ex.id, ex])
);