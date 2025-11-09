import { HttpRequest, HttpResponse } from "../../interfaces/http";
import {
  badRequest,
  created,
  serverError,
} from "../../presentations/api/httpResponses/httpResponses";
import { Controller } from "../../interfaces/controller";
import { AddTask } from "../../../usecases/addTask";
import { Validation } from "../../interfaces/validation";

export class AddTaskController implements Controller {

  constructor(
    private readonly addTask: AddTask,
    private readonly validation: Validation
  ){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>  {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { title, description, date } = httpRequest.body;
      const task = await this.addTask.add({ title, description, date });
      return created(task);
      // throw new Error("Testando o Log de Errors");
    } catch (error: any) {
      return serverError(error);
    }

  }
}
