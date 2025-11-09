import { DeleteTask } from "../../../usecases/deleteTask";
import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../interfaces/validation";
import { badRequest, noContent, serverError } from "../../presentations/api/httpResponses/httpResponses";

export class DeleteTaskController implements Controller {

  constructor(
    private readonly deleteTask: DeleteTask,
    private readonly validation: Validation
  ){}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const error = this.validation.validate({ id });
      if (error) {
        return badRequest(error);
      }

      const result = await this.deleteTask.delete({ id });
      if (result instanceof Error) {
        return badRequest(result);
      }
      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}