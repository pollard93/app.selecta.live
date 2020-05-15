import gql from 'graphql-tag';

export const VALIDATE_IN_APP_PURCHASE_MUTATION = gql`
  mutation validateInAppPurchase($receipt: Json!){
    validateInAppPurchase(receipt: $receipt){
      id
      credit
    }
  }
`;
