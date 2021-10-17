import { customAlphabet } from 'nanoid'
import * as bcrypt from 'bcrypt'

const PASSWORD_CHARS =
  '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

export const generatePassword = async (length: number = 8) => {
  const nanoid = customAlphabet(PASSWORD_CHARS, length)
  return await nanoid()
}
