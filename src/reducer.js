export const initialState = {
  user: JSON.parse(localStorage.getItem("User")),
  name: null,
  feeds: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
      };
    case "Feeds fetch":
      return {
        ...state,
        feeds: action.feeds,
      };
    default:
      return state;
  }
};

export default reducer;
