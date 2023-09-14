const { PrismaClient } = require('@prisma/client')

module.exports = async () => {
  const prisma = new PrismaClient()

  await prisma.$executeRaw('DELETE FROM User')

  await prisma.$disconnect()
}
