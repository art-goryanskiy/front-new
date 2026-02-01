import { gql } from "@apollo/client";
import { ORDER_FIELDS } from "../queries/orders";

export const CREATE_ORDER_FROM_CART = gql`
  ${ORDER_FIELDS}
  mutation CreateOrderFromCart($input: CreateOrderFromCartInput!) {
    createOrderFromCart(input: $input) {
      ...OrderFields
    }
  }
`;
