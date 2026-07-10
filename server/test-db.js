const bcrypt = require("bcrypt");

bcrypt.hash("qwerty", 10).then(console.log);



// import React from 'react';
// import { 
//   FileText, 
//   CheckCircle, 
//   Percent, 
//   Calendar, 
//   Download, 
//   ArrowLeft,
//   Bell,
//   ChevronDown
// } from 'lucide-react';

// // --- TypeScript Interfaces ---
// interface EvaluationCriteria {
//   name: string;
//   score: number;
//   feedback: string;
// }

// interface SubmissionData {
//   title: string;
//   manuscriptId: string;
//   submittedDate: string;
//   assessedDate: string;
//   assessmentStatus: 'Positive' | 'Negative';
//   similarityScore: number;
//   author: string;
//   email: string;
//   faculty: string;
//   department: string;
//   fileName: string;
//   assessor: string;
//   assessorComments: string;
//   evaluationBreakdown: EvaluationCriteria[];
// }

// // --- Mock Data ---
// const sampleData: SubmissionData = {
//   title: "AI in Healthcare: Opportunities and Challenges",
//   manuscriptId: "RH-2025-187",
//   submittedDate: "March 21, 2026",
//   assessedDate: "March 25, 2026",
//   assessmentStatus: "Positive",
//   similarityScore: 50,
//   author: "Mr A",
//   email: "mra@unilag.edu.ng",
//   faculty: "Faculty of Science",
//   department: "Computer Science",
//   fileName: "AI_in_Healthcare_RH-2025-187.pdf",
//   assessor: "Dr. K. O. Adeyemi",
//   assessorComments: "The manuscript addresses a relevant topic with strong potential contribution to the field. The methodology is sound, and the results are well presented. Recommended for acceptance with minor revisions.",
//   evaluationBreakdown: [
//     { name: "Originality", score: 60, feedback: "Good level of originality with some areas to strengthen." },
//     { name: "Methodology", score: 50, feedback: "Methodology is appropriate but can be described in more detail." },
//     { name: "Results & Discussion", score: 45, feedback: "Results are clear; discussion can be more in-depth." },
//     { name: "Conclusion", score: 50, feedback: "Conclusion is adequate; can be more impactful." },
//   ]
// };

// export default function SubmissionDetails() {
//   const data = sampleData;
//   const overallScore = Math.round(
//     data.evaluationBreakdown.reduce((acc, curr) => acc + curr.score, 0) / data.evaluationBreakdown.length
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-12">
      
//       {/* --- HEADER NAVIGATION --- */}
//       <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 sticky top-0 z-50 flex items-center justify-between">
//         <div>
//           <h1 className="text-lg font-bold text-slate-900">Submission Details</h1>
//           <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 mt-0.5">
//             <span>Assessment Report</span>
//             <span>&gt;</span>
//             <span>All Submissions</span>
//             <span>&gt;</span>
//             <span className="text-slate-600">Submission Details</span>
//           </div>
//         </div>
        
//         {/* User Actions */}
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-slate-400 hover:text-slate-600 relative">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
//           <div className="flex items-center gap-2 cursor-pointer">
//             <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
//               A
//             </div>
//             <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
//           </div>
//         </div>
//       </header>

//       {/* --- MAIN CONTENT CONTAINER --- */}
//       <main className="max-w-6xl mx-auto px-4 md:px-8 mt-6">
        
//         {/* --- TOP SUMMARY CARDS GRID --- */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {/* Title & ID */}
//           <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3 items-start shadow-sm">
//             <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
//               <FileText className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">{data.title}</h2>
//               <p className="text-xs text-slate-400 mt-1">Manuscript ID: {data.manuscriptId}</p>
//               <p className="text-[11px] text-slate-400">Submitted on {data.submittedDate}</p>
//             </div>
//           </div>

//           {/* Assessment Status */}
//           <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3 items-center shadow-sm">
//             <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
//               <CheckCircle className="w-5 h-5" />
//             </div>
//             <div>
//               <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
//                 {data.assessmentStatus}
//               </span>
//               <p className="text-xs text-slate-400 mt-1">Assessment Status</p>
//             </div>
//           </div>

//           {/* Similarity Score */}
//           <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3 items-center shadow-sm">
//             <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
//               <Percent className="w-5 h-5" />
//             </div>
//             <div>
//               <span className="text-xl font-bold text-indigo-600">{data.similarityScore}%</span>
//               <p className="text-xs text-slate-400">Similarity Score</p>
//             </div>
//           </div>

//           {/* Date Submitted */}
//           <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3 items-center shadow-sm">
//             <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
//               <Calendar className="w-5 h-5" />
//             </div>
//             <div>
//               <span className="text-sm font-bold text-slate-900">{data.submittedDate}</span>
//               <p className="text-xs text-slate-400 mt-0.5">Date Submitted</p>
//             </div>
//           </div>
//         </section>

//         {/* --- MAIN LAYOUT SPLIT: SUBMISSION INFO & ASSESSMENT DETAILS --- */}
//         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-8">
          
//           {/* Section 1: Submission Information */}
//           <section>
//             <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
//               Submission Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-xs">
//               <div className="md:col-span-1 space-y-4">
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Title of Manuscript</p>
//                   <p className="text-slate-800 font-medium">{data.title}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Author</p>
//                   <p className="text-slate-800 font-medium">{data.author}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Department</p>
//                   <p className="text-slate-800 font-medium">{data.department}</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Manuscript ID</p>
//                   <p className="text-slate-800 font-medium">{data.manuscriptId}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Academic Unit</p>
//                   <p className="text-slate-800 font-medium">{data.faculty}</p>
//                 </div>
//                 <div className="md:col-span-1">
//                   <p className="text-slate-400 font-medium mb-0.5">File Submitted</p>
//                   <p className="text-slate-700 break-all font-mono text-[11px] mb-2">{data.fileName}</p>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
//                     <Download className="w-3.5 h-3.5" />
//                     Download File
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Submission Date</p>
//                   <p className="text-slate-800 font-medium">{data.submittedDate}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400 font-medium mb-0.5">Email</p>
//                   <p className="text-blue-600 font-medium">{data.email}</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Section 2: Assessment Details */}
//           <section>
//             <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
//               Assessment Details
//             </h3>
            
//             {/* Top row metadata items */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
//               <div>
//                 <p className="text-slate-400 mb-0.5">Assessment Status</p>
//                 <span className="inline-block text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
//                   {data.assessmentStatus}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Similarity Score</p>
//                 <p className="font-bold text-slate-800">{data.similarityScore}%</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Assessed On</p>
//                 <p className="font-medium text-slate-800">{data.assessedDate}</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Assessed By</p>
//                 <p className="font-medium text-slate-800">{data.assessor}</p>
//               </div>
//             </div>

//             {/* Assessor Comments */}
//             <div className="mt-8">
//               <p className="text-sm font-semibold text-slate-700 mb-2">
//                 Assessor Comments
//               </p>

//               <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-700 leading-7">
//                 {data.assessorComments}
//               </div>
//             </div>

//             {/* Evaluation Breakdown */}
//             <div className="mt-10">
//               <h3 className="text-sm font-bold text-slate-900 mb-4">
//                 Evaluation Breakdown
//               </h3>

//               <div className="overflow-x-auto rounded-xl border border-slate-200">

//                 <table className="min-w-full">

//                   <thead className="bg-slate-50">

//                     <tr className="text-left text-xs text-slate-500">

//                       <th className="px-5 py-3 font-semibold">
//                         Criteria
//                       </th>

//                       <th className="px-5 py-3 font-semibold w-48">
//                         Score (%)
//                       </th>

//                       <th className="px-5 py-3 font-semibold">
//                         Feedback
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody>

//                     {data.evaluationBreakdown.map((item) => (

//                       <tr
//                         key={item.name}
//                         className="border-t border-slate-200"
//                       >

//                         <td className="px-5 py-4 text-sm font-medium text-slate-700">
//                           {item.name}
//                         </td>

//                         <td className="px-5 py-4">

//                           <div className="flex items-center gap-3">

//                             <div className="w-32 h-2 rounded-full bg-slate-200 overflow-hidden">

//                               <div
//                                 className="h-full bg-blue-600 rounded-full"
//                                 style={{
//                                   width: `${item.score}%`,
//                                 }}
//                               />

//                             </div>

//                             <span className="text-sm font-semibold text-slate-700">
//                               {item.score}%
//                             </span>

//                           </div>

//                         </td>

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {item.feedback}
//                         </td>

//                       </tr>

//                     ))}

//                     <tr className="border-t bg-slate-50">

//                       <td className="px-5 py-4 font-bold text-slate-900">
//                         Overall Score
//                       </td>

//                       <td className="px-5 py-4">

//                         <span className="text-lg font-bold text-blue-600">
//                           {overallScore}%
//                         </span>

//                       </td>

//                       <td></td>

//                     </tr>

//                   </tbody>

//                 </table>

//               </div>
//             </div>

//           </section>

//         </div>

//         {/* Back Button */}

//         <div className="mt-8">

//           <button
//             className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-5 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
//           >
//             <ArrowLeft className="w-4 h-4" />

//             Back to Submissions
//           </button>

//         </div>

//       </main>

//     </div>
//   );
// }
