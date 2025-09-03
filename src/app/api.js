import axios from 'axios';

const API_BASE_URL = 'https://appointment-manager-node.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const login = async (data) => {

  
  const response = await api.post('/auth/login', data);
  return response.data; // Token + User info
};

// Patient Registration
export const registerPatient = async (data) => {
  const response = await api.post('/auth/register/patient', data);
  return response.data;
};

// Doctor Registration
export const registerDoctor = async (data) => {
  const response = await api.post('/auth/register/doctor', data);
  return response.data;
};

// Get Doctors List
export const getDoctors = async (params) => {
  const response = await api.get('/doctors', { params });
  return response.data;
};

// Get Specializations
export const getSpecializations = async () => {
  const response = await api.get('/specializations');
  return response.data;
};

export const createAppointment = async (data, token) => {
  const res = await api.post("/appointments", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const getPatientAppointments = async (status, page, token) => {
  const res = await api.get("/appointments/patient", {
    params: { status, page },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const cancelAppointment = async (appointment_id, token) => {
  const res = await api.patch(
    "/appointments/update-status",
    { appointment_id, status: "CANCELLED" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};




export const getAppointments = async (status, date, page, token) => {
  const params = { status, page };
  if (date) params.date = date;

  const res = await api.get("/appointments/doctor", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("API Response:", res.data);
  return res.data;
};
