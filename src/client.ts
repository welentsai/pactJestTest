import axios from 'axios'

type User = {
    id: number
    email: string
    firstName: string
}

type GetUserResponse = {
    data: User[]
}

async function getUser() {
    try {
        const {data, status} = await axios.get<GetUserResponse>(
            'https://reqres.in/api/users', 
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )

        console.log(JSON.stringify(data, null, 4))
        console.log('response status is: ', status)

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
    }
}

export default getUser