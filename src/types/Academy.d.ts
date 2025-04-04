export interface Course {
    name: string
    created_at: string
    count_views: number
    count_likes: number
    status: string
    image_url: string
    count_lesson: number
    updated_at: string
    id: string
    count_students: number
    count_durations: string
    instructor: string
}

export interface Sections {
    name: string
    order: number
    created_at: string
    count_lessons: number
    id: string
    img_url?: string
}

export interface Lessons {
    id: string
    name: string
    created_at: string
    order: number
    iframe: string
    img_url?: string
}