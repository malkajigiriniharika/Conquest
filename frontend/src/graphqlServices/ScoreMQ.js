import {gql} from "@apollo/client";

export const SCORE_MUTATION = gql`
mutation Mutation($email: String!, $score: Int!, $time: Int!) {
  updateScore(email: $email, score: $score, time: $time)
}
`;