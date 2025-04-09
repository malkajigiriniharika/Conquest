import {gql} from "@apollo/client";

export const LEADERBOARD_QUERY = gql`
query Query {
  getLeaderboard {
    id
    name
    score
    username
    email
    time
  }
}
`;