import axios from 'axios';

export const getSignedUrl = (token) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}upload`,
        headers: {
            'x-auth': token
        }
    });
};

export const postFile = (url, file) => {
    return axios.put(
        url,
        file,
        {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        }
    );
};

export const deleteFile = (token, image) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.URL}upload/delete`,
        headers: {
            'x-auth': token
        },
        data: {
            image
        }
    });
};
