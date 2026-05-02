export type ReviewStatus = 'Pending' | 'Reviewed' | 'Flagged'

export type StudentReview = {
  id: string
  name: string
  rollNo: string
  score: number
  status: ReviewStatus
  question: string
  studentAnswer: string
  answerKey: string
  aiScore: number
  confidenceScore: number
  aiFeedback: string
}

export const teacherReviewData: StudentReview[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    rollNo: 'CSE24001',
    score: 16,
    status: 'Pending',
    question: 'Explain the concept of process scheduling in operating systems and mention two common algorithms.',
    studentAnswer:
      'Process scheduling is the way CPU time is shared among processes. It selects which process runs next. Two algorithms are FCFS and Round Robin. FCFS executes in arrival order while Round Robin gives each process a fixed time slice.',
    answerKey:
      'Process scheduling is the OS mechanism for selecting a process from the ready queue for CPU execution. Suitable algorithms include FCFS, SJF, Priority Scheduling, and Round Robin. Mentioning at least two with brief explanation is expected.',
    aiScore: 16,
    confidenceScore: 88,
    aiFeedback: 'Good explanation with correct algorithms. Could include one more algorithm for stronger completeness.',
  },
  {
    id: '2',
    name: 'Diya Patel',
    rollNo: 'CSE24002',
    score: 18,
    status: 'Reviewed',
    question: 'Define normalization in DBMS and list normal forms up to 3NF.',
    studentAnswer:
      'Normalization organizes tables to reduce data redundancy and improve integrity. The normal forms are 1NF, 2NF, and 3NF where partial and transitive dependencies are removed progressively.',
    answerKey:
      'Normalization is a database design process to minimize redundancy and dependency anomalies. Up to 3NF: 1NF (atomic values), 2NF (remove partial dependency), 3NF (remove transitive dependency).',
    aiScore: 18,
    confidenceScore: 93,
    aiFeedback: 'Strong conceptual clarity with correct progression of normal forms.',
  },
  {
    id: '3',
    name: 'Kabir Verma',
    rollNo: 'CSE24003',
    score: 12,
    status: 'Flagged',
    question: 'What is a binary search tree? Mention insertion complexity in average and worst cases.',
    studentAnswer:
      'BST is a tree where left child is smaller and right child is bigger than root. Insertion is O(log n) and O(n) worst case.',
    answerKey:
      'A BST is a binary tree where for each node, values in the left subtree are smaller and values in the right subtree are larger (based on chosen ordering). Insertion average complexity is O(log n), worst case O(n) for skewed trees.',
    aiScore: 12,
    confidenceScore: 64,
    aiFeedback: 'Core idea is correct, but explanation is very brief and misses clarity on node-level ordering.',
  },
  {
    id: '4',
    name: 'Meera Iyer',
    rollNo: 'CSE24004',
    score: 15,
    status: 'Pending',
    question: 'Differentiate between HTTP and HTTPS.',
    studentAnswer:
      'HTTP transfers data in plain text while HTTPS uses SSL/TLS encryption. HTTPS is more secure and also verifies server authenticity through certificates.',
    answerKey:
      'HTTP is an unencrypted protocol. HTTPS is HTTP over TLS/SSL, offering encryption, integrity, and server authentication through digital certificates.',
    aiScore: 15,
    confidenceScore: 86,
    aiFeedback: 'Accurate and concise. Could mention data integrity explicitly for full marks.',
  },
  {
    id: '5',
    name: 'Rohan Gupta',
    rollNo: 'CSE24005',
    score: 19,
    status: 'Reviewed',
    question: 'What are ACID properties in database transactions?',
    studentAnswer:
      'ACID means Atomicity, Consistency, Isolation, and Durability. Atomicity ensures all or none execution, Consistency keeps valid state, Isolation separates concurrent transactions, and Durability preserves committed changes.',
    answerKey:
      'ACID properties are Atomicity, Consistency, Isolation, and Durability. Each guarantees reliable, correct, and recoverable transaction behavior in DBMS.',
    aiScore: 19,
    confidenceScore: 95,
    aiFeedback: 'Excellent complete answer with clear property definitions.',
  },
]
