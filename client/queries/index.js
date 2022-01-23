import { gql } from "@apollo/client";

export const GET_COACHES = gql`
  query GetCoaches {
    getCoaches {
      id
      name
      imgCoach
      age
      bio
    }
  }
`;

export const GET_COACH_DETAIL = gql`
  query GetCoachDetail($getCoachDetailId: ID) {
    getCoachDetail(id: $getCoachDetailId) {
      id
      name
      imgCoach
      age
      bio
    }
  }
`;

export const GET_LEVEL = gql`
  query GetLevels {
    getLevel {
      id
      name
      thumbnail
    }
  }
`;

export const GET_CONTENT_CARD = gql`
  query Query($accessToken: String) {
    getContents(access_token: $accessToken) {
      id
      likes
      title
      imgThumbnail
      LevelId
    }
  }
`;
