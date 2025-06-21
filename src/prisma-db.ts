import prisma from './prisma-singleton'

// Заполнение БД тестовыми данными
const seedUsers = async () => {
  const count = await prisma.user.count()
  if (count === 0) {
    await prisma.user.createMany({
      data: [
        { email: 'art@san.com', password: '123456', name: 'AtrSan' },
        { email: 'san@art.ru', password: '123456', name: 'San-Art' }
      ]
    })
  }
}
seedUsers()

// CRUD-операции
export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return prisma.user.findMany()
}
export async function getUser(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.user.findUnique({
    where: { id }
  })
}
export async function addUser(email: string, password: string, name: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.user.create({
    data: { email, password, name }
  })
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
