import env from '@/env'
import { Jwt } from 'hono/utils/jwt'

const genToken = (id: string) => {
  return Jwt.sign({ id }, env.JWT_SECRET || '')
}

export default genToken