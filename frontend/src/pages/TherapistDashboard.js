import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TherapistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`http://localhost:5000/api/appointments/therapist/${user.id}`);
      setAppointments(res.data);
    };
    fetchAppointments();
  }, [user.id]);

  return (
    <div className="container">
      <h2>Therapist Dashboard</h2>
      <h3>Your Upcoming Appointments</h3>
      <ul>
        {appointments.map(app => (
          <li key={app._id}>
            {app.userId.name} - {new Date(app.date).toLocaleDateString()} at {app.timeSlot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapistDashboard;