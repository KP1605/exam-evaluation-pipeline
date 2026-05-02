import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { teacherReviewData } from '../data/teacherReviewMockData'

export function ReviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  const currentIndex = useMemo(() => teacherReviewData.findIndex((item) => item.id === id), [id])
  const currentStudent = currentIndex >= 0 ? teacherReviewData[currentIndex] : null

  const [overrideScore, setOverrideScore] = useState(currentStudent?.score.toString() ?? '')
  const [teacherFeedback, setTeacherFeedback] = useState(currentStudent?.aiFeedback ?? '')

  useEffect(() => {
    setOverrideScore(currentStudent?.score.toString() ?? '')
    setTeacherFeedback(currentStudent?.aiFeedback ?? '')
    setShowAnswerKey(false)
  }, [currentStudent])

  if (!currentStudent) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Review not found</h1>
        <p className="mt-2 text-sm text-slate-600">The selected student response could not be loaded.</p>
        <Link to="/" className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Back to dashboard
        </Link>
      </section>
    )
  }

  const total = teacherReviewData.length
  const progressLabel = `${currentIndex + 1} of ${total}`
  const progressWidth = `${((currentIndex + 1) / total) * 100}%`

  const previousStudent = currentIndex > 0 ? teacherReviewData[currentIndex - 1] : null
  const nextStudent = currentIndex < total - 1 ? teacherReviewData[currentIndex + 1] : null

  const handlePrevious = () => {
    if (previousStudent) navigate(`/review/${previousStudent.id}`)
  }

  const handleNext = () => {
    if (nextStudent) navigate(`/review/${nextStudent.id}`)
  }

  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Teacher Review Interface</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Review Student Answer</h1>
            <p className="mt-1 text-sm text-slate-600">
              {currentStudent.name} ({currentStudent.rollNo})
            </p>
          </div>
          <Link to="/" className="inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-5 xl:col-span-3">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Question</h2>
            <p className="mt-3 text-sm leading-6 text-slate-800">{currentStudent.question}</p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Student Answer</h2>
            <p className="mt-3 text-sm leading-6 text-slate-800">{currentStudent.studentAnswer}</p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              onClick={() => setShowAnswerKey((value) => !value)}
              className="inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {showAnswerKey ? 'Hide Answer Key' : 'Toggle Answer Key'}
            </button>
            {showAnswerKey ? <p className="mt-4 text-sm leading-6 text-slate-800">{currentStudent.answerKey}</p> : null}
          </article>
        </div>

        <aside className="space-y-5 xl:col-span-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">AI Evaluation</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-600">AI Score</dt>
                <dd className="text-sm font-semibold text-slate-900">{currentStudent.aiScore}/20</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-600">Confidence Score</dt>
                <dd className="text-sm font-semibold text-slate-900">{currentStudent.confidenceScore}%</dd>
              </div>
            </dl>
            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI Feedback</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{currentStudent.aiFeedback}</p>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Teacher Controls</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="overrideScore" className="mb-1 block text-sm font-medium text-slate-700">
                  Override Score
                </label>
                <input
                  id="overrideScore"
                  type="number"
                  min={0}
                  max={20}
                  value={overrideScore}
                  onChange={(event) => setOverrideScore(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label htmlFor="teacherFeedback" className="mb-1 block text-sm font-medium text-slate-700">
                  Editable Feedback
                </label>
                <textarea
                  id="teacherFeedback"
                  rows={4}
                  value={teacherFeedback}
                  onChange={(event) => setTeacherFeedback(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Approve
                </button>
                <button type="button" className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700">
                  Reject
                </button>
                <button type="button" className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400">
                  Flag
                </button>
              </div>
            </div>
          </article>
        </aside>
      </div>

      <footer className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!previousStudent}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <div className="min-w-48 flex-1 px-2">
            <div className="mb-2 text-center text-sm font-medium text-slate-700">Progress: {progressLabel}</div>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: progressWidth }} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!nextStudent}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </section>
  )
}
