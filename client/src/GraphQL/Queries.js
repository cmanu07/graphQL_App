import { gql } from "@apollo/client";
// import { GraphQLScalarType, Kind } from "graphql";


export const LOAD_DATA = gql`
    
    query {
        allPosts(count: 50) {
            createdAt
        }
    }

`