import { useState } from 'react'
import type { UploadFileItem } from '../types/upload'
import { generateMockExtractionData } from '../utils/mockExtraction'

const createId = () => crypto.randomUUID()

const isPdf = (file: File) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

export const useUploadSimulation = (options?: { multiple?: boolean }) => {
  const [files, setFiles] = useState<UploadFileItem[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const updateFile = (id: string, updater: (file: UploadFileItem) => UploadFileItem) => {
    setFiles((prev) => prev.map((file) => (file.id === id ? updater(file) : file)))
  }

  const simulateUpload = async (file: File): Promise<UploadFileItem> => {
    const id = createId()
    const fileItem: UploadFileItem = {
      id,
      fileName: file.name,
      progress: 0,
      status: 'uploaded',
      isVerified: false,
    }

    setFiles((prev) => {
      if (options?.multiple) return [...prev, fileItem]
      return [fileItem]
    })

    for (const step of [15, 35, 60, 85, 100]) {
      await new Promise((resolve) => setTimeout(resolve, 180))
      updateFile(id, (current) => ({ ...current, progress: step }))
    }

    updateFile(id, (current) => ({ ...current, status: 'extracting' }))
    await new Promise((resolve) => setTimeout(resolve, 1200))

    updateFile(id, (current) => ({
      ...current,
      status: 'extracted',
      extractedData: generateMockExtractionData(),
    }))

    return fileItem
  }

  const addFiles = async (incomingFiles: FileList | File[]) => {
    if (isSubmitted) return

    const selected = Array.from(incomingFiles).filter(isPdf)
    if (!selected.length) return

    if (!options?.multiple && selected.length > 1) {
      await simulateUpload(selected[0])
      return
    }

    await Promise.all(selected.map((file) => simulateUpload(file)))
  }

  const toggleVerify = (id: string, isChecked: boolean) => {
    if (isSubmitted) return
    updateFile(id, (file) => ({
      ...file,
      isVerified: isChecked,
      status: isChecked ? 'verified' : 'extracted',
    }))
  }

  const reupload = async (id: string, file: File) => {
    if (isSubmitted || !isPdf(file)) return
    setFiles((prev) => prev.filter((item) => item.id !== id))
    await simulateUpload(file)
  }

  const canSubmit = files.length > 0 && files.every((item) => item.isVerified)

  const submit = () => {
    if (!canSubmit || isSubmitted) return false
    setIsSubmitted(true)
    setHasSubmitted(true)
    setFiles((prev) => prev.map((file) => ({ ...file, status: 'submitted' })))
    return true
  }

  return {
    files,
    isSubmitted,
    hasSubmitted,
    canSubmit,
    addFiles,
    toggleVerify,
    reupload,
    submit,
  }
}
