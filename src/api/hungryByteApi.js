const BASE_URL = 'http://localhost:5011/api'; // Replace with your actual base URL

// Retrieve the token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to handle fetch requests
async function apiFetch(endpoint, options = {}) {
    const token = getAuthToken();

    // Add token to request headers if present
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('API Error:', errorData);  // Log the error details for debugging
        throw new Error(errorData?.message || 'Something went wrong');
    }

    if (response.status === 204) { // Handle 204 No Content
        return null;
    }

    return response.json();
}

// Authentication endpoints
export async function registerUser(registrationData) {
    return apiFetch('Authentication/register', {
        method: 'POST',
        body: JSON.stringify(registrationData),
    });
}

export async function loginUser(loginData) {
    return apiFetch('Authentication/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
    });
}

// Restaurant endpoints
export async function getAllRestaurants() {
    return apiFetch('Restaurants');
}

export async function getRestaurantById(id) {
    return apiFetch(`Restaurants/${id}`);
}

// Menu Item endpoints
export async function getMenuItems() {
    return apiFetch('MenuItems');
}

export async function getMenuItemsByRestaurantId(restaurantId) {
    return apiFetch(`MenuItems/restaurant/${restaurantId}`);
}

export async function createMenuItem(menuItemData) {
    return apiFetch('MenuItems', {
        method: 'POST',
        body: JSON.stringify(menuItemData),
    });
}

export async function updateMenuItem(id, menuItemData) {
    return apiFetch(`MenuItems/${id}`, {
        method: 'PUT',
        body: JSON.stringify(menuItemData),
    });
}

export async function deleteMenuItem(id) {
    return apiFetch(`MenuItems/${id}`, {
        method: 'DELETE',
    });
}

// Order endpoints
export async function getOrders() {
    return apiFetch('Orders');
}

export async function createOrder(orderData) {
    return apiFetch('Orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
    });
}

export async function getOrderById(id) {
    return apiFetch(`Orders/${id}`);
}

export async function deleteOrder(id) {
    return apiFetch(`Orders/${id}`, {
        method: 'DELETE',
    });
}

// Admin endpoints
export async function getCustomers() {
    return apiFetch('Admin/customers');
}

export async function getRestaurantOwners() {
    return apiFetch('Admin/restaurantowners');
}

export async function getAdminRestaurants() {
    return apiFetch('Admin/restaurants');
}

// Function to handle logout
export function logout() {
    localStorage.removeItem('authToken'); // Clear the token from local storage
    window.location.href = '/'; // Redirect to the home page after logout
}

// Check if the user is authenticated
export function isAuthenticated() {
    return !!getAuthToken(); // Returns true if a token exists, otherwise false
}
