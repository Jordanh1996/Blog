

export default (state = [], action) => {
    switch(action.type) {
        case "SET_BLOGS":
            return action.blogs

        case "CONCAT_BLOGS":
            return state.concat(action.blogs) 

        default: 
            return state
    }
}