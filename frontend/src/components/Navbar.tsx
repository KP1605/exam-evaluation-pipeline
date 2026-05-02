import { Link, useLocation } from 'react-router-dom'

function getNavItemClasses(active: boolean) {
  return `rounded-md px-3 py-2 text-sm font-medium transition ${
    active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`
}

export function Navbar() {
  const { pathname } = useLocation()

  const isInputActive = pathname.startsWith('/input')
  const isTeacherActive = pathname.startsWith('/teacher-review') || pathname.startsWith('/review')

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/input/admin" className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
          Exam Evaluation System
        </Link>

        <nav className="inline-flex items-center gap-2 rounded-lg bg-slate-50 p-1">
          <Link to="/input/admin" className={getNavItemClasses(isInputActive)}>
            Input Layer
          </Link>
          <Link to="/teacher-review" className={getNavItemClasses(isTeacherActive)}>
            Teacher Review
          </Link>
        </nav>
      </div>
    </header>
  )
}
