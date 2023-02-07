import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError{
  constructor(
    message: string = "Requisição inválisa"
  ){
    super(400, message)
  }
}