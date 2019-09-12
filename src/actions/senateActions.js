export function fetchBills(link) {
    return (dispatch) => {
      return fetch(link)
        .then(response => response.json())
        .then(bills => dispatch({ type: 'ADD_BILLS', payload: "Sucker" }))
    };
  }