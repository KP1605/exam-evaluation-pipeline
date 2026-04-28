import { FileStatusBadge } from './FileStatusBadge'
import type { UploadFileItem } from '../types/upload'

interface BulkTableProps {
  files: UploadFileItem[]
  disabled?: boolean
  onVerify: (id: string, checked: boolean) => void
}

export function BulkTable({ files, disabled, onVerify }: BulkTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">File</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Roll No</th>
            <th className="px-4 py-3">Submission ID</th>
            <th className="px-4 py-3">Upload ID</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Verify</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {files.map((file) => (
            <tr key={file.id} className="hover:bg-slate-50/70">
              <td className="px-4 py-3 font-medium text-slate-700">{file.fileName}</td>
              <td className="px-4 py-3">{file.extractedData?.name ?? '-'}</td>
              <td className="px-4 py-3">{file.extractedData?.rollNo ?? '-'}</td>
              <td className="px-4 py-3">{file.extractedData?.submissionId ?? '-'}</td>
              <td className="px-4 py-3">{file.extractedData?.uploadId ?? '-'}</td>
              <td className="px-4 py-3">
                <FileStatusBadge status={file.status} />
              </td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={file.isVerified}
                  disabled={disabled || !file.extractedData}
                  onChange={(event) => onVerify(file.id, event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
