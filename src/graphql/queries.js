// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGameUser = `query GetGameUser($id: ID!) {
  getGameUser(id: $id) {
    id
    sub
    username
    bestTime
    lastTime
    bestScore
    lastScore
    lastChar
  }
}
`;
export const listGameUsers = `query ListGameUsers(
  $filter: TableGameUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      sub
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
