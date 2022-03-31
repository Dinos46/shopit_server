import { Request, Response } from "express";

export interface IContext extends Response {
  req: Request;
}
