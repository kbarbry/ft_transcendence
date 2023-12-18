/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  maxUsers: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  type: EChannelType;
};

export type ChannelBlocked = {
  __typename?: 'ChannelBlocked';
  channelId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type ChannelInvited = {
  __typename?: 'ChannelInvited';
  channelId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  channelId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  muted: Scalars['Boolean']['output'];
  nickname: Scalars['String']['output'];
  type: EMemberType;
  userId: Scalars['String']['output'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channelId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ControlsInput = {
  Down_Key: Scalars['Boolean']['input'];
  S_Key: Scalars['Boolean']['input'];
  Up_Key: Scalars['Boolean']['input'];
  Z_Key: Scalars['Boolean']['input'];
};

export type CreateChannelBlockedInput = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateChannelInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  maxUsers?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EChannelType>;
};

export type CreateChannelInvitedInput = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateChannelMemberInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  channelId: Scalars['String']['input'];
  channelPassword?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateChannelMessageInput = {
  channelId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type CreateGameStatInput = {
  loserId: Scalars['String']['input'];
  scoreLoser: Scalars['Int']['input'];
  scoreWinner: Scalars['Int']['input'];
  timePlayed: Scalars['Int']['input'];
  type: EGameType;
  winnerId: Scalars['String']['input'];
};

export type CreatePrivateMessageInput = {
  content: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export enum EChannelType {
  Protected = 'Protected',
  Public = 'Public'
}

export enum ECreationType {
  Friend = 'friend',
  Request = 'request'
}

export enum EGameType {
  Classic = 'Classic',
  Special = 'Special'
}

export enum ELanguage {
  English = 'English',
  French = 'French',
  Spanish = 'Spanish'
}

export enum EMemberType {
  Admin = 'Admin',
  Member = 'Member'
}

export enum EStatus {
  DoNotDisturb = 'DoNotDisturb',
  Idle = 'Idle',
  Invisble = 'Invisble',
  Online = 'Online'
}

export type GameInvitation = {
  __typename?: 'GameInvitation';
  gameId: Scalars['String']['output'];
  gameType: EGameType;
  senderNickname: Scalars['String']['output'];
};

export type GameStat = {
  __typename?: 'GameStat';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  loserId: Scalars['String']['output'];
  scoreLoser: Scalars['Int']['output'];
  scoreWinner: Scalars['Int']['output'];
  timePlayed: Scalars['Int']['output'];
  type: EGameType;
  winnerId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlayerToMatchmakingQueue: Scalars['Boolean']['output'];
  createChannel: Channel;
  createChannelBlocked: ChannelBlocked;
  createChannelInvited: ChannelInvited;
  createChannelMember: ChannelMember;
  createChannelMessage: ChannelMessage;
  createGameStat: GameStat;
  createPrivateMessage: PrivateMessage;
  createRelationBlocked: RelationBlocked;
  createRelationRequests: RelationRequests;
  createUserPresence: UserPresence;
  deleteChannel: Channel;
  deleteChannelBlocked: ChannelBlocked;
  deleteChannelInvited: ChannelInvited;
  deleteChannelMember: ChannelMember;
  deleteChannelMessage: ChannelMessage;
  deletePrivateMessage: PrivateMessage;
  deleteRelationBlocked: RelationBlocked;
  deleteRelationFriend: RelationFriend;
  deleteRelationRequests: RelationRequests;
  deleteUser: User;
  disconnectedUserPresence: UserPresence;
  makeChannelMemberAdmin: ChannelMember;
  muteChannelMember: ChannelMember;
  quitGame: Scalars['Boolean']['output'];
  readyForGame: Scalars['Boolean']['output'];
  removePlayerFromMatchmakingQueue: Scalars['Boolean']['output'];
  sendPongInvitation?: Maybe<Scalars['String']['output']>;
  unmakeChannelMemberAdmin: ChannelMember;
  unmuteChannelMember: ChannelMember;
  updateChannel: Channel;
  updateChannelMember: ChannelMember;
  updateChannelMessage: ChannelMessage;
  updateChannelOwner: Channel;
  updatePlayerInputs: Scalars['Boolean']['output'];
  updatePrivateMessage: PrivateMessage;
  updateUser: User;
};


export type MutationAddPlayerToMatchmakingQueueArgs = {
  gameType: EGameType;
  nickname: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};


export type MutationCreateChannelArgs = {
  data: CreateChannelInput;
};


export type MutationCreateChannelBlockedArgs = {
  data: CreateChannelBlockedInput;
};


export type MutationCreateChannelInvitedArgs = {
  data: CreateChannelInvitedInput;
};


export type MutationCreateChannelMemberArgs = {
  data: CreateChannelMemberInput;
};


export type MutationCreateChannelMessageArgs = {
  data: CreateChannelMessageInput;
};


export type MutationCreateGameStatArgs = {
  data: CreateGameStatInput;
};


export type MutationCreatePrivateMessageArgs = {
  data: CreatePrivateMessageInput;
};


export type MutationCreateRelationBlockedArgs = {
  data: RelationBlockedInput;
};


export type MutationCreateRelationRequestsArgs = {
  data: RelationRequestsInput;
};


export type MutationCreateUserPresenceArgs = {
  data: UserPresenceCreateInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteChannelBlockedArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteChannelInvitedArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteChannelMemberArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteChannelMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePrivateMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRelationBlockedArgs = {
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
};


export type MutationDeleteRelationFriendArgs = {
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
};


export type MutationDeleteRelationRequestsArgs = {
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationDisconnectedUserPresenceArgs = {
  id: Scalars['String']['input'];
};


export type MutationMakeChannelMemberAdminArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationMuteChannelMemberArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationQuitGameArgs = {
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};


export type MutationReadyForGameArgs = {
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};


export type MutationRemovePlayerFromMatchmakingQueueArgs = {
  playerId: Scalars['String']['input'];
};


export type MutationSendPongInvitationArgs = {
  gameType: EGameType;
  receiverNickname: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  senderNickname: Scalars['String']['input'];
};


export type MutationUnmakeChannelMemberAdminArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUnmuteChannelMemberArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateChannelArgs = {
  data: UpdateChannelInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateChannelMemberArgs = {
  channelId: Scalars['String']['input'];
  data: UpdateChannelMemberInput;
  userId: Scalars['String']['input'];
};


export type MutationUpdateChannelMessageArgs = {
  data: UpdateChannelMessageInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateChannelOwnerArgs = {
  data: UpdateChannelOwnerIdInput;
  id: Scalars['String']['input'];
};


export type MutationUpdatePlayerInputsArgs = {
  controls: ControlsInput;
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};


export type MutationUpdatePrivateMessageArgs = {
  data: UpdatePrivateMessageInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String']['input'];
};

export type PongGame = {
  __typename?: 'PongGame';
  ball: Ball;
  elapsedTime: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  p1racket: Racket;
  p2racket: Racket;
  player1?: Maybe<PongPlayer>;
  player2?: Maybe<PongPlayer>;
  playfield: Playfield;
  type: EGameType;
  winner?: Maybe<Scalars['String']['output']>;
};

export type PongPlayer = {
  __typename?: 'PongPlayer';
  nickname: Scalars['String']['output'];
  presence: Scalars['Boolean']['output'];
  score: Scalars['Int']['output'];
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  receiverId: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findAllChannelBlockedOfUser: Array<ChannelBlocked>;
  findAllChannelInvitedInChannel: Array<ChannelInvited>;
  findAllChannelInvitedOfUser: Array<ChannelInvited>;
  findAllChannelMemberInChannel: Array<ChannelMember>;
  findAllChannelMemberOfUser: Array<ChannelMember>;
  findAllChannelMessageInChannel: Array<ChannelMessage>;
  findAllChannelMessageInChannelByUser: Array<ChannelMessage>;
  findAllChannelMessageThatContain: Array<ChannelMessage>;
  findAllChannelOfOwner: Array<Channel>;
  findAllChannelThatContain: Array<Channel>;
  findAllGameStat: Array<GameStat>;
  findAllInChannelBlocked: Array<ChannelBlocked>;
  findAllPrivateMessageContain: Array<PrivateMessage>;
  findAllPrivateMessageWith: Array<PrivateMessage>;
  findAllRelationBlockedByUser: Array<Scalars['String']['output']>;
  findAllRelationFriend: Array<Scalars['String']['output']>;
  findAllRelationRequestsReceived: Array<Scalars['String']['output']>;
  findAllRelationRequestsSent: Array<Scalars['String']['output']>;
  findAllUserPresenceByUserId: Array<UserPresence>;
  findBestUsers: Array<User>;
  findChannelByChannelIds: Array<Channel>;
  findChannelOwner: Scalars['String']['output'];
  findGameStatClassic: Array<GameStat>;
  findGameStatLose: Array<GameStat>;
  findGameStatSpecial: Array<GameStat>;
  findGameStatWin: Array<GameStat>;
  findLastUserPresenceByUserId: UserPresence;
  findOneChannel: Channel;
  findOneChannelBlocked: ChannelBlocked;
  findOneChannelByName: Channel;
  findOneChannelInvited: ChannelInvited;
  findOneChannelMember: ChannelMember;
  findOneChannelMessage: ChannelMessage;
  findOneGameStat: GameStat;
  findOnePrivateMessage: PrivateMessage;
  findOneRelationRequests: RelationRequests;
  findOneUser: User;
  findOneUserByContext: User;
  findOneUserByUsername: User;
  findOneUserPresence: UserPresence;
  findOneUserbyMail: User;
  findUsersByUserIds: Array<User>;
  isGameValid: Scalars['Boolean']['output'];
  isRelationBlocked: Scalars['Boolean']['output'];
  isRelationFriendExist: Scalars['Boolean']['output'];
  isRelationRequestsRequested: Scalars['Boolean']['output'];
  isUserInGameQueue: Scalars['Boolean']['output'];
  isUserMailUsed: Scalars['Boolean']['output'];
  isUserPresenceConnected: Scalars['Boolean']['output'];
  isUserReadyInGame: Scalars['Boolean']['output'];
  isUserUsernameUsed: Scalars['Boolean']['output'];
};


export type QueryFindAllChannelBlockedOfUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFindAllChannelInvitedInChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindAllChannelInvitedOfUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFindAllChannelMemberInChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindAllChannelMemberOfUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFindAllChannelMessageInChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindAllChannelMessageInChannelByUserArgs = {
  channelId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type QueryFindAllChannelMessageThatContainArgs = {
  channelId: Scalars['String']['input'];
  needle: Scalars['String']['input'];
};


export type QueryFindAllChannelOfOwnerArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFindAllChannelThatContainArgs = {
  needle: Scalars['String']['input'];
};


export type QueryFindAllGameStatArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAllInChannelBlockedArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindAllPrivateMessageContainArgs = {
  needle: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type QueryFindAllPrivateMessageWithArgs = {
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type QueryFindAllRelationBlockedByUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAllRelationFriendArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAllRelationRequestsReceivedArgs = {
  userReceiverId: Scalars['String']['input'];
};


export type QueryFindAllRelationRequestsSentArgs = {
  userSenderId: Scalars['String']['input'];
};


export type QueryFindAllUserPresenceByUserIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindChannelByChannelIdsArgs = {
  channelIds: Array<Scalars['String']['input']>;
};


export type QueryFindChannelOwnerArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindGameStatClassicArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindGameStatLoseArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindGameStatSpecialArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindGameStatWinArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindLastUserPresenceByUserIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneChannelArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneChannelBlockedArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryFindOneChannelByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindOneChannelInvitedArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryFindOneChannelMemberArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryFindOneChannelMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneGameStatArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOnePrivateMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneRelationRequestsArgs = {
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindOneUserPresenceArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneUserbyMailArgs = {
  mail: Scalars['String']['input'];
};


export type QueryFindUsersByUserIdsArgs = {
  userIds: Array<Scalars['String']['input']>;
};


export type QueryIsGameValidArgs = {
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsRelationBlockedArgs = {
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
};


export type QueryIsRelationFriendExistArgs = {
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
};


export type QueryIsRelationRequestsRequestedArgs = {
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
};


export type QueryIsUserInGameQueueArgs = {
  userId: Scalars['String']['input'];
};


export type QueryIsUserMailUsedArgs = {
  mail: Scalars['String']['input'];
};


export type QueryIsUserPresenceConnectedArgs = {
  id: Scalars['String']['input'];
};


export type QueryIsUserReadyInGameArgs = {
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsUserUsernameUsedArgs = {
  username: Scalars['String']['input'];
};

export type RelationBlocked = {
  __typename?: 'RelationBlocked';
  userBlockedId: Scalars['String']['output'];
  userBlockingId: Scalars['String']['output'];
};

export type RelationBlockedInput = {
  userBlockedId: Scalars['String']['input'];
  userBlockingId: Scalars['String']['input'];
};

export type RelationFriend = {
  __typename?: 'RelationFriend';
  userAId: Scalars['String']['output'];
  userBId: Scalars['String']['output'];
};

export type RelationRequests = {
  __typename?: 'RelationRequests';
  type?: Maybe<ECreationType>;
  userReceiverId: Scalars['String']['output'];
  userSenderId: Scalars['String']['output'];
};

export type RelationRequestsInput = {
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelBlockedCreation: ChannelBlocked;
  channelBlockedDeletion: ChannelBlocked;
  channelDeletion: Channel;
  channelEdition: Channel;
  channelInvitedCreation: ChannelInvited;
  channelInvitedDeletion: ChannelInvited;
  channelMemberCreation: ChannelMember;
  channelMemberDeletion: ChannelMember;
  channelMemberEdition: ChannelMember;
  channelMessageCreation: ChannelMessage;
  channelMessageDeletion: ChannelMessage;
  channelMessageEdition: ChannelMessage;
  matchmakingNotification: Scalars['String']['output'];
  pongData: PongGame;
  pongInvitationSubcription: GameInvitation;
  privateMessageCreation: PrivateMessage;
  privateMessageDeletion: PrivateMessage;
  privateMessageEdition: PrivateMessage;
  relationBlockedCreation: RelationBlocked;
  relationFriendDeleted: RelationFriend;
  relationRequestCreation: RelationRequests;
  relationRequestDeleted: RelationRequests;
};


export type SubscriptionChannelBlockedCreationArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelBlockedDeletionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelDeletionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelEditionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelInvitedCreationArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelInvitedDeletionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelMemberCreationArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelMemberDeletionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelMemberEditionArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionChannelMessageCreationArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionChannelMessageDeletionArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionChannelMessageEditionArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionMatchmakingNotificationArgs = {
  playerId: Scalars['String']['input'];
};


export type SubscriptionPongDataArgs = {
  gameId: Scalars['String']['input'];
};


export type SubscriptionPongInvitationSubcriptionArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionPrivateMessageCreationArgs = {
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type SubscriptionPrivateMessageDeletionArgs = {
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type SubscriptionPrivateMessageEditionArgs = {
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type SubscriptionRelationBlockedCreationArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionRelationFriendDeletedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionRelationRequestCreationArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionRelationRequestDeletedArgs = {
  userId: Scalars['String']['input'];
};

export type UpdateChannelInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  maxUsers?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EChannelType>;
};

export type UpdateChannelMemberInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  channelPassword?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChannelMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChannelOwnerIdInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePrivateMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  doubleA?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<ELanguage>;
  level?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<EStatus>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  languages: ELanguage;
  level: Scalars['Float']['output'];
  mail: Scalars['String']['output'];
  status: EStatus;
  username: Scalars['String']['output'];
  validation2fa: Scalars['Boolean']['output'];
};

export type UserPresence = {
  __typename?: 'UserPresence';
  connectedAt: Scalars['DateTime']['output'];
  disconnectedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserPresenceCreateInput = {
  userId: Scalars['String']['input'];
};

export type Ball = {
  __typename?: 'ball';
  hPos: Scalars['Float']['output'];
  radius: Scalars['Int']['output'];
  vPos: Scalars['Float']['output'];
};

export type Playfield = {
  __typename?: 'playfield';
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type Racket = {
  __typename?: 'racket';
  hPos: Scalars['Float']['output'];
  height: Scalars['Int']['output'];
  vPos: Scalars['Float']['output'];
  width: Scalars['Int']['output'];
};

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', username: string, mail: string, id: string, validation2fa: boolean } };

export type IsUserUsernameUsedQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUserUsernameUsedQuery = { __typename?: 'Query', isUserUsernameUsed: boolean };

export type IsUserMailUsedQueryVariables = Exact<{
  mail: Scalars['String']['input'];
}>;


export type IsUserMailUsedQuery = { __typename?: 'Query', isUserMailUsed: boolean };

export type GetIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', id: string, validation2fa: boolean } };

export type PrivateMessageCreationSubscriptionVariables = Exact<{
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type PrivateMessageCreationSubscription = { __typename?: 'Subscription', privateMessageCreation: { __typename?: 'PrivateMessage', content: string, createdAt: any, id: string, receiverId: string, senderId: string, updatedAt?: any | null } };

export type PrivateMessageEditionSubscriptionVariables = Exact<{
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type PrivateMessageEditionSubscription = { __typename?: 'Subscription', privateMessageEdition: { __typename?: 'PrivateMessage', content: string, createdAt: any, id: string, receiverId: string, senderId: string, updatedAt?: any | null } };

export type PrivateMessageDeletionSubscriptionVariables = Exact<{
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type PrivateMessageDeletionSubscription = { __typename?: 'Subscription', privateMessageDeletion: { __typename?: 'PrivateMessage', content: string, id: string, receiverId: string, senderId: string, updatedAt?: any | null, createdAt: any } };

export type ChannelMessageCreationSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ChannelMessageCreationSubscription = { __typename?: 'Subscription', channelMessageCreation: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type ChannelMessageEditionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ChannelMessageEditionSubscription = { __typename?: 'Subscription', channelMessageEdition: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type ChannelMessageDeletionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ChannelMessageDeletionSubscription = { __typename?: 'Subscription', channelMessageDeletion: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type CreatePrivateMessageMutationVariables = Exact<{
  data: CreatePrivateMessageInput;
}>;


export type CreatePrivateMessageMutation = { __typename?: 'Mutation', createPrivateMessage: { __typename?: 'PrivateMessage', content: string, id: string, receiverId: string, senderId: string, updatedAt?: any | null, createdAt: any } };

export type UpdatePrivateMessageMutationVariables = Exact<{
  data: UpdatePrivateMessageInput;
  updatePrivateMessageId: Scalars['String']['input'];
}>;


export type UpdatePrivateMessageMutation = { __typename?: 'Mutation', updatePrivateMessage: { __typename?: 'PrivateMessage', content: string, createdAt: any, id: string, receiverId: string, senderId: string, updatedAt?: any | null } };

export type DeletePrivateMessageMutationVariables = Exact<{
  deletePrivateMessageId: Scalars['String']['input'];
}>;


export type DeletePrivateMessageMutation = { __typename?: 'Mutation', deletePrivateMessage: { __typename?: 'PrivateMessage', id: string } };

export type CreateChannelMutationVariables = Exact<{
  data: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: string } };

export type DeleteChannelMutationVariables = Exact<{
  deleteChannelId: Scalars['String']['input'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: { __typename?: 'Channel', id: string } };

export type CreateChannelMessageMutationVariables = Exact<{
  data: CreateChannelMessageInput;
}>;


export type CreateChannelMessageMutation = { __typename?: 'Mutation', createChannelMessage: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type UpdateChannelMessageMutationVariables = Exact<{
  updateChannelMessageId: Scalars['String']['input'];
  data: UpdateChannelMessageInput;
}>;


export type UpdateChannelMessageMutation = { __typename?: 'Mutation', updateChannelMessage: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type DeleteChannelMessageMutationVariables = Exact<{
  deleteChannelMessageId: Scalars['String']['input'];
}>;


export type DeleteChannelMessageMutation = { __typename?: 'Mutation', deleteChannelMessage: { __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null } };

export type CreateChannelMemberMutationVariables = Exact<{
  data: CreateChannelMemberInput;
}>;


export type CreateChannelMemberMutation = { __typename?: 'Mutation', createChannelMember: { __typename?: 'ChannelMember', avatarUrl?: string | null, channelId: string, createdAt: any, muted: boolean, nickname: string, type: EMemberType, userId: string } };

export type DeleteChannelMemberMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  channelId: Scalars['String']['input'];
}>;


export type DeleteChannelMemberMutation = { __typename?: 'Mutation', deleteChannelMember: { __typename?: 'ChannelMember', userId: string, channelId: string } };

export type MuteChannelMemberMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type MuteChannelMemberMutation = { __typename?: 'Mutation', muteChannelMember: { __typename?: 'ChannelMember', channelId: string, muted: boolean, userId: string } };

export type UnmuteChannelMemberMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type UnmuteChannelMemberMutation = { __typename?: 'Mutation', unmuteChannelMember: { __typename?: 'ChannelMember', channelId: string, muted: boolean, userId: string } };

export type CreateChannelBlockedMutationVariables = Exact<{
  data: CreateChannelBlockedInput;
}>;


export type CreateChannelBlockedMutation = { __typename?: 'Mutation', createChannelBlocked: { __typename?: 'ChannelBlocked', channelId: string, userId: string } };

export type DeleteChannelBlockedMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type DeleteChannelBlockedMutation = { __typename?: 'Mutation', deleteChannelBlocked: { __typename?: 'ChannelBlocked', channelId: string, userId: string } };

export type CreateChannelInvitedMutationVariables = Exact<{
  data: CreateChannelInvitedInput;
}>;


export type CreateChannelInvitedMutation = { __typename?: 'Mutation', createChannelInvited: { __typename?: 'ChannelInvited', channelId: string, userId: string } };

export type DeleteChannelInvitedMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type DeleteChannelInvitedMutation = { __typename?: 'Mutation', deleteChannelInvited: { __typename?: 'ChannelInvited', channelId: string, userId: string } };

export type MakeChannelMemberAdminMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type MakeChannelMemberAdminMutation = { __typename?: 'Mutation', makeChannelMemberAdmin: { __typename?: 'ChannelMember', userId: string, type: EMemberType } };

export type UnmakeChannelMemberAdminMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type UnmakeChannelMemberAdminMutation = { __typename?: 'Mutation', unmakeChannelMemberAdmin: { __typename?: 'ChannelMember', userId: string, type: EMemberType } };

export type FindAllPrivateMessageWithQueryVariables = Exact<{
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type FindAllPrivateMessageWithQuery = { __typename?: 'Query', findAllPrivateMessageWith: Array<{ __typename?: 'PrivateMessage', content: string, createdAt: any, id: string, senderId: string, receiverId: string, updatedAt?: any | null }> };

export type FindAllChannelMessageInChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindAllChannelMessageInChannelQuery = { __typename?: 'Query', findAllChannelMessageInChannel: Array<{ __typename?: 'ChannelMessage', channelId: string, content: string, createdAt: any, id: string, senderId: string, updatedAt?: any | null }> };

export type FindOneChannelByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type FindOneChannelByNameQuery = { __typename?: 'Query', findOneChannelByName: { __typename?: 'Channel', avatarUrl?: string | null, createdAt: any, id: string, maxUsers: number, name: string, ownerId: string, password?: string | null, topic?: string | null, type: EChannelType } };

export type FindOneUserStatusQueryVariables = Exact<{
  findOneUserId: Scalars['String']['input'];
}>;


export type FindOneUserStatusQuery = { __typename?: 'Query', findOneUser: { __typename?: 'User', status: EStatus, id: string } };

export type FindLastUserPresenceByUserIdQueryVariables = Exact<{
  findLastUserPresenceByUserIdId: Scalars['String']['input'];
}>;


export type FindLastUserPresenceByUserIdQuery = { __typename?: 'Query', findLastUserPresenceByUserId: { __typename?: 'UserPresence', userId: string, disconnectedAt?: any | null, connectedAt: any } };

export type PongInvitationSubcriptionSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type PongInvitationSubcriptionSubscription = { __typename?: 'Subscription', pongInvitationSubcription: { __typename?: 'GameInvitation', gameId: string, gameType: EGameType, senderNickname: string } };

export type SendPongInvitationMutationVariables = Exact<{
  gameType: EGameType;
  receiverNickname: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  senderNickname: Scalars['String']['input'];
}>;


export type SendPongInvitationMutation = { __typename?: 'Mutation', sendPongInvitation?: string | null };

export type PongDataSubscriptionVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type PongDataSubscription = { __typename?: 'Subscription', pongData: { __typename?: 'PongGame', elapsedTime: number, type: EGameType, winner?: string | null, message?: string | null, ball: { __typename?: 'ball', hPos: number, radius: number, vPos: number }, p1racket: { __typename?: 'racket', hPos: number, height: number, vPos: number, width: number }, p2racket: { __typename?: 'racket', hPos: number, height: number, vPos: number, width: number }, player1?: { __typename?: 'PongPlayer', nickname: string, presence: boolean, score: number } | null, player2?: { __typename?: 'PongPlayer', nickname: string, presence: boolean, score: number } | null, playfield: { __typename?: 'playfield', height: number, width: number } } };

export type ReadyForGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type ReadyForGameMutation = { __typename?: 'Mutation', readyForGame: boolean };

export type UpdatePlayerInputsMutationVariables = Exact<{
  controls: ControlsInput;
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type UpdatePlayerInputsMutation = { __typename?: 'Mutation', updatePlayerInputs: boolean };

export type QuitGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type QuitGameMutation = { __typename?: 'Mutation', quitGame: boolean };

export type IsGameValidQueryVariables = Exact<{
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type IsGameValidQuery = { __typename?: 'Query', isGameValid: boolean };

export type IsUserReadyInGameQueryVariables = Exact<{
  gameId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type IsUserReadyInGameQuery = { __typename?: 'Query', isUserReadyInGame: boolean };

export type FindGameStatClassicQueryVariables = Exact<{
  findGameStatClassicId: Scalars['String']['input'];
}>;


export type FindGameStatClassicQuery = { __typename?: 'Query', findGameStatClassic: Array<{ __typename?: 'GameStat', createdAt: any, id: string, loserId: string, scoreLoser: number, scoreWinner: number, timePlayed: number, type: EGameType, winnerId: string }> };

export type FindGameStatSpecialQueryVariables = Exact<{
  findGameStatSpecialId: Scalars['String']['input'];
}>;


export type FindGameStatSpecialQuery = { __typename?: 'Query', findGameStatSpecial: Array<{ __typename?: 'GameStat', createdAt: any, id: string, loserId: string, scoreLoser: number, scoreWinner: number, timePlayed: number, type: EGameType, winnerId: string }> };

export type FindBestUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindBestUsersQuery = { __typename?: 'Query', findBestUsers: Array<{ __typename?: 'User', avatarUrl?: string | null, username: string, level: number }> };

export type MatchmakingNotificationSubscriptionVariables = Exact<{
  playerId: Scalars['String']['input'];
}>;


export type MatchmakingNotificationSubscription = { __typename?: 'Subscription', matchmakingNotification: string };

export type AddPlayerToMatchmakingQueueMutationVariables = Exact<{
  gameType: EGameType;
  nickname: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type AddPlayerToMatchmakingQueueMutation = { __typename?: 'Mutation', addPlayerToMatchmakingQueue: boolean };

export type RemovePlayerFromMatchmakingQueueMutationVariables = Exact<{
  playerId: Scalars['String']['input'];
}>;


export type RemovePlayerFromMatchmakingQueueMutation = { __typename?: 'Mutation', removePlayerFromMatchmakingQueue: boolean };

export type IsUserInGameQueueQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type IsUserInGameQueueQuery = { __typename?: 'Query', isUserInGameQueue: boolean };

export type RelationBlockedCreationSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RelationBlockedCreationSubscription = { __typename?: 'Subscription', relationBlockedCreation: { __typename?: 'RelationBlocked', userBlockedId: string, userBlockingId: string } };

export type RelationFriendDeletedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RelationFriendDeletedSubscription = { __typename?: 'Subscription', relationFriendDeleted: { __typename?: 'RelationFriend', userAId: string, userBId: string } };

export type RelationRequestCreationSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RelationRequestCreationSubscription = { __typename?: 'Subscription', relationRequestCreation: { __typename?: 'RelationRequests', userReceiverId: string, userSenderId: string } };

export type RelationRequestDeletedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RelationRequestDeletedSubscription = { __typename?: 'Subscription', relationRequestDeleted: { __typename?: 'RelationRequests', userReceiverId: string, userSenderId: string } };

export type ChannelEditionSubscriptionVariables = Exact<{
  channelEditionId: Scalars['String']['input'];
}>;


export type ChannelEditionSubscription = { __typename?: 'Subscription', channelEdition: { __typename?: 'Channel', id: string } };

export type ChannelDeletionSubscriptionVariables = Exact<{
  channelDeletionId: Scalars['String']['input'];
}>;


export type ChannelDeletionSubscription = { __typename?: 'Subscription', channelDeletion: { __typename?: 'Channel', id: string } };

export type ChannelMemberCreationSubscriptionVariables = Exact<{
  channelMemberCreationId: Scalars['String']['input'];
}>;


export type ChannelMemberCreationSubscription = { __typename?: 'Subscription', channelMemberCreation: { __typename?: 'ChannelMember', userId: string, channelId: string } };

export type ChannelMemberEditionSubscriptionVariables = Exact<{
  channelMemberEditionId: Scalars['String']['input'];
}>;


export type ChannelMemberEditionSubscription = { __typename?: 'Subscription', channelMemberEdition: { __typename?: 'ChannelMember', channelId: string, userId: string } };

export type ChannelMemberDeletionSubscriptionVariables = Exact<{
  channelMemberDeletionId: Scalars['String']['input'];
}>;


export type ChannelMemberDeletionSubscription = { __typename?: 'Subscription', channelMemberDeletion: { __typename?: 'ChannelMember', channelId: string, userId: string } };

export type ChannelInvitedCreationSubscriptionVariables = Exact<{
  channelInvitedCreationId: Scalars['String']['input'];
}>;


export type ChannelInvitedCreationSubscription = { __typename?: 'Subscription', channelInvitedCreation: { __typename?: 'ChannelInvited', channelId: string, userId: string } };

export type ChannelInvitedDeletionSubscriptionVariables = Exact<{
  channelInvitedDeletionId: Scalars['String']['input'];
}>;


export type ChannelInvitedDeletionSubscription = { __typename?: 'Subscription', channelInvitedDeletion: { __typename?: 'ChannelInvited', channelId: string, userId: string } };

export type ChannelBlockedCreationSubscriptionVariables = Exact<{
  channelBlockedCreationId: Scalars['String']['input'];
}>;


export type ChannelBlockedCreationSubscription = { __typename?: 'Subscription', channelBlockedCreation: { __typename?: 'ChannelBlocked', channelId: string, userId: string } };

export type ChannelBlockedDeletionSubscriptionVariables = Exact<{
  channelBlockedDeletionId: Scalars['String']['input'];
}>;


export type ChannelBlockedDeletionSubscription = { __typename?: 'Subscription', channelBlockedDeletion: { __typename?: 'ChannelBlocked', channelId: string, userId: string } };

export type DeleteRelationBlockedMutationVariables = Exact<{
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
}>;


export type DeleteRelationBlockedMutation = { __typename?: 'Mutation', deleteRelationBlocked: { __typename?: 'RelationBlocked', userBlockedId: string, userBlockingId: string } };

export type DeleteRelationFriendMutationVariables = Exact<{
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
}>;


export type DeleteRelationFriendMutation = { __typename?: 'Mutation', deleteRelationFriend: { __typename?: 'RelationFriend', userAId: string, userBId: string } };

export type CreateRelationBlockedMutationVariables = Exact<{
  data: RelationBlockedInput;
}>;


export type CreateRelationBlockedMutation = { __typename?: 'Mutation', createRelationBlocked: { __typename?: 'RelationBlocked', userBlockedId: string, userBlockingId: string } };

export type CreateRelationRequestsMutationVariables = Exact<{
  data: RelationRequestsInput;
}>;


export type CreateRelationRequestsMutation = { __typename?: 'Mutation', createRelationRequests: { __typename?: 'RelationRequests', userReceiverId: string, userSenderId: string } };

export type DeleteRelationRequestsMutationVariables = Exact<{
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
}>;


export type DeleteRelationRequestsMutation = { __typename?: 'Mutation', deleteRelationRequests: { __typename?: 'RelationRequests', userReceiverId: string, userSenderId: string } };

export type FindOneUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindOneUserByUsernameQuery = { __typename?: 'Query', findOneUserByUsername: { __typename?: 'User', id: string, username: string } };

export type FindOneUserQueryVariables = Exact<{
  findOneUserId: Scalars['String']['input'];
}>;


export type FindOneUserQuery = { __typename?: 'Query', findOneUser: { __typename?: 'User', avatarUrl?: string | null, validation2fa: boolean, createdAt: any, id: string, languages: ELanguage, level: number, mail: string, status: EStatus, username: string } };

export type FindOneUserByContextQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOneUserByContextQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', avatarUrl?: string | null, validation2fa: boolean, id: string, languages: ELanguage, level: number, mail: string, status: EStatus, username: string, createdAt: any } };

export type FindUsersByUserIdsQueryVariables = Exact<{
  userIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type FindUsersByUserIdsQuery = { __typename?: 'Query', findUsersByUserIds: Array<{ __typename?: 'User', avatarUrl?: string | null, validation2fa: boolean, id: string, languages: ELanguage, level: number, mail: string, status: EStatus, username: string, createdAt: any }> };

export type FindAllRelationFriendQueryVariables = Exact<{
  findAllRelationFriendId: Scalars['String']['input'];
}>;


export type FindAllRelationFriendQuery = { __typename?: 'Query', findAllRelationFriend: Array<string> };

export type FindAllRelationRequestsSentQueryVariables = Exact<{
  userSenderId: Scalars['String']['input'];
}>;


export type FindAllRelationRequestsSentQuery = { __typename?: 'Query', findAllRelationRequestsSent: Array<string> };

export type FindAllRelationRequestsReceivedQueryVariables = Exact<{
  userReceiverId: Scalars['String']['input'];
}>;


export type FindAllRelationRequestsReceivedQuery = { __typename?: 'Query', findAllRelationRequestsReceived: Array<string> };

export type FindAllRelationBlockedQueryVariables = Exact<{
  findAllRelationBlockedByUserId: Scalars['String']['input'];
}>;


export type FindAllRelationBlockedQuery = { __typename?: 'Query', findAllRelationBlockedByUser: Array<string> };

export type FindAllChannelMemberOfUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FindAllChannelMemberOfUserQuery = { __typename?: 'Query', findAllChannelMemberOfUser: Array<{ __typename?: 'ChannelMember', avatarUrl?: string | null, channelId: string, createdAt: any, muted: boolean, nickname: string, type: EMemberType, userId: string }> };

export type FindAllChannelInvitedOfUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FindAllChannelInvitedOfUserQuery = { __typename?: 'Query', findAllChannelInvitedOfUser: Array<{ __typename?: 'ChannelInvited', channelId: string, userId: string }> };

export type FindChannelByChannelIdsQueryVariables = Exact<{
  channelIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type FindChannelByChannelIdsQuery = { __typename?: 'Query', findChannelByChannelIds: Array<{ __typename?: 'Channel', avatarUrl?: string | null, createdAt: any, id: string, maxUsers: number, name: string, ownerId: string, password?: string | null, topic?: string | null, type: EChannelType }> };

export type FindAllChannelMemberInChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindAllChannelMemberInChannelQuery = { __typename?: 'Query', findAllChannelMemberInChannel: Array<{ __typename?: 'ChannelMember', avatarUrl?: string | null, channelId: string, createdAt: any, muted: boolean, nickname: string, type: EMemberType, userId: string }> };

export type FindAllChannelInvitedInChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindAllChannelInvitedInChannelQuery = { __typename?: 'Query', findAllChannelInvitedInChannel: Array<{ __typename?: 'ChannelInvited', channelId: string, userId: string }> };

export type FindAllInChannelBlockedQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindAllInChannelBlockedQuery = { __typename?: 'Query', findAllInChannelBlocked: Array<{ __typename?: 'ChannelBlocked', channelId: string, userId: string }> };

export type FindOneChannelQueryVariables = Exact<{
  findOneChannelId: Scalars['String']['input'];
}>;


export type FindOneChannelQuery = { __typename?: 'Query', findOneChannel: { __typename?: 'Channel', avatarUrl?: string | null, createdAt: any, id: string, maxUsers: number, name: string, ownerId: string, password?: string | null, topic?: string | null, type: EChannelType } };

export type QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', isUserUsernameUsed: boolean };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };


export const IsAuthenticatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsAuthenticated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}}]}}]}}]} as unknown as DocumentNode<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const IsUserUsernameUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserUsernameUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserUsernameUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUserUsernameUsedQuery, IsUserUsernameUsedQueryVariables>;
export const IsUserMailUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserMailUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserMailUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mail"}}}]}]}}]} as unknown as DocumentNode<IsUserMailUsedQuery, IsUserMailUsedQueryVariables>;
export const GetIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}}]}}]}}]} as unknown as DocumentNode<GetIdQuery, GetIdQueryVariables>;
export const PrivateMessageCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageCreationSubscription, PrivateMessageCreationSubscriptionVariables>;
export const PrivateMessageEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageEditionSubscription, PrivateMessageEditionSubscriptionVariables>;
export const PrivateMessageDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageDeletionSubscription, PrivateMessageDeletionSubscriptionVariables>;
export const ChannelMessageCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMessageCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMessageCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ChannelMessageCreationSubscription, ChannelMessageCreationSubscriptionVariables>;
export const ChannelMessageEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMessageEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMessageEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ChannelMessageEditionSubscription, ChannelMessageEditionSubscriptionVariables>;
export const ChannelMessageDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMessageDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMessageDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ChannelMessageDeletionSubscription, ChannelMessageDeletionSubscriptionVariables>;
export const CreatePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePrivateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreatePrivateMessageMutation, CreatePrivateMessageMutationVariables>;
export const UpdatePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePrivateMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePrivateMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePrivateMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePrivateMessageMutation, UpdatePrivateMessageMutationVariables>;
export const DeletePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePrivateMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePrivateMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>;
export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const DeleteChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteChannelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteChannelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const CreateChannelMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;
export const UpdateChannelMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateChannelMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateChannelMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateChannelMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChannelMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateChannelMessageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateChannelMessageMutation, UpdateChannelMessageMutationVariables>;
export const DeleteChannelMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannelMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteChannelMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannelMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteChannelMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelMessageMutation, DeleteChannelMessageMutationVariables>;
export const CreateChannelMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMemberMutation, CreateChannelMemberMutationVariables>;
export const DeleteChannelMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannelMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannelMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelMemberMutation, DeleteChannelMemberMutationVariables>;
export const MuteChannelMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MuteChannelMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"muteChannelMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<MuteChannelMemberMutation, MuteChannelMemberMutationVariables>;
export const UnmuteChannelMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnmuteChannelMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unmuteChannelMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UnmuteChannelMemberMutation, UnmuteChannelMemberMutationVariables>;
export const CreateChannelBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelBlockedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateChannelBlockedMutation, CreateChannelBlockedMutationVariables>;
export const DeleteChannelBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannelBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannelBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelBlockedMutation, DeleteChannelBlockedMutationVariables>;
export const CreateChannelInvitedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannelInvited"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelInvitedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannelInvited"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateChannelInvitedMutation, CreateChannelInvitedMutationVariables>;
export const DeleteChannelInvitedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChannelInvited"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannelInvited"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelInvitedMutation, DeleteChannelInvitedMutationVariables>;
export const MakeChannelMemberAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeChannelMemberAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeChannelMemberAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<MakeChannelMemberAdminMutation, MakeChannelMemberAdminMutationVariables>;
export const UnmakeChannelMemberAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnmakeChannelMemberAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unmakeChannelMemberAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UnmakeChannelMemberAdminMutation, UnmakeChannelMemberAdminMutationVariables>;
export const FindAllPrivateMessageWithDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllPrivateMessageWith"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllPrivateMessageWith"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<FindAllPrivateMessageWithQuery, FindAllPrivateMessageWithQueryVariables>;
export const FindAllChannelMessageInChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChannelMessageInChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChannelMessageInChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<FindAllChannelMessageInChannelQuery, FindAllChannelMessageInChannelQueryVariables>;
export const FindOneChannelByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneChannelByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneChannelByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsers"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<FindOneChannelByNameQuery, FindOneChannelByNameQueryVariables>;

export const PongInvitationSubcriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PongInvitationSubcription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pongInvitationSubcription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"gameType"}},{"kind":"Field","name":{"kind":"Name","value":"senderNickname"}}]}}]}}]} as unknown as DocumentNode<PongInvitationSubcriptionSubscription, PongInvitationSubcriptionSubscriptionVariables>;

export const FindOneUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FindOneUserStatusQuery, FindOneUserStatusQueryVariables>;
export const FindLastUserPresenceByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLastUserPresenceByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findLastUserPresenceByUserIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLastUserPresenceByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findLastUserPresenceByUserIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"disconnectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"connectedAt"}}]}}]}}]} as unknown as DocumentNode<FindLastUserPresenceByUserIdQuery, FindLastUserPresenceByUserIdQueryVariables>;
export const PongInvitationSubcriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PongInvitationSubcription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pongInvitationSubcription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"gameType"}},{"kind":"Field","name":{"kind":"Name","value":"senderNickname"}}]}}]}}]} as unknown as DocumentNode<PongInvitationSubcriptionSubscription, PongInvitationSubcriptionSubscriptionVariables>;

export const SendPongInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPongInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGameType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverNickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderNickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPongInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameType"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverNickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverNickname"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderNickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderNickname"}}}]}]}}]} as unknown as DocumentNode<SendPongInvitationMutation, SendPongInvitationMutationVariables>;
export const PongDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PongData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pongData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ball"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hPos"}},{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"vPos"}}]}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTime"}},{"kind":"Field","name":{"kind":"Name","value":"p1racket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hPos"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"vPos"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"p2racket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hPos"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"vPos"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"player1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"presence"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"player2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"presence"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playfield"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<PongDataSubscription, PongDataSubscriptionVariables>;
export const ReadyForGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readyForGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readyForGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<ReadyForGameMutation, ReadyForGameMutationVariables>;
export const UpdatePlayerInputsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlayerInputs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"controls"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ControlsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlayerInputs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"controls"},"value":{"kind":"Variable","name":{"kind":"Name","value":"controls"}}},{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<UpdatePlayerInputsMutation, UpdatePlayerInputsMutationVariables>;
export const QuitGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"QuitGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quitGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<QuitGameMutation, QuitGameMutationVariables>;
export const IsGameValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsGameValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isGameValid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<IsGameValidQuery, IsGameValidQueryVariables>;
export const IsUserReadyInGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserReadyInGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserReadyInGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<IsUserReadyInGameQuery, IsUserReadyInGameQueryVariables>;
export const FindGameStatClassicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindGameStatClassic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findGameStatClassicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findGameStatClassic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findGameStatClassicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"loserId"}},{"kind":"Field","name":{"kind":"Name","value":"scoreLoser"}},{"kind":"Field","name":{"kind":"Name","value":"scoreWinner"}},{"kind":"Field","name":{"kind":"Name","value":"timePlayed"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"winnerId"}}]}}]}}]} as unknown as DocumentNode<FindGameStatClassicQuery, FindGameStatClassicQueryVariables>;
export const FindGameStatSpecialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindGameStatSpecial"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findGameStatSpecialId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findGameStatSpecial"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findGameStatSpecialId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"loserId"}},{"kind":"Field","name":{"kind":"Name","value":"scoreLoser"}},{"kind":"Field","name":{"kind":"Name","value":"scoreWinner"}},{"kind":"Field","name":{"kind":"Name","value":"timePlayed"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"winnerId"}}]}}]}}]} as unknown as DocumentNode<FindGameStatSpecialQuery, FindGameStatSpecialQueryVariables>;
export const FindBestUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindBestUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findBestUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}}]}}]} as unknown as DocumentNode<FindBestUsersQuery, FindBestUsersQueryVariables>;
export const MatchmakingNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"matchmakingNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matchmakingNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<MatchmakingNotificationSubscription, MatchmakingNotificationSubscriptionVariables>;
export const AddPlayerToMatchmakingQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPlayerToMatchmakingQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGameType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlayerToMatchmakingQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameType"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<AddPlayerToMatchmakingQueueMutation, AddPlayerToMatchmakingQueueMutationVariables>;
export const RemovePlayerFromMatchmakingQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePlayerFromMatchmakingQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePlayerFromMatchmakingQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}]}]}}]} as unknown as DocumentNode<RemovePlayerFromMatchmakingQueueMutation, RemovePlayerFromMatchmakingQueueMutationVariables>;
export const IsUserInGameQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserInGameQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserInGameQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>;
export const RelationBlockedCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RelationBlockedCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationBlockedCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userBlockedId"}},{"kind":"Field","name":{"kind":"Name","value":"userBlockingId"}}]}}]}}]} as unknown as DocumentNode<RelationBlockedCreationSubscription, RelationBlockedCreationSubscriptionVariables>;
export const RelationFriendDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RelationFriendDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationFriendDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAId"}},{"kind":"Field","name":{"kind":"Name","value":"userBId"}}]}}]}}]} as unknown as DocumentNode<RelationFriendDeletedSubscription, RelationFriendDeletedSubscriptionVariables>;
export const RelationRequestCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RelationRequestCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationRequestCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"userSenderId"}}]}}]}}]} as unknown as DocumentNode<RelationRequestCreationSubscription, RelationRequestCreationSubscriptionVariables>;
export const RelationRequestDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RelationRequestDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationRequestDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"userSenderId"}}]}}]}}]} as unknown as DocumentNode<RelationRequestDeletedSubscription, RelationRequestDeletedSubscriptionVariables>;
export const ChannelEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelEditionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelEditionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChannelEditionSubscription, ChannelEditionSubscriptionVariables>;
export const ChannelDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelDeletionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelDeletionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChannelDeletionSubscription, ChannelDeletionSubscriptionVariables>;
export const ChannelMemberCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMemberCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberCreationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMemberCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberCreationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}}]}}]}}]} as unknown as DocumentNode<ChannelMemberCreationSubscription, ChannelMemberCreationSubscriptionVariables>;
export const ChannelMemberEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMemberEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberEditionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMemberEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberEditionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelMemberEditionSubscription, ChannelMemberEditionSubscriptionVariables>;
export const ChannelMemberDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelMemberDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberDeletionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMemberDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelMemberDeletionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelMemberDeletionSubscription, ChannelMemberDeletionSubscriptionVariables>;
export const ChannelInvitedCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelInvitedCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelInvitedCreationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelInvitedCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelInvitedCreationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelInvitedCreationSubscription, ChannelInvitedCreationSubscriptionVariables>;
export const ChannelInvitedDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelInvitedDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelInvitedDeletionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelInvitedDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelInvitedDeletionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelInvitedDeletionSubscription, ChannelInvitedDeletionSubscriptionVariables>;
export const ChannelBlockedCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelBlockedCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelBlockedCreationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelBlockedCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelBlockedCreationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelBlockedCreationSubscription, ChannelBlockedCreationSubscriptionVariables>;
export const ChannelBlockedDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChannelBlockedDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelBlockedDeletionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelBlockedDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelBlockedDeletionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<ChannelBlockedDeletionSubscription, ChannelBlockedDeletionSubscriptionVariables>;
export const DeleteRelationBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRelationBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userBId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRelationBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userAId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userBId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userBId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userBlockedId"}},{"kind":"Field","name":{"kind":"Name","value":"userBlockingId"}}]}}]}}]} as unknown as DocumentNode<DeleteRelationBlockedMutation, DeleteRelationBlockedMutationVariables>;
export const DeleteRelationFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRelationFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userBId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRelationFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userAId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userBId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userBId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAId"}},{"kind":"Field","name":{"kind":"Name","value":"userBId"}}]}}]}}]} as unknown as DocumentNode<DeleteRelationFriendMutation, DeleteRelationFriendMutationVariables>;
export const CreateRelationBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRelationBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RelationBlockedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRelationBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userBlockedId"}},{"kind":"Field","name":{"kind":"Name","value":"userBlockingId"}}]}}]}}]} as unknown as DocumentNode<CreateRelationBlockedMutation, CreateRelationBlockedMutationVariables>;
export const CreateRelationRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRelationRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RelationRequestsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRelationRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"userSenderId"}}]}}]}}]} as unknown as DocumentNode<CreateRelationRequestsMutation, CreateRelationRequestsMutationVariables>;
export const DeleteRelationRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRelationRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userReceiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRelationRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userReceiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userReceiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSenderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReceiverId"}},{"kind":"Field","name":{"kind":"Name","value":"userSenderId"}}]}}]}}]} as unknown as DocumentNode<DeleteRelationRequestsMutation, DeleteRelationRequestsMutationVariables>;
export const FindOneUserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneUserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<FindOneUserByUsernameQuery, FindOneUserByUsernameQueryVariables>;
export const FindOneUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<FindOneUserQuery, FindOneUserQueryVariables>;
export const FindOneUserByContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FindOneUserByContextQuery, FindOneUserByContextQueryVariables>;
export const FindUsersByUserIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUsersByUserIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUsersByUserIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FindUsersByUserIdsQuery, FindUsersByUserIdsQueryVariables>;
export const FindAllRelationFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationFriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationFriendId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationFriendQuery, FindAllRelationFriendQueryVariables>;
export const FindAllRelationRequestsSentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationRequestsSent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationRequestsSent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userSenderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationRequestsSentQuery, FindAllRelationRequestsSentQueryVariables>;
export const FindAllRelationRequestsReceivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationRequestsReceived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userReceiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationRequestsReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userReceiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userReceiverId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationRequestsReceivedQuery, FindAllRelationRequestsReceivedQueryVariables>;
export const FindAllRelationBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationBlockedByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationBlockedByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationBlockedByUserId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationBlockedQuery, FindAllRelationBlockedQueryVariables>;
export const FindAllChannelMemberOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChannelMemberOfUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChannelMemberOfUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindAllChannelMemberOfUserQuery, FindAllChannelMemberOfUserQueryVariables>;
export const FindAllChannelInvitedOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChannelInvitedOfUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChannelInvitedOfUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindAllChannelInvitedOfUserQuery, FindAllChannelInvitedOfUserQueryVariables>;
export const FindChannelByChannelIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindChannelByChannelIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findChannelByChannelIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsers"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<FindChannelByChannelIdsQuery, FindChannelByChannelIdsQueryVariables>;
export const FindAllChannelMemberInChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChannelMemberInChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChannelMemberInChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindAllChannelMemberInChannelQuery, FindAllChannelMemberInChannelQueryVariables>;
export const FindAllChannelInvitedInChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChannelInvitedInChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChannelInvitedInChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindAllChannelInvitedInChannelQuery, FindAllChannelInvitedInChannelQueryVariables>;
export const FindAllInChannelBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllInChannelBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllInChannelBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindAllInChannelBlockedQuery, FindAllInChannelBlockedQueryVariables>;
export const FindOneChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneChannelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneChannelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxUsers"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<FindOneChannelQuery, FindOneChannelQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserUsernameUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;