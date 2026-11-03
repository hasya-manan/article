// Create a customized Axios instance
const api = axios.create({
    // Because we are using Sanctum (cookies), we must always allow credentials
    withCredentials: true,
    
    // Tell Laravel we expect JSON back (prevents the "Route [login] not defined" HTML redirect)
    headers: {
        'Accept': 'application/json',
        
    }
});

// Add a global response interceptor
api.interceptors.response.use(
    (response) => {
        // If the request is successful, just return the response
        return response;
    },
    (error) => {
        // If the server returns a 401 Unauthorized status
        if (error.response && error.response.status === 401) {
            // Check login or not 
            if (!window.location.pathname.includes('login.html')) {
                // Kick them to login
                window.location.href = '/login.html';
            }
        }
        
        // Pass the error down to the specific page's catch block just in case
        return Promise.reject(error);
    }
);