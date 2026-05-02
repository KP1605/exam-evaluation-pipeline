import { Link } from 'react-router-dom'
import { teacherReviewData, type ReviewStatus } from '../data/teacherReviewMockData'

const statusClasses: Record<ReviewStatus, string> = {
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  Reviewed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  Flagged: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
}

export function TeacherDashboard() {
  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Teacher Review Interface</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Student Evaluation Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Review AI-evaluated responses and take action on each student submission.</p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Name
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Roll No
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Score
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th scope="col" className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {teacherReviewData.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80">
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">{student.name}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">{student.rollNo}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">{student.score}/20</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${statusClasses[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <Link
                      to={`/review/${student.id}`}
                      className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
