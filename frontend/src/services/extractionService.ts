import type { ExtractedData } from '../types/upload'

const firstNames = ['Aarav', 'Ishita', 'Rohan', 'Neha', 'Kabir', 'Meera', 'Arjun', 'Diya']
const lastNames = ['Sharma', 'Patel', 'Reddy', 'Das', 'Verma', 'Kapoor', 'Nair', 'Singh']

const randomPick = (items: string[]) => items[Math.floor(Math.random() * items.length)]

const randomDigits = (count: number) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('')

export const generateMockExtractionData = (): ExtractedData => {
  const name = `${randomPick(firstNames)} ${randomPick(lastNames)}`
  return {
    name,
    rollNo: `RN${randomDigits(6)}`,
    submissionId: `SUB-${randomDigits(8)}`,
    uploadId: `UP-${randomDigits(8)}`,
    questionPaperId: `QP-${randomDigits(4)}`, 
    examDate: new Date().toISOString().split('T')[0]
  }
}
