import clsx from 'clsx'
import type { FileStatus } from '../types/upload'

const badgeClassMap: Record<FileStatus, string> = {
  uploaded: 'bg-slate-100 text-slate-700 ring-slate-200',
  extracting: 'bg-blue-50 text-blue-700 ring-blue-200',
  extracted: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  submitted: 'bg-violet-50 text-violet-700 ring-violet-200',
}

export function FileStatusBadge({ status }: { status: FileStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset',
        badgeClassMap[status],
      )}
    >
      {status}
    </span>
  )
}
