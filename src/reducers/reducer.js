export default function reducer(state = { bills: [] }, action) {
    switch (action.type) {
      case 'ADD_BILLS':
        return { bills: ...state.bills, state.bills.concat(action.payload)};
      default:
        return state;
    }
  };
  