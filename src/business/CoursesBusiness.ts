import { CoursesDatabase } from "../database/CoursesDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Course } from "../models/Course"
import { CourseDB } from "../types"

export class CoursesBusiness {
  public getCourses = async () => {

    const coursesDatabase = new CoursesDatabase()
    const coursesDB = await coursesDatabase.findCourses()

    const course: Course[] = coursesDB.map((courseDB) => new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons
    ))

    return course
  }

  public createCourse = async (input: any) => {

    const { id, name, lessons } = input

    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string")
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string")
    }

    if (typeof lessons !== "number") {
      throw new BadRequestError("'lessons' deve ser number")
    }

    const coursesDatabase = new CoursesDatabase()
    const [courseDB] = await coursesDatabase.findCourseById(id)
    // console.log(courseDB)
    if (courseDB) {
      throw new BadRequestError("'id' já existe")
    }

    const newCourse = new Course(
      id,
      name,
      lessons
    )

    const newCourseDB: CourseDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLessons()
    }

    await coursesDatabase.insertCourses(newCourseDB)

    return ({
      message: "Curso criado com sucesso.",
      user: newCourse
    })
  }

  public deleteCourse = async (idToDele: string) => {
    const coursesDatabase = new CoursesDatabase()
    const [courseToDelete] = await coursesDatabase.findCourseById(idToDele)

    if (!courseToDelete) {
      throw new BadRequestError("'id' não encontrado")
    }

    await coursesDatabase.deleteCourse(idToDele)

    return ({
      message: "Curso deletado com sucesso."
    })
  }

  public editCourse = async (idToEdit: string, newId: string, newName: string, newLessons: number) => {
    if (idToEdit === undefined) {
      throw new BadRequestError("Informe um id")
    }

    const coursesDatabase = new CoursesDatabase()
    const [courseDB] = await coursesDatabase.findCourseById(idToEdit)

    if (!courseDB) {
      throw new BadRequestError("'id' não encontrado")
    }

    const courseToEdit = new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons,
    )

    if(newId !== undefined){
      if (typeof newId !== "string"){
      throw new BadRequestError("'newId' deve ser do tipo string")
      }
      courseToEdit.setId(newId)
    }

    if(newName !== undefined){
      if (typeof newName !== "string"){
      throw new BadRequestError("'newName' deve ser do tipo string")
      }
      courseToEdit.setName(newName)
    }

    if(newLessons !== undefined){
      if (typeof newLessons !== "number"){
      throw new BadRequestError("'newLessons' deve ser do tipo number")
      }
      courseToEdit.setLessons(newLessons)
    }

    const newCourseDB = {
      id: courseToEdit.getId(),
      name: courseToEdit.getName(),
      lessons: courseToEdit.getLessons()
    }

    await coursesDatabase.editCourse(idToEdit, newCourseDB)

    return ({
      message: "Curso editado com sucesso",
    })
  }
}