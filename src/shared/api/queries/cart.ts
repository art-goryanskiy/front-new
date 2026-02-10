import { gql } from "@apollo/client";

export const MY_CART = gql`
  query MyCart {
    myCart {
      items {
        programId
        pricingIndex
        quantity
        lineAmount
        subProgramIndex
        subProgramTitle
        displayTitle
        program {
          id
          title
          shortTitle
          slug
          image
          pricing {
            hours
            price
          }
        }
      }
      totalAmount
    }
  }
`;
