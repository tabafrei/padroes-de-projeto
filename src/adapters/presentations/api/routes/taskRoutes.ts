import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { taskControllerFactory } from "../../../factories/taskControllerFactory";
import { deleteTaskControllerFactory } from "../../../factories/deleteTaskControllerFactory";

export default (router: Router): void => {
  router.post(
    "/tasks",
    expressRouteAdapter(taskControllerFactory())
  );
  router.delete(
    "/tasks/:id",
    expressRouteAdapter(deleteTaskControllerFactory())
  );
};
