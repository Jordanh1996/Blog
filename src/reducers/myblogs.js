

export default (state = [], action) => {
    switch (action.type) {
        
        case 'SET_MY_BLOGS':
            return action.blogs;
            
        case 'REMOVE_MY_BLOGS':
            return [];

        case 'REMOVE_MY_BLOG':
            return state.filter((blog) => blog._id !== action.id);

        case 'ADD_MY_BLOGS':
            return [
                ...state,
                action.blog
            ];

        case 'EDIT_MY_BLOGS':
            return state.map((blog) => {
                if (blog._id === action.id) {
                    return {
                        ...blog,
                        title: action.title,
                        content: action.content
                    }
                }
                return blog;
            });

        default: 
            return state;
    }
};
