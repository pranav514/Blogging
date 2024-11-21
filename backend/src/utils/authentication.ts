import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify , decode } from 'hono/jwt';
import { use } from 'hono/jsx';
import { auth } from 'hono/utils/basic-auth';
export const authMiddleware = async (c : any , next : any) => {
    try {
        const value = c.req.header('Authorization');
        const token = value?.split(" ")[1];
    
       
        if (!token) {
          return c.json({ error: "Token not present" }, 401);
        }
    
        const decoded = await verify(token, c.env.JWT_SECRET);
    
       
        if (!decoded) {
          return c.json({ error: "Invalid token" }, 401);
        }
        c.set('jwtPayload', decoded.id);
    
        await next();
      } catch (err : any) {
    
        return c.json({ error: "Authentication failed", details: err.message }, 500);
      }

}