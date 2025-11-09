import { Request, Response } from "express";
import { Controller } from "./interfaces/controller";

export const expressRouteAdapter = (controller: Controller) => {
    return async(req: Request, res: Response) => {
        const httpRequest = {
            params: req.params,
            body: req.body
        }
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode === 201 || httpResponse.statusCode === 204) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        // } else if (httpResponse.statusCode === 204) {
        //     res.status(httpResponse.statusCode).json();
        } else {
            res
              .status(httpResponse.statusCode)
              .json({ error: httpResponse.body.message });
        }
    }
};