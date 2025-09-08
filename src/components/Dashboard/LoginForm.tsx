// // File: src/components/DataEntry/DataEntry.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Check, User, Shield, Settings, Plus } from 'lucide-react';


// const LoginForm: React.FC = () => {
//   const navigate = useNavigate();

//   // Form state
//   const [avgSleep, setAvgSleep] = useState('');
//   const [restingHR, setRestingHR] = useState('');
//   const [dailySteps, setDailySteps] = useState('');
//   const [notes, setNotes] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // For now, just log the data
//     console.log({
//       avgSleep,
//       restingHR,
//       dailySteps,
//       notes
//     });
//     alert('Health data submitted successfully!');
//     // Optionally navigate back to dashboard
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white flex flex-col items-center p-6">
//       {/* Header */}
//       <header className="flex items-center justify-between w-full max-w-3xl mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
//             <Shield className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-xl font-semibold">Add Health Entry</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5" />
//             </div>
//             <span className="text-sm">Dr. Sarah Chen</span>
//           </div>
//           <button className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors">
//             <Settings className="w-5 h-5" />
//           </button>
//         </div>
//       </header>

//       {/* Form */}
//       <form 
//         onSubmit={handleSubmit} 
//         className="w-full max-w-3xl bg-purple-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30 space-y-4"
//       >
//         <div>
//           <label className="block text-gray-300 mb-1">Average Sleep (hours)</label>
//           <input
//             type="number"
//             value={avgSleep}
//             onChange={(e) => setAvgSleep(e.target.value)}
//             placeholder="7.5"
//             className="w-full p-3 rounded-lg bg-purple-950/50 border border-purple-700 text-white placeholder-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-1">Resting Heart Rate (bpm)</label>
//           <input
//             type="number"
//             value={restingHR}
//             onChange={(e) => setRestingHR(e.target.value)}
//             placeholder="72"
//             className="w-full p-3 rounded-lg bg-purple-950/50 border border-purple-700 text-white placeholder-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-1">Daily Steps</label>
//           <input
//             type="number"
//             value={dailySteps}
//             onChange={(e) => setDailySteps(e.target.value)}
//             placeholder="8000"
//             className="w-full p-3 rounded-lg bg-purple-950/50 border border-purple-700 text-white placeholder-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-1">Notes / Comments</label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Any additional notes..."
//             className="w-full p-3 rounded-lg bg-purple-950/50 border border-purple-700 text-white placeholder-gray-400 resize-none"
//             rows={4}
//           />
//         </div>

//         <div className="flex justify-end gap-4 mt-4">
//           <button
//             type="button"
//             onClick={() => navigate('/login')}
//             className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors flex items-center gap-2"
//           >
//             <Check className="w-5 h-5" /> Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
