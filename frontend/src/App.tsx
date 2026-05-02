import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AdminUploadPage } from './pages/AdminUploadPage'
import { ExamCenterUploadPage } from './pages/ExamCenterUploadPage'
import { InputLayerLayout } from './pages/InputLayerLayout'
import { TeacherDashboard } from './pages/TeacherDashboard'
import { ReviewPage } from './pages/ReviewPage'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/input" replace />} />
          <Route path="/input/*" element={<InputLayerLayout />}>
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="admin" element={<AdminUploadPage />} />
            <Route path="exam-center" element={<ExamCenterUploadPage />} />
            <Route path="*" element={<Navigate to="admin" replace />} />
          </Route>
          <Route path="/teacher-review" element={<TeacherDashboard />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/input" replace />} />
        </Routes>
      </div>
    </div>
  )
}
