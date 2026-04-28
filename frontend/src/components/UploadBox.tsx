import { useMemo, useState } from 'react'
import { FileUp, FileWarning, LoaderCircle } from 'lucide-react'
import clsx from 'clsx'

interface UploadBoxProps {
  multiple?: boolean
  disabled?: boolean
  isBusy?: boolean
  onFilesSelected: (files: FileList) => void
}

export function UploadBox({ multiple, disabled, isBusy, onFilesSelected }: UploadBoxProps) {
  const [dragging, setDragging] = useState(false)
  const accept = useMemo(() => '.pdf,application/pdf', [])

  return (
    <label
      className={clsx(
        'group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-white p-8 text-center shadow-sm transition-all',
        dragging ? 'border-blue-400 bg-blue-50/60' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/40',
        disabled && 'pointer-events-none cursor-not-allowed opacity-60',
      )}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        if (event.dataTransfer.files?.length) onFilesSelected(event.dataTransfer.files)
      }}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          if (event.target.files?.length) onFilesSelected(event.target.files)
          event.target.value = ''
        }}
        disabled={disabled}
      />

      {isBusy ? <LoaderCircle className="mb-3 h-9 w-9 animate-spin text-blue-600" /> : <FileUp className="mb-3 h-9 w-9 text-blue-600" />}
      <p className="text-sm font-semibold text-slate-900">{multiple ? 'Drop PDF files or click to upload' : 'Drop a PDF or click to upload'}</p>
      <p className="mt-1 text-xs text-slate-500">PDF only. Files are processed securely and never previewed.</p>
      <div className="mt-4 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
        <FileWarning className="h-3.5 w-3.5" />
        No document preview after upload
      </div>
    </label>
  )
}
