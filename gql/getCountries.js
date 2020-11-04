import gql from 'graphql-tag';

export const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
    }
  }
`;

export const GET_BRAZIL = gql`
  {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
