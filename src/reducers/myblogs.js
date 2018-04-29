

export default (state = [], action) => {
    switch (action.type) {

        case 'SET_MY_BLOGS':
            return action.blogs;

        case 'REMOVE_MY_BLOGS':
            return [];

        case 'REMOVE_MY_BLOG':
            return state.filter((blog) => blog.id != action.id);

        case 'ADD_MY_BLOGS':
            return [
                action.blog,
                ...state
            ];

        case 'EDIT_MY_BLOGS':
            return state.map((blog) => {
                if (blog.id == action.id) {
                    return {
                        ...blog,
                        title: action.title,
                        content: action.content,
                        image: action.image
                    };
                }
                return blog;
            });

        default:
            return state;
    }
};
