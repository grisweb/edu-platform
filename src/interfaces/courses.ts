import { WithPaginationRequest, WithPaginationResponse } from './base';

interface Course {
  id: string;
  name: string;
  description: string;
}

interface CoursesRequest extends WithPaginationRequest {
  search?: string;
}

interface CoursesResponse extends WithPaginationResponse {
  courses: Course[];
}

type AddCourseRequest = Pick<Course, 'name' | 'description'>;

export type { Course, CoursesRequest, CoursesResponse, AddCourseRequest };
