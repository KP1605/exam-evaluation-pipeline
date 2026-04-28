import { useRef, useState } from 'react'
import { Download, Upload } from 'lucide-react'
import { useUploadSimulation } from '../hooks/useUploadSimulation'
import { UploadBox } from '../components/UploadBox'
import { ExtractedDataCard } from '../components/ExtractedDataCard'
import { BulkTable } from '../components/BulkTable'
import { StepIndicator } from '../components/StepIndicator'
import { ConfirmationModal } from '../components/ConfirmationModal'

type Mode = 'single' | 'bulk'

export function ExamCenterUploadPage() {
  const [mode, setMode] = useState<Mode>('single')
  const [showModal, setShowModal] = useState(false)
  const [activeReuploadId, setActiveReuploadId] = useState<string | null>(null)
  const reuploadInputRef = useRef<HTMLInputElement>(null)
  const singleUpload = useUploadSimulation()
  const bulkUpload = useUploadSimulation({ multiple: true })

  const state = mode === 'single' ? singleUpload : bulkUpload
  const currentStep = state.isSubmitted ? 3 : state.canSubmit ? 2 : state.files.length ? 1 : 0

  const handleSubmit = () => {
    if (state.submit()) setShowModal(true)
  }

  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Exam Center Upload</h2>
        <p className="mt-1 text-sm text-slate-600">Upload candidate answer sheets in single or bulk mode, verify extracted fields, then submit.</p>
      </header>

      <div className="inline-flex rounded-lg bg-slate-100 p-1">
        {(['single', 'bulk'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === item ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            {item === 'single' ? 'Single Upload' : 'Bulk Upload'}
          </button>
        ))}
      </div>

      <StepIndicator currentStep={currentStep} steps={['Uploaded', 'Extracted', 'Verified', 'Submitted']} />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <UploadBox multiple={mode === 'bulk'} disabled={state.isSubmitted} isBusy={state.files.some((f) => f.status === 'extracting')} onFilesSelected={state.addFiles} />
      </div>

      {mode === 'single' ? (
        <div className="space-y-4">
          {state.files[0] ? (
            <ExtractedDataCard file={state.files[0]} onVerify={(checked) => state.toggleVerify(state.files[0].id, checked)} />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No uploaded file yet.</div>
          )}
        </div>
      ) : (
        <BulkTable files={state.files} onVerify={state.toggleVerify} disabled={state.isSubmitted} />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!state.canSubmit || state.isSubmitted}
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Upload className="h-4 w-4" />
          Submit
        </button>

        {state.isSubmitted && (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Download Receipt (Mock)
          </button>
        )}

        {!state.isSubmitted && state.files.length > 0 && (
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => {
              const file = state.files[0]
              if (!file) return
              setActiveReuploadId(file.id)
              reuploadInputRef.current?.click()
            }}
          >
            Re-upload First File
          </button>
        )}
      </div>

      <input
        ref={reuploadInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={async (event) => {
          const selected = event.target.files?.[0]
          if (!selected || !activeReuploadId) return
          await state.reupload(activeReuploadId, selected)
          setActiveReuploadId(null)
          event.target.value = ''
        }}
      />

      <ConfirmationModal
        open={showModal}
        title={`${mode === 'single' ? 'Single' : 'Bulk'} submission successful`}
        description="All files are submitted successfully. You can download a mock receipt now."
        onClose={() => setShowModal(false)}
      />
    </section>
  )
}
