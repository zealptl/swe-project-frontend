import {
  RECOMMENDED_DISHES,
  ITEM_IN_CART,
  PLACE_ORDER,
  INSUFFFICIENT_BALANCE,
  NEW_BALANCE,
  CLEAR_ERRORS,
  DISCUSSION_POSTS_SUCCESS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case RECOMMENDED_DISHES:
      return {
        ...state,
        recommendedDishes: action.payload,
      };

    case DISCUSSION_POSTS_SUCCESS:
      return {
        ...state,
        discussionPosts: action.payload,
      };

    case ITEM_IN_CART:
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload],
      };

    case PLACE_ORDER:
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (itemsInCart) => itemsInCart._id !== action.payload.menuItem
        ),
      };

    case INSUFFFICIENT_BALANCE:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_BALANCE:
      return {
        ...state,
        newBalance: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
