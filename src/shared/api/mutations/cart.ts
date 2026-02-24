import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
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

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
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
