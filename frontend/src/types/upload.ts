export type FileStatus = 'uploaded' | 'extracting' | 'extracted' | 'verified' | 'submitted'

export interface ExtractedData {
  name: string
  rollNo: string
  submissionId: string
  uploadId: string
  questionPaperId: string;
  examDate: string;
}

export interface UploadFileItem {
  id: string
  fileName: string
  progress: number
  status: FileStatus
  extractedData?: ExtractedData
  isVerified: boolean
}
