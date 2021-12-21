const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_POST':
      state = [...action.payload];
      return [...state];
    default:
      return state;
  }
};

export default postReducer;
