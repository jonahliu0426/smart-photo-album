function resultReducer(state, action) {
    switch (action.type) {
        case "ADD_RESULTS": {
            console.log(action.payload.data);
            return {
                searchResult: [...action.payload.data]
            }
        }
        default:
            return state;
    }
}

export default resultReducer;