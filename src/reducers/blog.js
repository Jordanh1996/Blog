

export default (state = [], action) => {
    switch(action.type) {
        case "ADD_BLOG":
            return [
                ...state,
                action.blog
            ]

        case "REMOVE_BLOG":
            return state.filter((blog) => blog.title !== action.title)

        case "EDIT_BLOG":
            return state.map((blog) => {
                if (blog._id === action.id) {
                    return {
                        ...blog,
                        title: action.title,
                        content: action.content
                    }
                } else return blog
            })
        
        case "SET_BLOGS":
            return action.blogs

        default: 
            return state
    }
}