import { z } from 'zod';

// Define the schema for user signup
export const userSignupSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  year: z.string().min(1, "Year is required"),
    branch: z.string().min(1, "Branch is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

//dekho we deifned the schema for user signup in signup page aslo fullname contact email password and now again we did in zod . so zod tells us that once u make a schema we also give u the type of that schema so we can use that type in our code. so no need to write the type again and again

// Define the schema for user login
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define the type for user signup
export type SignupInputState = z.infer<typeof userSignupSchema>;
// //this export is used in signup.tsx file and this export type is equal to type SignupInputState = {
//     name: string;
//     year: number;
//     email: string;
//     password: string;
//     branch: string;
//     };



// Define the type for user login
export type LoginInputState = z.infer<typeof userLoginSchema>;