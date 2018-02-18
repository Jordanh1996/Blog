

export default (state = [], action) => {
    switch(action.type) {
        
        case "SET_MY_BLOGS":
            return action.blogs
            
        case "REMOVE_MY_BLOGS":
            return []

        default: 
            return state
    }
}