/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n          query IsAuthenticated {\n            findOneUserByContext {\n              username\n              mail\n              id\n              validation2fa\n            }\n          }\n        ": types.IsAuthenticatedDocument,
    "\n  query IsUserUsernameUsed($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n": types.IsUserUsernameUsedDocument,
    "\n  query IsUserMailUsed($mail: String!) {\n    isUserMailUsed(mail: $mail)\n  }\n": types.IsUserMailUsedDocument,
    "\n  query GetId {\n    findOneUserByContext {\n      id\n      validation2fa\n    }\n  }\n": types.GetIdDocument,
    "\n  subscription PrivateMessageCreation(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageCreation(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.PrivateMessageCreationDocument,
    "\n  subscription PrivateMessageEdition($receiverId: String!, $senderId: String!) {\n    privateMessageEdition(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.PrivateMessageEditionDocument,
    "\n  subscription PrivateMessageDeletion(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageDeletion(receiverId: $receiverId, senderId: $senderId) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n": types.PrivateMessageDeletionDocument,
    "\n  subscription ChannelMessageCreation($channelId: String!) {\n    channelMessageCreation(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.ChannelMessageCreationDocument,
    "\n  subscription ChannelMessageEdition($channelId: String!) {\n    channelMessageEdition(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.ChannelMessageEditionDocument,
    "\n  subscription ChannelMessageDeletion($channelId: String!) {\n    channelMessageDeletion(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.ChannelMessageDeletionDocument,
    "\n  mutation CreatePrivateMessage($data: CreatePrivateMessageInput!) {\n    createPrivateMessage(data: $data) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n": types.CreatePrivateMessageDocument,
    "\n  mutation UpdatePrivateMessage(\n    $data: UpdatePrivateMessageInput!\n    $updatePrivateMessageId: String!\n  ) {\n    updatePrivateMessage(data: $data, id: $updatePrivateMessageId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.UpdatePrivateMessageDocument,
    "\n  mutation DeletePrivateMessage($deletePrivateMessageId: String!) {\n    deletePrivateMessage(id: $deletePrivateMessageId) {\n      id\n    }\n  }\n": types.DeletePrivateMessageDocument,
    "\n  mutation CreateChannel($data: CreateChannelInput!) {\n    createChannel(data: $data) {\n      id\n    }\n  }\n": types.CreateChannelDocument,
    "\n  mutation DeleteChannel($deleteChannelId: String!) {\n    deleteChannel(id: $deleteChannelId) {\n      id\n    }\n  }\n": types.DeleteChannelDocument,
    "\n  mutation CreateChannelMessage($data: CreateChannelMessageInput!) {\n    createChannelMessage(data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.CreateChannelMessageDocument,
    "\n  mutation UpdateChannelMessage(\n    $updateChannelMessageId: String!\n    $data: UpdateChannelMessageInput!\n  ) {\n    updateChannelMessage(id: $updateChannelMessageId, data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.UpdateChannelMessageDocument,
    "\n  mutation DeleteChannelMessage($deleteChannelMessageId: String!) {\n    deleteChannelMessage(id: $deleteChannelMessageId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.DeleteChannelMessageDocument,
    "\n  mutation CreateChannelMember($data: CreateChannelMemberInput!) {\n    createChannelMember(data: $data) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n": types.CreateChannelMemberDocument,
    "\n  mutation DeleteChannelMember($userId: String!, $channelId: String!) {\n    deleteChannelMember(userId: $userId, channelId: $channelId) {\n      userId\n      channelId\n    }\n  }\n": types.DeleteChannelMemberDocument,
    "\n  mutation MuteChannelMember($channelId: String!, $userId: String!) {\n    muteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n": types.MuteChannelMemberDocument,
    "\n  mutation UnmuteChannelMember($channelId: String!, $userId: String!) {\n    unmuteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n": types.UnmuteChannelMemberDocument,
    "\n  mutation CreateChannelBlocked($data: CreateChannelBlockedInput!) {\n    createChannelBlocked(data: $data) {\n      channelId\n      userId\n    }\n  }\n": types.CreateChannelBlockedDocument,
    "\n  mutation DeleteChannelBlocked($channelId: String!, $userId: String!) {\n    deleteChannelBlocked(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n": types.DeleteChannelBlockedDocument,
    "\n  mutation CreateChannelInvited($data: CreateChannelInvitedInput!) {\n    createChannelInvited(data: $data) {\n      channelId\n      userId\n    }\n  }\n": types.CreateChannelInvitedDocument,
    "\n  mutation DeleteChannelInvited($channelId: String!, $userId: String!) {\n    deleteChannelInvited(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n": types.DeleteChannelInvitedDocument,
    "\n  mutation MakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    makeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n": types.MakeChannelMemberAdminDocument,
    "\n  mutation UnmakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    unmakeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n": types.UnmakeChannelMemberAdminDocument,
    "\n  query FindAllPrivateMessageWith($receiverId: String!, $senderId: String!) {\n    findAllPrivateMessageWith(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      senderId\n      receiverId\n      updatedAt\n    }\n  }\n": types.FindAllPrivateMessageWithDocument,
    "\n  query FindAllChannelMessageInChannel($channelId: String!) {\n    findAllChannelMessageInChannel(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n": types.FindAllChannelMessageInChannelDocument,
    "\n  query FindOneChannelByName($name: String!) {\n    findOneChannelByName(name: $name) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n": types.FindOneChannelByNameDocument,
    "\n  query FindOneUserStatus($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      status\n      id\n    }\n  }\n": types.FindOneUserStatusDocument,
    "\n  query FindLastUserPresenceByUserId($findLastUserPresenceByUserIdId: String!) {\n    findLastUserPresenceByUserId(id: $findLastUserPresenceByUserIdId) {\n      userId\n      disconnectedAt\n      connectedAt\n    }\n  }\n": types.FindLastUserPresenceByUserIdDocument,
    "\n  subscription PongInvitationSubcription($userId: String!) {\n    pongInvitationSubcription(userId: $userId) {\n      gameId\n      gameType\n      senderNickname\n    }\n  }\n": types.PongInvitationSubcriptionDocument,
    "\n  mutation SendPongInvitation(\n    $gameType: EGameType!\n    $receiverNickname: String!\n    $senderId: String!\n    $senderNickname: String!\n  ) {\n    sendPongInvitation(\n      gameType: $gameType\n      receiverNickname: $receiverNickname\n      senderId: $senderId\n      senderNickname: $senderNickname\n    )\n  }\n": types.SendPongInvitationDocument,
    "\n  subscription PongData($gameId: String!) {\n    pongData(gameId: $gameId) {\n      ball {\n        hPos\n        radius\n        vPos\n      }\n      elapsedTime\n      p1racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      p2racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      player1 {\n        nickname\n        presence\n        score\n      }\n      player2 {\n        nickname\n        presence\n        score\n      }\n      playfield {\n        height\n        width\n      }\n      type\n      winner\n      message\n    }\n  }\n": types.PongDataDocument,
    "\n  mutation readyForGame($gameId: String!, $playerId: String!) {\n    readyForGame(gameId: $gameId, playerId: $playerId)\n  }\n": types.ReadyForGameDocument,
    "\n  mutation UpdatePlayerInputs(\n    $controls: ControlsInput!\n    $gameId: String!\n    $playerId: String!\n  ) {\n    updatePlayerInputs(\n      controls: $controls\n      gameId: $gameId\n      playerId: $playerId\n    )\n  }\n": types.UpdatePlayerInputsDocument,
    "\n  mutation QuitGame($gameId: String!, $playerId: String!) {\n    quitGame(gameId: $gameId, playerId: $playerId)\n  }\n": types.QuitGameDocument,
    "\n  query IsGameValid($gameId: String!, $userId: String!) {\n    isGameValid(gameId: $gameId, userId: $userId)\n  }\n": types.IsGameValidDocument,
    "\n  query IsUserReadyInGame($gameId: String!, $userId: String!) {\n    isUserReadyInGame(gameId: $gameId, userId: $userId)\n  }\n": types.IsUserReadyInGameDocument,
    "\n  query FindGameStatClassic($findGameStatClassicId: String!) {\n    findGameStatClassic(id: $findGameStatClassicId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n": types.FindGameStatClassicDocument,
    "\n  query FindGameStatSpecial($findGameStatSpecialId: String!) {\n    findGameStatSpecial(id: $findGameStatSpecialId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n": types.FindGameStatSpecialDocument,
    "\n  query FindBestUsers {\n    findBestUsers {\n      avatarUrl\n      username\n      level\n    }\n  }\n": types.FindBestUsersDocument,
    "\n  subscription matchmakingNotification($playerId: String!) {\n    matchmakingNotification(playerId: $playerId)\n  }\n": types.MatchmakingNotificationDocument,
    "\n  mutation AddPlayerToMatchmakingQueue(\n    $gameType: EGameType!\n    $nickname: String!\n    $playerId: String!\n  ) {\n    addPlayerToMatchmakingQueue(\n      gameType: $gameType\n      nickname: $nickname\n      playerId: $playerId\n    )\n  }\n": types.AddPlayerToMatchmakingQueueDocument,
    "\n  mutation RemovePlayerFromMatchmakingQueue($playerId: String!) {\n    removePlayerFromMatchmakingQueue(playerId: $playerId)\n  }\n": types.RemovePlayerFromMatchmakingQueueDocument,
    "\n  query IsUserInGameQueue($userId: String!) {\n    isUserInGameQueue(userId: $userId)\n  }\n": types.IsUserInGameQueueDocument,
    "\n  subscription RelationBlockedCreation($userId: String!) {\n    relationBlockedCreation(userId: $userId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n": types.RelationBlockedCreationDocument,
    "\n  subscription RelationFriendDeleted($userId: String!) {\n    relationFriendDeleted(userId: $userId) {\n      userAId\n      userBId\n    }\n  }\n": types.RelationFriendDeletedDocument,
    "\n  subscription RelationRequestCreation($userId: String!) {\n    relationRequestCreation(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n": types.RelationRequestCreationDocument,
    "\n  subscription RelationRequestDeleted($userId: String!) {\n    relationRequestDeleted(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n": types.RelationRequestDeletedDocument,
    "\n  subscription ChannelEdition($channelEditionId: String!) {\n    channelEdition(id: $channelEditionId) {\n      id\n    }\n  }\n": types.ChannelEditionDocument,
    "\n  subscription ChannelDeletion($channelDeletionId: String!) {\n    channelDeletion(id: $channelDeletionId) {\n      id\n    }\n  }\n": types.ChannelDeletionDocument,
    "\n  subscription ChannelMemberCreation($channelMemberCreationId: String!) {\n    channelMemberCreation(id: $channelMemberCreationId) {\n      userId\n      channelId\n    }\n  }\n": types.ChannelMemberCreationDocument,
    "\n  subscription ChannelMemberEdition($channelMemberEditionId: String!) {\n    channelMemberEdition(id: $channelMemberEditionId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelMemberEditionDocument,
    "\n  subscription ChannelMemberDeletion($channelMemberDeletionId: String!) {\n    channelMemberDeletion(id: $channelMemberDeletionId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelMemberDeletionDocument,
    "\n  subscription ChannelInvitedCreation($channelInvitedCreationId: String!) {\n    channelInvitedCreation(id: $channelInvitedCreationId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelInvitedCreationDocument,
    "\n  subscription ChannelInvitedDeletion($channelInvitedDeletionId: String!) {\n    channelInvitedDeletion(id: $channelInvitedDeletionId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelInvitedDeletionDocument,
    "\n  subscription ChannelBlockedCreation($channelBlockedCreationId: String!) {\n    channelBlockedCreation(id: $channelBlockedCreationId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelBlockedCreationDocument,
    "\n  subscription ChannelBlockedDeletion($channelBlockedDeletionId: String!) {\n    channelBlockedDeletion(id: $channelBlockedDeletionId) {\n      channelId\n      userId\n    }\n  }\n": types.ChannelBlockedDeletionDocument,
    "\n  mutation DeleteRelationBlocked($userAId: String!, $userBId: String!) {\n    deleteRelationBlocked(userAId: $userAId, userBId: $userBId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n": types.DeleteRelationBlockedDocument,
    "\n  mutation DeleteRelationFriend($userAId: String!, $userBId: String!) {\n    deleteRelationFriend(userAId: $userAId, userBId: $userBId) {\n      userAId\n      userBId\n    }\n  }\n": types.DeleteRelationFriendDocument,
    "\n  mutation CreateRelationBlocked($data: RelationBlockedInput!) {\n    createRelationBlocked(data: $data) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n": types.CreateRelationBlockedDocument,
    "\n  mutation CreateRelationRequests($data: RelationRequestsInput!) {\n    createRelationRequests(data: $data) {\n      userReceiverId\n      userSenderId\n    }\n  }\n": types.CreateRelationRequestsDocument,
    "\n  mutation DeleteRelationRequests(\n    $userReceiverId: String!\n    $userSenderId: String!\n  ) {\n    deleteRelationRequests(\n      userReceiverId: $userReceiverId\n      userSenderId: $userSenderId\n    ) {\n      userReceiverId\n      userSenderId\n    }\n  }\n": types.DeleteRelationRequestsDocument,
    "\n  query FindOneUserByUsername($username: String!) {\n    findOneUserByUsername(username: $username) {\n      id\n      username\n    }\n  }\n": types.FindOneUserByUsernameDocument,
    "\n  query FindOneUser($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      avatarUrl\n      validation2fa\n      createdAt\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n": types.FindOneUserDocument,
    "\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n": types.FindOneUserByContextDocument,
    "\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n": types.FindUsersByUserIdsDocument,
    "\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n": types.FindAllRelationFriendDocument,
    "\n  query FindAllRelationRequestsSent($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n": types.FindAllRelationRequestsSentDocument,
    "\n  query FindAllRelationRequestsReceived($userReceiverId: String!) {\n    findAllRelationRequestsReceived(userReceiverId: $userReceiverId)\n  }\n": types.FindAllRelationRequestsReceivedDocument,
    "\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n": types.FindAllRelationBlockedDocument,
    "\n  query FindAllChannelMemberOfUser($userId: String!) {\n    findAllChannelMemberOfUser(userId: $userId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n": types.FindAllChannelMemberOfUserDocument,
    "\n  query FindAllChannelInvitedOfUser($userId: String!) {\n    findAllChannelInvitedOfUser(userId: $userId) {\n      channelId\n      userId\n    }\n  }\n": types.FindAllChannelInvitedOfUserDocument,
    "\n  query FindChannelByChannelIds($channelIds: [String!]!) {\n    findChannelByChannelIds(channelIds: $channelIds) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n": types.FindChannelByChannelIdsDocument,
    "\n  query FindAllChannelMemberInChannel($channelId: String!) {\n    findAllChannelMemberInChannel(channelId: $channelId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n": types.FindAllChannelMemberInChannelDocument,
    "\n  query FindAllChannelInvitedInChannel($channelId: String!) {\n    findAllChannelInvitedInChannel(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n": types.FindAllChannelInvitedInChannelDocument,
    "\n  query FindAllInChannelBlocked($channelId: String!) {\n    findAllInChannelBlocked(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n": types.FindAllInChannelBlockedDocument,
    "\n  query FindOneChannel($findOneChannelId: String!) {\n    findOneChannel(id: $findOneChannelId) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n": types.FindOneChannelDocument,
    "\n  query Query($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n": types.QueryDocument,
    "\n  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {\n    updateUser(id: $id, data: $data) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query IsAuthenticated {\n            findOneUserByContext {\n              username\n              mail\n              id\n              validation2fa\n            }\n          }\n        "): (typeof documents)["\n          query IsAuthenticated {\n            findOneUserByContext {\n              username\n              mail\n              id\n              validation2fa\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUserUsernameUsed($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n"): (typeof documents)["\n  query IsUserUsernameUsed($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUserMailUsed($mail: String!) {\n    isUserMailUsed(mail: $mail)\n  }\n"): (typeof documents)["\n  query IsUserMailUsed($mail: String!) {\n    isUserMailUsed(mail: $mail)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetId {\n    findOneUserByContext {\n      id\n      validation2fa\n    }\n  }\n"): (typeof documents)["\n  query GetId {\n    findOneUserByContext {\n      id\n      validation2fa\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PrivateMessageCreation(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageCreation(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription PrivateMessageCreation(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageCreation(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PrivateMessageEdition($receiverId: String!, $senderId: String!) {\n    privateMessageEdition(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription PrivateMessageEdition($receiverId: String!, $senderId: String!) {\n    privateMessageEdition(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PrivateMessageDeletion(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageDeletion(receiverId: $receiverId, senderId: $senderId) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription PrivateMessageDeletion(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageDeletion(receiverId: $receiverId, senderId: $senderId) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMessageCreation($channelId: String!) {\n    channelMessageCreation(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMessageCreation($channelId: String!) {\n    channelMessageCreation(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMessageEdition($channelId: String!) {\n    channelMessageEdition(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMessageEdition($channelId: String!) {\n    channelMessageEdition(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMessageDeletion($channelId: String!) {\n    channelMessageDeletion(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMessageDeletion($channelId: String!) {\n    channelMessageDeletion(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePrivateMessage($data: CreatePrivateMessageInput!) {\n    createPrivateMessage(data: $data) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePrivateMessage($data: CreatePrivateMessageInput!) {\n    createPrivateMessage(data: $data) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePrivateMessage(\n    $data: UpdatePrivateMessageInput!\n    $updatePrivateMessageId: String!\n  ) {\n    updatePrivateMessage(data: $data, id: $updatePrivateMessageId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePrivateMessage(\n    $data: UpdatePrivateMessageInput!\n    $updatePrivateMessageId: String!\n  ) {\n    updatePrivateMessage(data: $data, id: $updatePrivateMessageId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePrivateMessage($deletePrivateMessageId: String!) {\n    deletePrivateMessage(id: $deletePrivateMessageId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePrivateMessage($deletePrivateMessageId: String!) {\n    deletePrivateMessage(id: $deletePrivateMessageId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannel($data: CreateChannelInput!) {\n    createChannel(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannel($data: CreateChannelInput!) {\n    createChannel(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannel($deleteChannelId: String!) {\n    deleteChannel(id: $deleteChannelId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannel($deleteChannelId: String!) {\n    deleteChannel(id: $deleteChannelId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannelMessage($data: CreateChannelMessageInput!) {\n    createChannelMessage(data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannelMessage($data: CreateChannelMessageInput!) {\n    createChannelMessage(data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateChannelMessage(\n    $updateChannelMessageId: String!\n    $data: UpdateChannelMessageInput!\n  ) {\n    updateChannelMessage(id: $updateChannelMessageId, data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateChannelMessage(\n    $updateChannelMessageId: String!\n    $data: UpdateChannelMessageInput!\n  ) {\n    updateChannelMessage(id: $updateChannelMessageId, data: $data) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannelMessage($deleteChannelMessageId: String!) {\n    deleteChannelMessage(id: $deleteChannelMessageId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannelMessage($deleteChannelMessageId: String!) {\n    deleteChannelMessage(id: $deleteChannelMessageId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannelMember($data: CreateChannelMemberInput!) {\n    createChannelMember(data: $data) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannelMember($data: CreateChannelMemberInput!) {\n    createChannelMember(data: $data) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannelMember($userId: String!, $channelId: String!) {\n    deleteChannelMember(userId: $userId, channelId: $channelId) {\n      userId\n      channelId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannelMember($userId: String!, $channelId: String!) {\n    deleteChannelMember(userId: $userId, channelId: $channelId) {\n      userId\n      channelId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MuteChannelMember($channelId: String!, $userId: String!) {\n    muteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation MuteChannelMember($channelId: String!, $userId: String!) {\n    muteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnmuteChannelMember($channelId: String!, $userId: String!) {\n    unmuteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation UnmuteChannelMember($channelId: String!, $userId: String!) {\n    unmuteChannelMember(channelId: $channelId, userId: $userId) {\n      channelId\n      muted\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannelBlocked($data: CreateChannelBlockedInput!) {\n    createChannelBlocked(data: $data) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannelBlocked($data: CreateChannelBlockedInput!) {\n    createChannelBlocked(data: $data) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannelBlocked($channelId: String!, $userId: String!) {\n    deleteChannelBlocked(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannelBlocked($channelId: String!, $userId: String!) {\n    deleteChannelBlocked(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannelInvited($data: CreateChannelInvitedInput!) {\n    createChannelInvited(data: $data) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannelInvited($data: CreateChannelInvitedInput!) {\n    createChannelInvited(data: $data) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannelInvited($channelId: String!, $userId: String!) {\n    deleteChannelInvited(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannelInvited($channelId: String!, $userId: String!) {\n    deleteChannelInvited(channelId: $channelId, userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    makeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation MakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    makeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnmakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    unmakeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation UnmakeChannelMemberAdmin($channelId: String!, $userId: String!) {\n    unmakeChannelMemberAdmin(channelId: $channelId, userId: $userId) {\n      userId\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllPrivateMessageWith($receiverId: String!, $senderId: String!) {\n    findAllPrivateMessageWith(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      senderId\n      receiverId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FindAllPrivateMessageWith($receiverId: String!, $senderId: String!) {\n    findAllPrivateMessageWith(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      senderId\n      receiverId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllChannelMessageInChannel($channelId: String!) {\n    findAllChannelMessageInChannel(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FindAllChannelMessageInChannel($channelId: String!) {\n    findAllChannelMessageInChannel(channelId: $channelId) {\n      channelId\n      content\n      createdAt\n      id\n      senderId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneChannelByName($name: String!) {\n    findOneChannelByName(name: $name) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"): (typeof documents)["\n  query FindOneChannelByName($name: String!) {\n    findOneChannelByName(name: $name) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneUserStatus($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      status\n      id\n    }\n  }\n"): (typeof documents)["\n  query FindOneUserStatus($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      status\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindLastUserPresenceByUserId($findLastUserPresenceByUserIdId: String!) {\n    findLastUserPresenceByUserId(id: $findLastUserPresenceByUserIdId) {\n      userId\n      disconnectedAt\n      connectedAt\n    }\n  }\n"): (typeof documents)["\n  query FindLastUserPresenceByUserId($findLastUserPresenceByUserIdId: String!) {\n    findLastUserPresenceByUserId(id: $findLastUserPresenceByUserIdId) {\n      userId\n      disconnectedAt\n      connectedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PongInvitationSubcription($userId: String!) {\n    pongInvitationSubcription(userId: $userId) {\n      gameId\n      gameType\n      senderNickname\n    }\n  }\n"): (typeof documents)["\n  subscription PongInvitationSubcription($userId: String!) {\n    pongInvitationSubcription(userId: $userId) {\n      gameId\n      gameType\n      senderNickname\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendPongInvitation(\n    $gameType: EGameType!\n    $receiverNickname: String!\n    $senderId: String!\n    $senderNickname: String!\n  ) {\n    sendPongInvitation(\n      gameType: $gameType\n      receiverNickname: $receiverNickname\n      senderId: $senderId\n      senderNickname: $senderNickname\n    )\n  }\n"): (typeof documents)["\n  mutation SendPongInvitation(\n    $gameType: EGameType!\n    $receiverNickname: String!\n    $senderId: String!\n    $senderNickname: String!\n  ) {\n    sendPongInvitation(\n      gameType: $gameType\n      receiverNickname: $receiverNickname\n      senderId: $senderId\n      senderNickname: $senderNickname\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PongData($gameId: String!) {\n    pongData(gameId: $gameId) {\n      ball {\n        hPos\n        radius\n        vPos\n      }\n      elapsedTime\n      p1racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      p2racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      player1 {\n        nickname\n        presence\n        score\n      }\n      player2 {\n        nickname\n        presence\n        score\n      }\n      playfield {\n        height\n        width\n      }\n      type\n      winner\n      message\n    }\n  }\n"): (typeof documents)["\n  subscription PongData($gameId: String!) {\n    pongData(gameId: $gameId) {\n      ball {\n        hPos\n        radius\n        vPos\n      }\n      elapsedTime\n      p1racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      p2racket {\n        hPos\n        height\n        vPos\n        width\n      }\n      player1 {\n        nickname\n        presence\n        score\n      }\n      player2 {\n        nickname\n        presence\n        score\n      }\n      playfield {\n        height\n        width\n      }\n      type\n      winner\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readyForGame($gameId: String!, $playerId: String!) {\n    readyForGame(gameId: $gameId, playerId: $playerId)\n  }\n"): (typeof documents)["\n  mutation readyForGame($gameId: String!, $playerId: String!) {\n    readyForGame(gameId: $gameId, playerId: $playerId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePlayerInputs(\n    $controls: ControlsInput!\n    $gameId: String!\n    $playerId: String!\n  ) {\n    updatePlayerInputs(\n      controls: $controls\n      gameId: $gameId\n      playerId: $playerId\n    )\n  }\n"): (typeof documents)["\n  mutation UpdatePlayerInputs(\n    $controls: ControlsInput!\n    $gameId: String!\n    $playerId: String!\n  ) {\n    updatePlayerInputs(\n      controls: $controls\n      gameId: $gameId\n      playerId: $playerId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QuitGame($gameId: String!, $playerId: String!) {\n    quitGame(gameId: $gameId, playerId: $playerId)\n  }\n"): (typeof documents)["\n  mutation QuitGame($gameId: String!, $playerId: String!) {\n    quitGame(gameId: $gameId, playerId: $playerId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsGameValid($gameId: String!, $userId: String!) {\n    isGameValid(gameId: $gameId, userId: $userId)\n  }\n"): (typeof documents)["\n  query IsGameValid($gameId: String!, $userId: String!) {\n    isGameValid(gameId: $gameId, userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUserReadyInGame($gameId: String!, $userId: String!) {\n    isUserReadyInGame(gameId: $gameId, userId: $userId)\n  }\n"): (typeof documents)["\n  query IsUserReadyInGame($gameId: String!, $userId: String!) {\n    isUserReadyInGame(gameId: $gameId, userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindGameStatClassic($findGameStatClassicId: String!) {\n    findGameStatClassic(id: $findGameStatClassicId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n"): (typeof documents)["\n  query FindGameStatClassic($findGameStatClassicId: String!) {\n    findGameStatClassic(id: $findGameStatClassicId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindGameStatSpecial($findGameStatSpecialId: String!) {\n    findGameStatSpecial(id: $findGameStatSpecialId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n"): (typeof documents)["\n  query FindGameStatSpecial($findGameStatSpecialId: String!) {\n    findGameStatSpecial(id: $findGameStatSpecialId) {\n      createdAt\n      id\n      loserId\n      scoreLoser\n      scoreWinner\n      timePlayed\n      type\n      winnerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindBestUsers {\n    findBestUsers {\n      avatarUrl\n      username\n      level\n    }\n  }\n"): (typeof documents)["\n  query FindBestUsers {\n    findBestUsers {\n      avatarUrl\n      username\n      level\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription matchmakingNotification($playerId: String!) {\n    matchmakingNotification(playerId: $playerId)\n  }\n"): (typeof documents)["\n  subscription matchmakingNotification($playerId: String!) {\n    matchmakingNotification(playerId: $playerId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPlayerToMatchmakingQueue(\n    $gameType: EGameType!\n    $nickname: String!\n    $playerId: String!\n  ) {\n    addPlayerToMatchmakingQueue(\n      gameType: $gameType\n      nickname: $nickname\n      playerId: $playerId\n    )\n  }\n"): (typeof documents)["\n  mutation AddPlayerToMatchmakingQueue(\n    $gameType: EGameType!\n    $nickname: String!\n    $playerId: String!\n  ) {\n    addPlayerToMatchmakingQueue(\n      gameType: $gameType\n      nickname: $nickname\n      playerId: $playerId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePlayerFromMatchmakingQueue($playerId: String!) {\n    removePlayerFromMatchmakingQueue(playerId: $playerId)\n  }\n"): (typeof documents)["\n  mutation RemovePlayerFromMatchmakingQueue($playerId: String!) {\n    removePlayerFromMatchmakingQueue(playerId: $playerId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUserInGameQueue($userId: String!) {\n    isUserInGameQueue(userId: $userId)\n  }\n"): (typeof documents)["\n  query IsUserInGameQueue($userId: String!) {\n    isUserInGameQueue(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RelationBlockedCreation($userId: String!) {\n    relationBlockedCreation(userId: $userId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"): (typeof documents)["\n  subscription RelationBlockedCreation($userId: String!) {\n    relationBlockedCreation(userId: $userId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RelationFriendDeleted($userId: String!) {\n    relationFriendDeleted(userId: $userId) {\n      userAId\n      userBId\n    }\n  }\n"): (typeof documents)["\n  subscription RelationFriendDeleted($userId: String!) {\n    relationFriendDeleted(userId: $userId) {\n      userAId\n      userBId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RelationRequestCreation($userId: String!) {\n    relationRequestCreation(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"): (typeof documents)["\n  subscription RelationRequestCreation($userId: String!) {\n    relationRequestCreation(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RelationRequestDeleted($userId: String!) {\n    relationRequestDeleted(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"): (typeof documents)["\n  subscription RelationRequestDeleted($userId: String!) {\n    relationRequestDeleted(userId: $userId) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelEdition($channelEditionId: String!) {\n    channelEdition(id: $channelEditionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelEdition($channelEditionId: String!) {\n    channelEdition(id: $channelEditionId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelDeletion($channelDeletionId: String!) {\n    channelDeletion(id: $channelDeletionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelDeletion($channelDeletionId: String!) {\n    channelDeletion(id: $channelDeletionId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMemberCreation($channelMemberCreationId: String!) {\n    channelMemberCreation(id: $channelMemberCreationId) {\n      userId\n      channelId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMemberCreation($channelMemberCreationId: String!) {\n    channelMemberCreation(id: $channelMemberCreationId) {\n      userId\n      channelId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMemberEdition($channelMemberEditionId: String!) {\n    channelMemberEdition(id: $channelMemberEditionId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMemberEdition($channelMemberEditionId: String!) {\n    channelMemberEdition(id: $channelMemberEditionId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelMemberDeletion($channelMemberDeletionId: String!) {\n    channelMemberDeletion(id: $channelMemberDeletionId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelMemberDeletion($channelMemberDeletionId: String!) {\n    channelMemberDeletion(id: $channelMemberDeletionId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelInvitedCreation($channelInvitedCreationId: String!) {\n    channelInvitedCreation(id: $channelInvitedCreationId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelInvitedCreation($channelInvitedCreationId: String!) {\n    channelInvitedCreation(id: $channelInvitedCreationId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelInvitedDeletion($channelInvitedDeletionId: String!) {\n    channelInvitedDeletion(id: $channelInvitedDeletionId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelInvitedDeletion($channelInvitedDeletionId: String!) {\n    channelInvitedDeletion(id: $channelInvitedDeletionId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelBlockedCreation($channelBlockedCreationId: String!) {\n    channelBlockedCreation(id: $channelBlockedCreationId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelBlockedCreation($channelBlockedCreationId: String!) {\n    channelBlockedCreation(id: $channelBlockedCreationId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChannelBlockedDeletion($channelBlockedDeletionId: String!) {\n    channelBlockedDeletion(id: $channelBlockedDeletionId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription ChannelBlockedDeletion($channelBlockedDeletionId: String!) {\n    channelBlockedDeletion(id: $channelBlockedDeletionId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRelationBlocked($userAId: String!, $userBId: String!) {\n    deleteRelationBlocked(userAId: $userAId, userBId: $userBId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRelationBlocked($userAId: String!, $userBId: String!) {\n    deleteRelationBlocked(userAId: $userAId, userBId: $userBId) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRelationFriend($userAId: String!, $userBId: String!) {\n    deleteRelationFriend(userAId: $userAId, userBId: $userBId) {\n      userAId\n      userBId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRelationFriend($userAId: String!, $userBId: String!) {\n    deleteRelationFriend(userAId: $userAId, userBId: $userBId) {\n      userAId\n      userBId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRelationBlocked($data: RelationBlockedInput!) {\n    createRelationBlocked(data: $data) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRelationBlocked($data: RelationBlockedInput!) {\n    createRelationBlocked(data: $data) {\n      userBlockedId\n      userBlockingId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRelationRequests($data: RelationRequestsInput!) {\n    createRelationRequests(data: $data) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRelationRequests($data: RelationRequestsInput!) {\n    createRelationRequests(data: $data) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRelationRequests(\n    $userReceiverId: String!\n    $userSenderId: String!\n  ) {\n    deleteRelationRequests(\n      userReceiverId: $userReceiverId\n      userSenderId: $userSenderId\n    ) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRelationRequests(\n    $userReceiverId: String!\n    $userSenderId: String!\n  ) {\n    deleteRelationRequests(\n      userReceiverId: $userReceiverId\n      userSenderId: $userSenderId\n    ) {\n      userReceiverId\n      userSenderId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneUserByUsername($username: String!) {\n    findOneUserByUsername(username: $username) {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query FindOneUserByUsername($username: String!) {\n    findOneUserByUsername(username: $username) {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneUser($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      avatarUrl\n      validation2fa\n      createdAt\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"): (typeof documents)["\n  query FindOneUser($findOneUserId: String!) {\n    findOneUser(id: $findOneUserId) {\n      avatarUrl\n      validation2fa\n      createdAt\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      validation2fa\n      id\n      languages\n      level\n      mail\n      status\n      username\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n"): (typeof documents)["\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationRequestsSent($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n"): (typeof documents)["\n  query FindAllRelationRequestsSent($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationRequestsReceived($userReceiverId: String!) {\n    findAllRelationRequestsReceived(userReceiverId: $userReceiverId)\n  }\n"): (typeof documents)["\n  query FindAllRelationRequestsReceived($userReceiverId: String!) {\n    findAllRelationRequestsReceived(userReceiverId: $userReceiverId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n"): (typeof documents)["\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllChannelMemberOfUser($userId: String!) {\n    findAllChannelMemberOfUser(userId: $userId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"): (typeof documents)["\n  query FindAllChannelMemberOfUser($userId: String!) {\n    findAllChannelMemberOfUser(userId: $userId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllChannelInvitedOfUser($userId: String!) {\n    findAllChannelInvitedOfUser(userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  query FindAllChannelInvitedOfUser($userId: String!) {\n    findAllChannelInvitedOfUser(userId: $userId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindChannelByChannelIds($channelIds: [String!]!) {\n    findChannelByChannelIds(channelIds: $channelIds) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"): (typeof documents)["\n  query FindChannelByChannelIds($channelIds: [String!]!) {\n    findChannelByChannelIds(channelIds: $channelIds) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllChannelMemberInChannel($channelId: String!) {\n    findAllChannelMemberInChannel(channelId: $channelId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"): (typeof documents)["\n  query FindAllChannelMemberInChannel($channelId: String!) {\n    findAllChannelMemberInChannel(channelId: $channelId) {\n      avatarUrl\n      channelId\n      createdAt\n      muted\n      nickname\n      type\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllChannelInvitedInChannel($channelId: String!) {\n    findAllChannelInvitedInChannel(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  query FindAllChannelInvitedInChannel($channelId: String!) {\n    findAllChannelInvitedInChannel(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllInChannelBlocked($channelId: String!) {\n    findAllInChannelBlocked(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n"): (typeof documents)["\n  query FindAllInChannelBlocked($channelId: String!) {\n    findAllInChannelBlocked(channelId: $channelId) {\n      channelId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneChannel($findOneChannelId: String!) {\n    findOneChannel(id: $findOneChannelId) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"): (typeof documents)["\n  query FindOneChannel($findOneChannelId: String!) {\n    findOneChannel(id: $findOneChannelId) {\n      avatarUrl\n      createdAt\n      id\n      maxUsers\n      name\n      ownerId\n      password\n      topic\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n"): (typeof documents)["\n  query Query($username: String!) {\n    isUserUsernameUsed(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {\n    updateUser(id: $id, data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {\n    updateUser(id: $id, data: $data) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;