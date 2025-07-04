import prisma from './prisma-singleton'
import { hashPassword, verifyPassword } from './utils/hash.util'

// Заполнение БД тестовыми данными
const seedUsers = async () => {
  const count = await prisma.user.count()
  if (count === 0) {
    const hashedPassword = await hashPassword('123456')
    await prisma.user.createMany({
      data: [
        { email: 'art@san.com', password: hashedPassword, name: 'AtrSan' },
        { email: 'san@art.ru', password: hashedPassword, name: 'San-Art' }
      ]
    })
  }
}
seedUsers()

// CRUD-операции
export async function getUsers() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return prisma.user.findMany()
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error('Не такого пользователя')
    }

    return user
  } catch (err) {
    throw err
  }
}

export async function addUser(email: string, password: string, name: string) {
  try {
    // Проверка уникальности почты
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw Error('Email занят')
    }

    // Хэширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || 'No name'
      }
    })
  } catch (err) {
    throw err
  }
}
export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Не верный email или пароль')
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      throw new Error('Не верный email или пароль')
    }

    return user
  } catch (err) {
    throw err
  }
}
export async function registerUser(email: string, password: string) {
  try {
    // Проверка уникальности почты
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw Error('Email занят')
    }

    // Хэширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email
      }
    })

    return newUser
  } catch (err) {
    throw err
  }
}

export async function updateUser(
  id: number,
  email: string,
  password: string,
  name: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.user.update({
    where: { id },
    data: { email, password, name }
  })
}

export async function deleteUser(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.user.delete({
    where: { id }
  })
}

export async function updateUserRefreshToken(id: number, refreshToken: string) {
  return await prisma.user.update({
    where: { id: id },
    data: { refreshToken }
  })
}
