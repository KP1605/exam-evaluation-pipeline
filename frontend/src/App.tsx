import { useState } from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import { AdminUploadPage } from './pages/AdminUploadPage'
import { ExamCenterUploadPage } from './pages/ExamCenterUploadPage'

type PageKey = 'admin' | 'examCenter'

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>('admin')

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">AI Exam Evaluation</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Input Layer Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Upload and verify exam documents before pipeline processing.</p>

          <div className="mt-4 inline-flex flex-wrap rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActivePage('admin')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                activePage === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Upload
            </button>
            <button
              type="button"
              onClick={() => setActivePage('examCenter')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                activePage === 'examCenter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Exam Center Upload
            </button>
          </div>
        </header>

        {activePage === 'admin' ? <AdminUploadPage /> : <ExamCenterUploadPage />}
      </div>
    </div>
  )
}
