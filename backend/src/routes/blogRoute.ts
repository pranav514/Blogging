import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../utils/authentication";
import { blogSchema , updateBlog } from "@pranavsalunkhe2003/types-exp";
const blogRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();
  blogRoute.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const blogs = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          author: {
            select  :{
                firstname : true
            }
          }
        },
      });
      return c.json({ message: "blogs fetched succesfully", blogs: blogs });
    } catch (err) {
      return c.json({ error: "cannot fetch the blog" });
    }
  });
  blogRoute.use("/", authMiddleware);
  blogRoute.use("/:id", authMiddleware);
//   blogRoute.use("/api/v1/blog", authMiddleware);
  
  blogRoute.post("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const userId = c.get("jwtPayload");
      const body = await c.req.json();
    const success = blogSchema.safeParse(body);
if (!success.success) {
    return c.json({ error: "invalid request" } , 411);
}
      const { title, content } = body;
      const blog = await prisma.blog.create({
        data: {
          title: title,
          content: content,
          published: true,
          authorId: userId,
        },
      });
      return c.json({ message: "Blog created succesfully", blog: blog });
    } catch (err) {
      return c.json({ error: "error in creating blog" });
    }
  });
  
  blogRoute.put("/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const id = c.req.param("id");
      const userId = c.get("jwtPayload");
      const body = await c.req.json();
      const success = updateBlog.safeParse(body)
      if (!success.success) {
        return c.json({ error: "invalid request" } , 411);
      }
      const { title, content } = body;
       const blogExists = await prisma.blog.findUnique({
        where: {
            id: id,
        }
       })
       if (!blogExists) {
        return c.json({ error: "blog not found" });
       }
       if(blogExists.authorId !== userId){
        return c.json({ error: "you are not the author of this blog" } , 411);
       }
      const blog = await prisma.blog.update({
        where: {
          id: id,
          authorId: userId,
        },
        data: {
          title: title,
          content: content,
        },
      });
      return c.json({ message: "Blog updated succesfully", blog: blog });
    } catch (err) {
      return c.json({ message: "error in updating the todo" });
    }
  });
  
  blogRoute.get("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const userId = c.get("jwtPayload");
      const blogs = await prisma.blog.findMany({
        where: {
          authorId: userId,
        },
        select: {
          id: true,
          title: true,
          content: true,
        },
      });
      return c.json({ message: "blogs fetched succesfully", blogs: blogs });
    } catch (err) {
      c.json({ error: "cannot fetch the blog" });
    }
  });
  
  

  blogRoute.get("/:id" , async(c) => {
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const id = c.req.param('id');
        const blog  = await prisma.blog.findUnique({
            where : {
                id,
            },
            select:{
                title:true,
                content:true,
                author : {
                    select:{
                        firstname : true
                    }
                }

            }
        })
        return c.json({blog : blog});
    }catch(err){
       return  c.json({error : "cannot fetch the blog" });
    }
    
  })
  
export default blogRoute