

export default (state = [], action) => {
    switch(action.type) {
        case "ADD_BLOG":
            return [
                ...state,
                action.blog
            ]

        case "REMOVE_BLOG":
            return state.filter((blog) => blog.title !== action.title)

        default: 
            return state
    }
}