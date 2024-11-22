import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();
userRoute.post("/register", async (c) => {
    console.log("hiiiiii");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const body = await c.req.json();
      const { email, password, firstname, lastname } = body;
      if (!email || !password || !firstname || !lastname) {
        return c.json({ error: "add the compelete information" });
      }
      console.log("hello");
      const val = await prisma.user.create({
        data: {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
        },
      });
      console.log(val);
      console.log(val.id);
      console.log(c.env.JWT_SECRET);
      const token = await sign({ id: val.id }, c.env.JWT_SECRET);
      console.log(token);
      return c.json({
        message: "user created successfully",
        user: val,
        token: token,
      });
    } catch (err: any) {
      return c.json({ error: err.message, detail: err.detail });
    }
  });

  userRoute.post("/api/v1/login", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const body = await c.req.json();
      const { email, password } = body;
      if (!email || !password) {
        return c.json({ error: "enter the email or password" });
      }
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return c.json({ error: "user not found" });
      }
      if (user.password !== password) {
        return c.json({ error: "enter the correct password" });
      }
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ message: "user loged in successfully", token });
    } catch (err) {
      return c.json({ error: "error in login" });
    }
  });

export default userRoute