import { NavLink, Outlet } from 'react-router-dom'
import { Building2, ShieldCheck } from 'lucide-react'

function tabClassName(isActive: boolean) {
  return `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
  }`
}

function InputLayerTabs() {
  return (
    <header className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">AI Exam Evaluation</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Input Layer Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600">Upload and verify exam documents before pipeline processing.</p>

      <div className="mt-4 inline-flex flex-wrap rounded-lg bg-slate-100 p-1">
        <NavLink to="/input/admin" className={({ isActive }) => tabClassName(isActive)}>
          <ShieldCheck className="h-4 w-4" />
          Admin Upload
        </NavLink>
        <NavLink to="/input/exam-center" className={({ isActive }) => tabClassName(isActive)}>
          <Building2 className="h-4 w-4" />
          Exam Center Upload
        </NavLink>
      </div>
    </header>
  )
}

export function InputLayerLayout() {
  return (
    <section>
      <InputLayerTabs />
      <Outlet />
    </section>
  )
}
