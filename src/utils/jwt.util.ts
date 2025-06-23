import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export const generateToken = (userId: number) => {
  console.log(`SECRET_KEY `, SECRET_KEY)
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    console.log('verifyToken', error)
    return null
  }
}
