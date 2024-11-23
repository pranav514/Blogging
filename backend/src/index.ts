import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { authMiddleware } from "./utils/authentication";
import userRoute from "./routes/userRoute";
import blogRoute from "./routes/blogRoute";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(cors())
// app.use("/api/v1/blog/", authMiddleware);
// app.use("/api/v1/blog/:id/", authMiddleware);
// app.use("/api/v1/blog", authMiddleware);

app.route('/api/v1/user'  , userRoute)


app.route('/api/v1/blog' , blogRoute)
export default app;
