import { gql } from "@apollo/client";

export const LOAD_DATA = gql`
    
    query {
        allPosts(count: 9500) {
            createdAt
        }
    }

`