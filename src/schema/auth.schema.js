import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3)
    .max(64),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8),
})

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8),
})
