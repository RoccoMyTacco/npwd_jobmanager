import { Job, CurrentJob } from '../types/jobs'

export const MockJobs: Job[] =[
    {
        job: 'police',
        grade: 3,
        salary: 1000,
        jobLabel: 'Police',
        gradeLabel: 'Sergeant',
    },
    {
        job: 'lspd',
        grade: 5,
        salary: 1000,
        jobLabel: 'LSPD',
        gradeLabel: 'Detective',
    },
]

export const CurMockJobs: CurrentJob[] =[
    {
        job: 'police',
        grade: 3,
        onDuty: true,
    },
]