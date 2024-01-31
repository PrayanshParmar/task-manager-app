import express from "express";
import { ZodError, z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, { message: "Password must contain at least 4 characters" }),
});

const registrationSchema = loginSchema.extend({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(4, { message: "Username must contain at least 4 characters" }),
});

const validateRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userInput = req.body;

  try {
    let result;

    if (req.path === "/api/v1/register") {
      result = registrationSchema.parse(userInput);
    } else {
      result = loginSchema.parse(userInput);
    }

    (req as any).user = result;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationIssues = error.errors.map((issue) => {
        return {
          validation: issue.path[0],
          message: issue.message,
        };
      });

      res.status(400).json({ error: validationIssues });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default validateRequest;
