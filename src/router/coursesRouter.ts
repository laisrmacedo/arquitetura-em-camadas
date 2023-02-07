import  express  from "express";
import { CoursesController } from "../controller/CoursesController";

export const coursesRouter = express.Router()

const coursesController = new CoursesController()

coursesRouter.get("/", coursesController.getCourses)
coursesRouter.post("/", coursesController.createCourse)
coursesRouter.delete("/:id", coursesController.deleteCourse)
coursesRouter.put("/:id", coursesController.editCourse)
