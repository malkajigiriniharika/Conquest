import {gql} from "@apollo/client";

export const REGISTER_MUTATION=gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
    register(name: $username,username: $username, email: $email, password: $password){
        isRegistered
    }
}
`;
