import { type User } from '@prisma/client'

export const users: {
  name: User['name']
  password: User['password']
}[] = [
  {
    name: 'username',
    password: 'password',
  },
]
