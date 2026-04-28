import { FileStatusBadge } from './FileStatusBadge'
import type { UploadFileItem } from '../types/upload'

interface ExtractedDataCardProps {
  file: UploadFileItem
  onVerify?: (checked: boolean) => void
}

const dataRowClass = 'rounded-lg bg-slate-50 px-3 py-2'

export function ExtractedDataCard({ file, onVerify }: ExtractedDataCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="max-w-full truncate text-sm font-semibold text-slate-900">{file.fileName}</h3>
        <FileStatusBadge status={file.status} />
      </div>

      {file.status === 'extracting' && <p className="mt-3 text-sm text-blue-700">Extracting document details...</p>}

      {file.extractedData && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className={dataRowClass}>
            <p className="text-xs text-slate-500">Name</p>
            <p className="text-sm font-medium text-slate-900">{file.extractedData.name}</p>
          </div>
          <div className={dataRowClass}>
            <p className="text-xs text-slate-500">Roll No</p>
            <p className="text-sm font-medium text-slate-900">{file.extractedData.rollNo}</p>
          </div>
          <div className={dataRowClass}>
            <p className="text-xs text-slate-500">Submission ID</p>
            <p className="text-sm font-medium text-slate-900">{file.extractedData.submissionId}</p>
          </div>
          <div className={dataRowClass}>
            <p className="text-xs text-slate-500">Upload ID</p>
            <p className="text-sm font-medium text-slate-900">{file.extractedData.uploadId}</p>
          </div>
        </div>
      )}

      {onVerify && file.extractedData && (
        <label className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={file.isVerified}
            onChange={(event) => onVerify(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          I verify details are correct
        </label>
      )}
    </article>
  )
}
