import { Request, Response } from "express"
import { CoursesBusiness } from "../business/CoursesBusiness"
import { BaseError } from "../errors/BaseError"

export class CoursesController {
    public getCourses = async (req: Request, res: Response) => {
        try {
            const coursesBusiness = new CoursesBusiness()
            const output = await coursesBusiness.getCourses()
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id , 
                name: req.body.name,
                lessons: req.body.lessons
            }

            const coursesBusiness = new CoursesBusiness()
            const output = await coursesBusiness.createCourse(input)

            res.status(201).send({
                message: "Curso criado com sucesso.",
                account: output
            })
        } catch (error) {
    
            // if (error instanceof BaseError) {
            //     res.send(error.statusCode).send(error.message)

            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCourse = async (req: Request, res: Response) => {
        try {
            const idToDelete = req.params.id

            const coursesBusiness = new CoursesBusiness()
            const output = await coursesBusiness.deleteCourse(idToDelete)
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editCourse = async (req: Request, res: Response) => {
        try {
            const idToEdit = req.params.id
            const {newId, newName, newLessons} = req.body
    
            const coursesBusiness = new CoursesBusiness()
            const output = await coursesBusiness.editCourse(idToEdit, newId, newName, newLessons)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            // if (req.statusCode === 200) {
            //     res.status(500)
            // }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    
}