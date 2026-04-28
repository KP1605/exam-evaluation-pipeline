import { useEffect, useRef, useState } from 'react'
import { Lock, RefreshCcw } from 'lucide-react'
import { useUploadSimulation } from '../hooks/useUploadSimulation'
import { UploadBox } from '../components/UploadBox'
import { FileStatusBadge } from '../components/FileStatusBadge'
import { StepIndicator } from '../components/StepIndicator'
import { ConfirmationModal } from '../components/ConfirmationModal'

type DocType = 'questionPaper' | 'answerKey'

export function AdminUploadPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeReupload, setActiveReupload] = useState<DocType | null>(null)
  const reuploadInputRef = useRef<HTMLInputElement>(null)
  const questionPaper = useUploadSimulation()
  const answerKey = useUploadSimulation()

  const canSubmit = questionPaper.files[0]?.status === 'extracted' && answerKey.files[0]?.status === 'extracted'
  const isSubmitted = questionPaper.isSubmitted && answerKey.isSubmitted

  const handleSubmit = () => {
    const firstOk = questionPaper.submit()
    const secondOk = answerKey.submit()
    if (firstOk && secondOk) setShowModal(true)
  }

  const selectHook = (docType: DocType) => (docType === 'questionPaper' ? questionPaper : answerKey)

  useEffect(() => {
    if (activeReupload && !isSubmitted) reuploadInputRef.current?.click()
  }, [activeReupload, isSubmitted])

  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Admin Upload</h2>
        <p className="mt-1 text-sm text-slate-600">Upload and verify question paper and answer key. You can re-upload before final submit.</p>
      </header>

      <StepIndicator currentStep={isSubmitted ? 2 : canSubmit ? 1 : 0} steps={['Uploaded', 'Extracted', 'Submitted']} />

      <div className="grid gap-6 lg:grid-cols-2">
        {([
          { key: 'questionPaper', title: 'Question Paper', state: questionPaper },
          { key: 'answerKey', title: 'Answer Key', state: answerKey },
        ] as const).map((entry) => {
          const file = entry.state.files[0]
          const isBusy = file?.status === 'extracting'
          return (
            <div key={entry.key} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{entry.title}</h3>
              <div className="mt-4">
                <UploadBox disabled={isSubmitted} isBusy={isBusy} onFilesSelected={entry.state.addFiles} />
              </div>

              {file && (
                <div className="mt-4 space-y-3 rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="max-w-[75%] truncate text-sm text-slate-700">{file.fileName}</p>
                    <FileStatusBadge status={file.status} />
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${file.progress}%` }} />
                  </div>

                  {!isSubmitted && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      onClick={() => setActiveReupload(entry.key)}
                    >
                      <RefreshCcw className="h-3.5 w-3.5" /> Re-upload
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          disabled={!canSubmit || isSubmitted}
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSubmitted ? <Lock className="h-4 w-4" /> : null}
          {isSubmitted ? 'Submission Locked' : 'Submit Documents'}
        </button>
      </div>

      <input
        ref={reuploadInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={async (event) => {
          const selected = event.target.files?.[0]
          if (!selected || !activeReupload) return
          const state = selectHook(activeReupload)
          const existing = state.files[0]
          if (existing) await state.reupload(existing.id, selected)
          setActiveReupload(null)
          event.target.value = ''
        }}
      />

      <ConfirmationModal
        open={showModal}
        title="Admin upload submitted"
        description="Question paper and answer key are submitted successfully. Download is now available in downstream processing."
        onClose={() => setShowModal(false)}
      />
    </section>
  )
}
