import express from "express";
import { verifyJwtToken } from "../lib/jwt";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    
    const jwtToken = req.cookies["jwt-token"];
   
    if (!jwtToken) {
      return res.sendStatus(403);
    }
    const verify = verifyJwtToken(jwtToken);
    
    if (!verify) {
      return res.sendStatus(403);
    }
    (req as any).user = verify;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};