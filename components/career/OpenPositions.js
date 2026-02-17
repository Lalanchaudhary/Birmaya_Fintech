// "use client";
// import { useState, useEffect } from "react";
// import ApplicationForm from "./ApplicationForm";

// export default function OpenPositions() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         const res = await fetch("/api/jobs");
//         const data = await res.json();
//         if (data.success) {
//           setJobs(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to load jobs");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchJobs();
//   }, []);

//   return (
//     <section className="py-24 bg-white">
//       <div className="max-w-5xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-primary text-center mb-12">
//           Open Positions
//         </h2>

//         {loading ? (
//           <div className="text-center text-gray-500">Loading positions...</div>
//         ) : jobs.length === 0 ? (
//           <div className="text-center text-gray-500">
//             No open positions at the moment. Please check back later.
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
//               >
//                 <div>
//                   <h3 className="font-semibold text-lg text-primary">
//                     {job.title}
//                   </h3>
//                   <p className="text-gray-500">
//                     {job.location} • {job.type}
//                   </p>
//                   <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                     {job.description}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => setSelectedJob(job)}
//                   className="bg-accent text-white px-6 py-2 rounded-lg whitespace-nowrap"
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedJob && (
//           <ApplicationForm
//             job={selectedJob}
//             onClose={() => setSelectedJob(null)}
//           />
//         )}
//       </div>
//     </section>
//   );
// }

const jobs = [
  {
    title: "Loan Advisor",
    location: "Noida",
    type: "Full Time",
  },
  {
    title: "Sales Executive",
    location: "Noida",
    type: "Full Time",
  },
  {
    title: "Customer Support Executive",
    location: "Noida",
    type: "Full Time",
  },
];

export default function OpenPositions() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Open Positions
        </h2>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="border p-6 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-primary">{job.title}</h3>
                <p className="text-gray-500">{job.location} • {job.type}</p>
              </div>

              <button className="bg-accent text-white px-6 py-2 rounded-lg">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
