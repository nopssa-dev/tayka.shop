
import type{Response, Request, NextFunction} from 'express';
import { validationResult } from 'express-validator';


export const hundleValidationErrors = (req: Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}