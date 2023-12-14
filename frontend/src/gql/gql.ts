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
    "\n    query Query {\n      findOneUserByContext {\n        username\n        mail\n      }\n    }\n  ": types.QueryDocument,
    "\n  query GetId {\n    findOneUserByContext {\n      id\n    }\n  }\n": types.GetIdDocument,
    "\n  subscription PrivateMessageCreation(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageCreation(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.PrivateMessageCreationDocument,
    "\n  subscription PrivateMessageEdition($receiverId: String!, $senderId: String!) {\n    privateMessageEdition(receiverId: $receiverId, senderId: $senderId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.PrivateMessageEditionDocument,
    "\n  subscription PrivateMessageDeletion(\n    $receiverId: String!\n    $senderId: String!\n  ) {\n    privateMessageDeletion(receiverId: $receiverId, senderId: $senderId) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n": types.PrivateMessageDeletionDocument,
    "\n  mutation CreatePrivateMessage($data: CreatePrivateMessageInput!) {\n    createPrivateMessage(data: $data) {\n      content\n      id\n      receiverId\n      senderId\n      updatedAt\n      createdAt\n    }\n  }\n": types.CreatePrivateMessageDocument,
    "\n  mutation UpdatePrivateMessage(\n    $data: UpdatePrivateMessageInput!\n    $updatePrivateMessageId: String!\n  ) {\n    updatePrivateMessage(data: $data, id: $updatePrivateMessageId) {\n      content\n      createdAt\n      id\n      receiverId\n      senderId\n      updatedAt\n    }\n  }\n": types.UpdatePrivateMessageDocument,
    "\n  mutation DeletePrivateMessage($deletePrivateMessageId: String!) {\n    deletePrivateMessage(id: $deletePrivateMessageId) {\n      id\n    }\n  }\n": types.DeletePrivateMessageDocument,
    "\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n": types.FindOneUserByContextDocument,
    "\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n": types.FindUsersByUserIdsDocument,
    "\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n": types.FindAllRelationFriendDocument,
    "\n  query FindAllRelationRequest($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n": types.FindAllRelationRequestDocument,
    "\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n": types.FindAllRelationBlockedDocument,
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
export function graphql(source: "\n    query Query {\n      findOneUserByContext {\n        username\n        mail\n      }\n    }\n  "): (typeof documents)["\n    query Query {\n      findOneUserByContext {\n        username\n        mail\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetId {\n    findOneUserByContext {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetId {\n    findOneUserByContext {\n      id\n    }\n  }\n"];
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
export function graphql(source: "\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"): (typeof documents)["\n  query FindOneUserByContext {\n    findOneUserByContext {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"): (typeof documents)["\n  query FindUsersByUserIds($userIds: [String!]!) {\n    findUsersByUserIds(userIds: $userIds) {\n      avatarUrl\n      id\n      languages\n      level\n      mail\n      status\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n"): (typeof documents)["\n  query FindAllRelationFriend($findAllRelationFriendId: String!) {\n    findAllRelationFriend(id: $findAllRelationFriendId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationRequest($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n"): (typeof documents)["\n  query FindAllRelationRequest($userSenderId: String!) {\n    findAllRelationRequestsSent(userSenderId: $userSenderId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n"): (typeof documents)["\n  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {\n    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;