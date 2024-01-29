import express from "express";
import { createJwtToken } from "../lib/jwt";
import { getUserByEmail, createUser } from "../models/userSchema";
import { authentication, random } from "../lib/salt";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(401);
    } else {
      const expectedHash = authentication(
        String(user?.authentication?.salt),
        password
      );

      if (user?.authentication?.password != expectedHash) {
        return res.sendStatus(401);
      }

      const token = createJwtToken(user);

      return res
        .cookie("jwt-token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt-token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
