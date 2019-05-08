// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    bestTime
    lastTime
    bestScore
    lastScore
    lastChar
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      bestTime
      lastTime
      bestScore
      lastScore
      lastChar
    }
    nextToken
  }
}
`;
export const getGamer = `query GetGamer($id: ID!) {
  getGamer(id: $id) {
    id
    username
    bestTime
    lastTime
    bestScore
    lastScore
    lastChar
  }
}
`;
export const listGamers = `query ListGamers(
  $filter: TableGamerFilterInput
  $limit: Int
  $nextToken: String
) {
  listGamers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      bestTime
      lastTime
      bestScore
      lastScore
      lastChar
    }
    nextToken
  }
}
`;
