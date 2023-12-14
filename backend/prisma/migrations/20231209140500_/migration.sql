-- CreateEnum
CREATE TYPE "EStatus" AS ENUM ('Online', 'Invisble', 'Idle', 'DoNotDisturb');

-- CreateEnum
CREATE TYPE "ELanguage" AS ENUM ('English', 'French', 'Spanish');

-- CreateEnum
CREATE TYPE "EChannelType" AS ENUM ('Public', 'Protected');

-- CreateEnum
CREATE TYPE "EMemberType" AS ENUM ('Admin', 'Member');

-- CreateEnum
CREATE TYPE "EGameType" AS ENUM ('Classic', 'Special');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "mail" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "googleAuth" BOOLEAN NOT NULL DEFAULT false,
    "githubAuth" BOOLEAN NOT NULL DEFAULT false,
    "school42Auth" BOOLEAN NOT NULL DEFAULT false,
    "doubleA" BOOLEAN NOT NULL DEFAULT false,
    "notValidateOtp" TEXT,
    "notValidateOtpUrl" TEXT,
    "ValidateOtp" TEXT,
    "ValidateOtpUrl" TEXT,
    "validation2fa" BOOLEAN NOT NULL DEFAULT true,
    "status" "EStatus" NOT NULL DEFAULT 'Online',
    "languages" "ELanguage" NOT NULL DEFAULT 'English',
    "level" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPresence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disconnectedAt" TIMESTAMP(3),

    CONSTRAINT "UserPresence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationFriend" (
    "userAId" TEXT NOT NULL,
    "userBId" TEXT NOT NULL,

    CONSTRAINT "RelationFriend_pkey" PRIMARY KEY ("userAId","userBId")
);

-- CreateTable
CREATE TABLE "RelationRequests" (
    "userSenderId" TEXT NOT NULL,
    "userReceiverId" TEXT NOT NULL,

    CONSTRAINT "RelationRequests_pkey" PRIMARY KEY ("userSenderId","userReceiverId")
);

-- CreateTable
CREATE TABLE "RelationBlocked" (
    "userBlockingId" TEXT NOT NULL,
    "userBlockedId" TEXT NOT NULL,

    CONSTRAINT "RelationBlocked_pkey" PRIMARY KEY ("userBlockingId","userBlockedId")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "topic" TEXT,
    "password" TEXT,
    "ownerId" TEXT NOT NULL,
    "maxUsers" INTEGER NOT NULL DEFAULT 50,
    "type" "EChannelType" NOT NULL DEFAULT 'Public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelBlocked" (
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ChannelBlocked_pkey" PRIMARY KEY ("userId","channelId")
);

-- CreateTable
CREATE TABLE "ChannelInvited" (
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ChannelInvited_pkey" PRIMARY KEY ("userId","channelId")
);

-- CreateTable
CREATE TABLE "ChannelMember" (
    "avatarUrl" TEXT,
    "nickname" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "type" "EMemberType" NOT NULL DEFAULT 'Member',
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMember_pkey" PRIMARY KEY ("userId","channelId")
);

-- CreateTable
CREATE TABLE "ChannelMessage" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateMessage" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStat" (
    "id" TEXT NOT NULL,
    "winnerId" TEXT,
    "loserId" TEXT,
    "type" "EGameType" NOT NULL,
    "timePlayed" INTEGER NOT NULL,
    "scoreWinner" INTEGER NOT NULL,
    "scoreLoser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- AddForeignKey
ALTER TABLE "UserPresence" ADD CONSTRAINT "UserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationFriend" ADD CONSTRAINT "RelationFriend_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationFriend" ADD CONSTRAINT "RelationFriend_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationRequests" ADD CONSTRAINT "RelationRequests_userReceiverId_fkey" FOREIGN KEY ("userReceiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationRequests" ADD CONSTRAINT "RelationRequests_userSenderId_fkey" FOREIGN KEY ("userSenderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationBlocked" ADD CONSTRAINT "RelationBlocked_userBlockedId_fkey" FOREIGN KEY ("userBlockedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationBlocked" ADD CONSTRAINT "RelationBlocked_userBlockingId_fkey" FOREIGN KEY ("userBlockingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelBlocked" ADD CONSTRAINT "ChannelBlocked_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelBlocked" ADD CONSTRAINT "ChannelBlocked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelInvited" ADD CONSTRAINT "ChannelInvited_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelInvited" ADD CONSTRAINT "ChannelInvited_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessage" ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStat" ADD CONSTRAINT "GameStat_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStat" ADD CONSTRAINT "GameStat_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
