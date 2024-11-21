import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify , decode } from 'hono/jwt';
import { use } from 'hono/jsx';
import { auth } from 'hono/utils/basic-auth';
import { authMiddleware } from './utils/authentication';
const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>();

app.use('/api/v1/blog/*', authMiddleware);
app.use('/api/v1/blog/:id/*' , authMiddleware)
app.use('/api/v1/blog' , authMiddleware);

app.post('/api/v1/register', async (c) => {
  console.log("hiiiiii")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
  try{
    const body = await c.req.json()
    const {email , password , firstname,lastname} = body;
    if(!email || !password || !firstname || !lastname){
     return  c.json({error : "add the compelete information"});

    }
    console.log("hello");
    const val = await prisma.user.create({
      data : {
        email : email,
        password : password,
        firstname : firstname,
        lastname : lastname,
      }
    })
    console.log(val);
    console.log(val.id)
    console.log(c.env.JWT_SECRET)
    const token = await sign({id : val.id} , c.env.JWT_SECRET);
    console.log(token);
    return c.json({message : "user created successfully" , user : val , token : token});
  }catch(err :any){
    return c.json({error : err.message , detail : err.detail});
  }
})
app.post('/api/v1/login',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const body = await c.req.json();
    const {email , password} = body;
    if(!email || !password){
      return c.json({error : "enter the email or password"})
    }
    const user  =await  prisma.user.findUnique({
      where : {
        email:email,
      }
    })
    if(!user){
      return c.json({error : "user not found"});
    }
    if(user.password !== password){
      return c.json({"error" : "enter the correct password"});
    }
    const token = await sign({id : user.id} , c.env.JWT_SECRET);
    return c.json({message : "user loged in successfully" , token});
  }catch(err){
    return c.json({error : "error in login"});
  }
})

app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const userId = c.get('jwtPayload');
    const body = await c.req.json()
    const {title , description} = body;
    const blog = await prisma.blog.create({
      data  :{
        title:title,
        content : description,
        published : true,
        authorId : userId
      }
    })
    return c.json({message : "Blog created succesfully" , blog:blog})

  }
  catch(err){
    return c.json({error : "error in creating blog"})
  }
})

app.put('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const id = c.req.param('id')
    const userId = c.get('jwtPayload')
    const body = await c.req.json()
    const {title , description} = body;
    const blog = await prisma.blog.update({
      where : {
        id: id,
        authorId : userId
      },
      data : {
        title:title,
        content : description,
      }
    })
    return c.json({message : "Blog updated succesfully" , blog:blog})
  }
  catch(err){
    return c.json({message : "error in updating the todo"});
  }
})

app.get('/api/v1/blog',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const userId = c.get('jwtPayload')
    const blogs = await prisma.blog.findMany({
      where  : {
        authorId : userId
      },
      select : {
        title : true,
        content : true
      }
    })
    return c.json({message : "blogs fetched succesfully" , blogs:blogs})
  }
  catch(err){
    c.json({error : "cannot fetch the blog"})
  }
})


export default app
