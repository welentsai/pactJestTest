import axios from 'axios'

const defaultBaseUrl = 'http://reqres.in';

type User = {
    id: number
    email: string
    firstName: string
}

type Support = {
    url: string
    text: string
}

export type GetUserResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
    support: Support
}

// async function getUser() {
//     try {
//         const {data, status} = await axios.get<GetUserResponse>(
//             // 'http://reqres.in/api/users', 
//             'http://127.0.0.1/api/users', 
//             {
//                 headers: {
//                     Accept: 'application/json'
//                 }
//             }
//         )

//         console.log('response data', JSON.stringify(data, null, 4))
//         console.log('response status is: ', status)

//         return data
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.log('error message: ', error.message);
//             return error.message;
//           } else {
//             console.log('unexpected error: ', error);
//             return 'An unexpected error occurred';
//           }
//     }
// }

// export default getUser


export const api = (baseUrl = defaultBaseUrl) => ({
    getHealth: () =>
      axios.get(`${baseUrl}/health`).then((response) => response.data.status),
    /* other endpoints here */

    getUsers: () => axios.get<GetUserResponse>(
        `${baseUrl}/api/users`,
        {
            headers: {
                Accept: 'application/json'
            }
        }
    ).then( (response) => response.data)
});