import { CourseDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CoursesDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses(): Promise<CourseDB[]>{
        const coursesDB: CourseDB[] = await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
        return coursesDB
    }

    public async findCourseById(id: string): Promise<CourseDB[]> {
        const coursesDB : CourseDB[] = await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .where({ id })

        return coursesDB
    }

    public async insertCourses(newCourseDB: CourseDB): Promise<void> {
        await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async deleteCourse(idToDelete: string): Promise<void>{
        await BaseDatabase
        .connection(CoursesDatabase.TABLE_COURSES)
        .del()
        .where({ id: idToDelete })
    }

    public async editCourse(idToEdit: string, newCourseDB: CourseDB): Promise<void>{
        await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .update(newCourseDB)
            .where({id : idToEdit})
    }
}
