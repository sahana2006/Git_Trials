/**
 * API Communication Module
 * Handles all HTTP requests to the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Get authentication token from localStorage
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Set authentication token in localStorage
 */
function setToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Remove authentication token from localStorage
 */
function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Set current user in localStorage
 */
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Generic API request function
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Authentication API
 */
const authAPI = {
  async register(userData) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async login(email, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async getMe() {
    return apiRequest('/auth/me');
  }
};

/**
 * Appointment API
 */
const appointmentAPI = {
  async bookAppointment(appointmentData) {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  },

  async getAppointments(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/appointments${queryParams ? `?${queryParams}` : ''}`);
  },

  async getAppointment(id) {
    return apiRequest(`/appointments/${id}`);
  },

  async updateStatus(id, status, consultationNotes) {
    return apiRequest(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, consultationNotes })
    });
  },

  async cancelAppointment(id) {
    return apiRequest(`/appointments/${id}/cancel`, {
      method: 'PATCH'
    });
  }
};

/**
 * Patient API
 */
const patientAPI = {
  async registerPatient(patientData) {
    return apiRequest('/patients/register', {
      method: 'POST',
      body: JSON.stringify(patientData)
    });
  },

  async getAllPatients() {
    return apiRequest('/patients');
  },

  async getPatient(id) {
    return apiRequest(`/patients/${id}`);
  },

  async getMyProfile() {
    return apiRequest('/patients/me');
  }
};

/**
 * Doctor API
 */
const doctorAPI = {
  async getAllDoctors() {
    return apiRequest('/doctors');
  },

  async getDoctor(id) {
    return apiRequest(`/doctors/${id}`);
  },

  async getAvailableSlots(doctorId, date) {
    return apiRequest(`/doctors/${doctorId}/available-slots?date=${date}`);
  }
};

/**
 * Utility function to redirect based on user role
 */
function redirectByRole(role) {
  switch (role) {
    case 'patient':
      window.location.href = '/frontend/pages/patient/dashboard.html';
      break;
    case 'doctor':
      window.location.href = '/frontend/pages/doctor/dashboard.html';
      break;
    case 'staff':
      window.location.href = '/frontend/pages/staff/dashboard.html';
      break;
    default:
      window.location.href = '/frontend/pages/login.html';
  }
}

/**
 * Check if user is authenticated and redirect if not
 */
function requireAuth() {
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    window.location.href = '/frontend/pages/login.html';
    return false;
  }

  return true;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format time for display
 */
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
