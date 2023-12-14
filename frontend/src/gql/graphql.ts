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
  createChannel: Channel;
  createChannelBlocked: ChannelBlocked;
  createChannelInvited: ChannelInvited;
  createChannelMember: ChannelMember;
  createChannelMessage: ChannelMessage;
  createGameStat: GameStat;
  createPrivateMessage: PrivateMessage;
  createRelationBlocked: RelationBlocked;
  createRelationFriend: RelationFriend;
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
  unmakeChannelMemberAdmin: ChannelMember;
  unmuteChannelMember: ChannelMember;
  updateChannel: Channel;
  updateChannelMember: ChannelMember;
  updateChannelMessage: ChannelMessage;
  updateChannelOwner: Channel;
  updatePrivateMessage: PrivateMessage;
  updateUser: User;
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


export type MutationCreateRelationFriendArgs = {
  data: RelationFriendInput;
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


export type MutationUpdatePrivateMessageArgs = {
  data: UpdatePrivateMessageInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String']['input'];
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
  findAllChannelInvitedInChannel: Array<ChannelInvited>;
  findAllChannelMemberInChannel: Array<ChannelMember>;
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
  findChannelOwner: Scalars['String']['output'];
  findGameStatClassic: Array<GameStat>;
  findGameStatLose: Array<GameStat>;
  findGameStatSpecial: Array<GameStat>;
  findGameStatWin: Array<GameStat>;
  findLastUserPresenceByUserId: UserPresence;
  findOneChannel: Channel;
  findOneChannelBlocked: ChannelBlocked;
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
  isRelationBlocked: Scalars['Boolean']['output'];
  isRelationFriendExist: Scalars['Boolean']['output'];
  isRelationRequestsRequested: Scalars['Boolean']['output'];
  isUserPresenceConnected: Scalars['Boolean']['output'];
  isUserUsernameUsed: Scalars['Boolean']['output'];
};


export type QueryFindAllChannelInvitedInChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindAllChannelMemberInChannelArgs = {
  channelId: Scalars['String']['input'];
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


export type QueryIsUserPresenceConnectedArgs = {
  id: Scalars['String']['input'];
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

export type RelationFriendInput = {
  userAId: Scalars['String']['input'];
  userBId: Scalars['String']['input'];
};

export type RelationRequests = {
  __typename?: 'RelationRequests';
  userReceiverId: Scalars['String']['output'];
  userSenderId: Scalars['String']['output'];
};

export type RelationRequestsInput = {
  userReceiverId: Scalars['String']['input'];
  userSenderId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  privateMessageCreation: PrivateMessage;
  privateMessageDeletion: PrivateMessage;
  privateMessageEdition: PrivateMessage;
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
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChannelMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePrivateMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  doubleA: Scalars['Boolean']['input'];
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

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', username: string, mail: string, id: string, validation2fa: boolean } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', username: string, mail: string } };

export type GetIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', id: string } };

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

export type FindOneUserByContextQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOneUserByContextQuery = { __typename?: 'Query', findOneUserByContext: { __typename?: 'User', avatarUrl?: string | null, id: string, languages: ELanguage, level: number, mail: string, status: EStatus, username: string } };

export type FindUsersByUserIdsQueryVariables = Exact<{
  userIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type FindUsersByUserIdsQuery = { __typename?: 'Query', findUsersByUserIds: Array<{ __typename?: 'User', avatarUrl?: string | null, id: string, languages: ELanguage, level: number, mail: string, status: EStatus, username: string }> };

export type FindAllRelationFriendQueryVariables = Exact<{
  findAllRelationFriendId: Scalars['String']['input'];
}>;


export type FindAllRelationFriendQuery = { __typename?: 'Query', findAllRelationFriend: Array<string> };

export type FindAllRelationRequestQueryVariables = Exact<{
  userSenderId: Scalars['String']['input'];
}>;


export type FindAllRelationRequestQuery = { __typename?: 'Query', findAllRelationRequestsSent: Array<string> };

export type FindAllRelationBlockedQueryVariables = Exact<{
  findAllRelationBlockedByUserId: Scalars['String']['input'];
}>;


export type FindAllRelationBlockedQuery = { __typename?: 'Query', findAllRelationBlockedByUser: Array<string> };


export const IsAuthenticatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsAuthenticated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validation2fa"}}]}}]}}]} as unknown as DocumentNode<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetIdQuery, GetIdQueryVariables>;
export const PrivateMessageCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageCreationSubscription, PrivateMessageCreationSubscriptionVariables>;
export const PrivateMessageEditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageEdition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageEdition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageEditionSubscription, PrivateMessageEditionSubscriptionVariables>;
export const PrivateMessageDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PrivateMessageDeletion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateMessageDeletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PrivateMessageDeletionSubscription, PrivateMessageDeletionSubscriptionVariables>;
export const CreatePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePrivateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreatePrivateMessageMutation, CreatePrivateMessageMutationVariables>;
export const UpdatePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePrivateMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePrivateMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePrivateMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePrivateMessageMutation, UpdatePrivateMessageMutationVariables>;
export const DeletePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePrivateMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePrivateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePrivateMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>;
export const FindOneUserByContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserByContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<FindOneUserByContextQuery, FindOneUserByContextQueryVariables>;
export const FindUsersByUserIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUsersByUserIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUsersByUserIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<FindUsersByUserIdsQuery, FindUsersByUserIdsQueryVariables>;
export const FindAllRelationFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationFriendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationFriendId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationFriendQuery, FindAllRelationFriendQueryVariables>;
export const FindAllRelationRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationRequestsSent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userSenderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSenderId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationRequestQuery, FindAllRelationRequestQueryVariables>;
export const FindAllRelationBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllRelationBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationBlockedByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllRelationBlockedByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findAllRelationBlockedByUserId"}}}]}]}}]} as unknown as DocumentNode<FindAllRelationBlockedQuery, FindAllRelationBlockedQueryVariables>;