import { Image, WithPaginationRequest, WithPaginationResponse } from './base';

interface Lecture {
  id: string;
  name: string;
  text: string;
}

interface Module {
  id: string;
  name: string;
  lectures: Lecture[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  image?: Image;
  modules: Module[];
}

interface CoursesRequest extends WithPaginationRequest {
  search?: string;
}

interface CoursesResponse extends WithPaginationResponse {
  courses: Course[];
}

type AddCourseRequest = Pick<Course, 'name' | 'description' | 'image'>;
type EditCourseRequest = {
  id: string;
  course: Pick<Course, 'name' | 'description' | 'image'>;
};

type AddModuleRequest = Pick<Module, 'name'> & { courseId: string };
type EditModuleRequest = Pick<Module, 'name' | 'id'>;

type AddLectureRequest = Pick<Lecture, 'name' | 'text'> & {
  moduleId: string;
};

export type {
  Lecture,
  Module,
  Course,
  CoursesRequest,
  CoursesResponse,
  AddCourseRequest,
  EditModuleRequest,
  EditCourseRequest,
  AddModuleRequest,
  AddLectureRequest
};
