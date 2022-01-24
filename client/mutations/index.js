import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation SignUpUser($fullName: String, $email: String, $password: String) {
    signUpUser(fullName: $fullName, email: $email, password: $password) {
      message
      error
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignInUser($email: String, $password: String) {
    signInUser(email: $email, password: $password) {
      access_token
      isRegister
      error
    }
  }
`;

export const POST_MACRO = gql`
  mutation PostMacro(
    $age: Int
    $gender: String
    $height: Int
    $weight: Int
    $activitylevel: Int
    $goal: String
  ) {
    postMacro(
      age: $age
      gender: $gender
      height: $height
      weight: $weight
      activitylevel: $activitylevel
      goal: $goal
    ) {
      calorie
      balanced {
        protein
        fat
        carbs
      }
      lowfat {
        protein
        fat
        carbs
      }
      lowcarbs {
        protein
        fat
        carbs
      }
      highprotein {
        protein
        fat
        carbs
      }
    }
  }
`;

export const POST_USER_LOG = gql`
  mutation PostUserLog($accessToken: String, $height: Int, $weight: Int) {
    postUserLog(access_token: $accessToken, height: $height, weight: $weight) {
      message
      error
    }
  }
`;

export const POST_USER_PROFILE = gql`
  mutation PostUserProfile(
    $accessToken: String
    $height: Int
    $weight: Int
    $activityLevel: Int
    $phoneNumber: String
    $gender: String
    $dateBirth: String
    $goals: String
  ) {
    postUserProfile(
      access_token: $accessToken
      height: $height
      weight: $weight
      activityLevel: $activityLevel
      phoneNumber: $phoneNumber
      gender: $gender
      dateBirth: $dateBirth
      goals: $goals
    ) {
      message
      error
    }
  }
`;

export const ACTIVATE = gql`
  mutation ActivateUser($pin: String) {
    activateUser(pin: $pin) {
      message
      error
    }
  }
`;
