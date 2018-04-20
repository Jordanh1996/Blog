

export default (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.blogs;

        case 'CONCAT_BLOGS':
            return state.concat(action.blogs);

        case 'EDIT_BLOG':
            return state.map((blog) => {
                if (blog._id === action.id) {
                    return {
                        ...blog,
                        title: action.title,
                        content: action.content
                    };
                } 
                return blog;
            });

        default: 
            return state;
    }
};
