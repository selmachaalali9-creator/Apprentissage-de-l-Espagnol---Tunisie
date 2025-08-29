export type Level = '3A' | 'BAC';
export type Difficulty = 'Facile' | 'Moyen' | 'Difficile';
export type View = 'topic' | 'exams';
export type TopicFilter = 'all' | 'lessons' | 'exercises';

export interface Question {
    id: string;
    type: 'mcq' | 'fill-in-the-blank';
    question: string;
    options?: string[];
    answer: string | string[]; // Array for multiple correct fill-ins
    explanation?: string;
}

export interface LessonData {
    title: string;
    introduction: string;
    sections: {
        title: string;
        content: string;
        examples: string[];
    }[];
    audioSrc?: string;
    audioTranscription?: string;
}

export interface ExerciseData {
    title: string;
    questions: Question[];
}

export interface ListeningExerciseData {
    title: string;
    audioSrc: string;
    transcription: string;
    questions: Question[];
}

export interface Topic {
    id: string;
    title: string;
    type: 'lesson' | 'exercise' | 'listening_exercise';
    content: LessonData | ExerciseData | ListeningExerciseData;
}

export interface CourseData {
    '3A': Topic[];
    'BAC': Topic[];
}

export interface ExamSession {
    name: string;
    pdfLink?: string; 
    wordLink?: string;
}

export interface ExamYear {
    year: number;
    sessions: ExamSession[];
}

export interface User {
    id: string;
    email: string;
}
