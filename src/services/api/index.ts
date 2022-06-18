import getUsers from 'services/api/search/getUsers';

async function requestWrapper (apiCall: () => Promise<string[] | void>): Promise<string[] | unknown> {
    try {
        const results = await apiCall();
        return results;
    } catch (error) {
        // Error handling solution should be more robust for production.
        return error;
    }
}

const api = {
    getUsers: () => requestWrapper(getUsers)
}

export default api;