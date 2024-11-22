import  z from "zod"

export const registerSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20),
    firstname : z.string(),
    lastname  : z.string()
})


export type  RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string()
})
export type LoginSchema = z.infer<typeof loginSchema>

export const blogSchema = z.object({
    title : z.string(),
    content : z.string(),
})
export type BlogSchema = z.infer<typeof blogSchema>

export const updateBlog = z.object({
    title : z.string(),
    content : z.string(),
})
export type UpdateBlogSchema = z.infer<typeof updateBlog>