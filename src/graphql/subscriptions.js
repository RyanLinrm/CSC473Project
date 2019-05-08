// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateGamer = `subscription OnCreateGamer(
  $id: ID
  $username: String
  $bestTime: Int
  $lastTime: Int
  $bestScore: Int
) {
  onCreateGamer(
    id: $id
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
    bestScore: $bestScore
  ) {
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
export const onUpdateGamer = `subscription OnUpdateGamer(
  $id: ID
  $username: String
  $bestTime: Int
  $lastTime: Int
  $bestScore: Int
) {
  onUpdateGamer(
    id: $id
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
    bestScore: $bestScore
  ) {
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
export const onDeleteGamer = `subscription OnDeleteGamer(
  $id: ID
  $username: String
  $bestTime: Int
  $lastTime: Int
  $bestScore: Int
) {
  onDeleteGamer(
    id: $id
    username: $username
    bestTime: $bestTime
    lastTime: $lastTime
    bestScore: $bestScore
  ) {
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
