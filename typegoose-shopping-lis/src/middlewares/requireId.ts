import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const requireId =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      throw res.status(400).send(e.errors);
    }
  };

export default requireId;
