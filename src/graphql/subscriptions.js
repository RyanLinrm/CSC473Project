// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateGameUser = `subscription OnCreateGameUser(
  $id: ID
  $sub: String
  $username: String
  $bestTime: Int
  $lastTime: Int
) {
  onCreateGameUser(
    id: $id
    sub: $sub
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
  ) {
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
export const onUpdateGameUser = `subscription OnUpdateGameUser(
  $id: ID
  $sub: String
  $username: String
  $bestTime: Int
  $lastTime: Int
) {
  onUpdateGameUser(
    id: $id
    sub: $sub
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
  ) {
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
export const onDeleteGameUser = `subscription OnDeleteGameUser(
  $id: ID
  $sub: String
  $username: String
  $bestTime: Int
  $lastTime: Int
) {
  onDeleteGameUser(
    id: $id
    sub: $sub
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
  ) {
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
