import { PrismaService } from '../src/prisma/prisma.service'

export const cleanDataBase = async (prismaService: PrismaService) => {
  await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
  await prismaService.$executeRaw`DELETE FROM "public"."RelationBlocked";`
  await prismaService.$executeRaw`DELETE FROM "public"."RelationRequests";`
  await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
  await prismaService.$executeRaw`DELETE FROM "public"."ChannelMessage";`
  await prismaService.$executeRaw`DELETE FROM "public"."ChannelMember";`
  await prismaService.$executeRaw`DELETE FROM "public"."PrivateMessage";`
  await prismaService.$executeRaw`DELETE FROM "public"."GameStat";`
  await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
  await prismaService.$executeRaw`DELETE FROM "public"."User";`
}
