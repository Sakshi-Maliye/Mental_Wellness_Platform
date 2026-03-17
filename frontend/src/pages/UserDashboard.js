import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [bookingData, setBookingData] = useState({ therapistId: '', date: '', timeSlot: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const tRes = await axios.get('http://localhost:5000/api/auth/therapists');
        setTherapists(tRes.data);
        const cRes = await axios.get(`http://localhost:5000/api/chat/history/${user.id}`);
        setMessages(cRes.data || []);
      } catch (err) { console.log("Data load error"); }
    };
    if (user) load();
  }, [user.id]);

  const handleChat = async () => {
    if (!inputText) return;
    const res = await axios.post('http://localhost:5000/api/chat/send', { userId: user.id, text: inputText });
    setMessages(res.data.history);
    setInputText('');
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/appointments/book', { ...bookingData, userId: user.id });
    alert(res.data.msg);
  };

  return (
    <div className="container dashboard-container">
      {/* CHAT SECTION */}
      <div style={{ flex: 1.5 }}>
        <h3 style={{ color: '#64ffda', textAlign: 'left' }}>AI Wellness Assistant</h3>
        <div className="chat-window">
          {messages.map((m, i) => (
            <div key={i} className={m.sender === 'user' ? 'user-msg' : 'ai-msg'}>
              <strong>{m.sender === 'user' ? 'You' : 'AI'}:</strong> {m.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input 
            style={{ background: 'white', color: 'black' }} 
            value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type here..." 
          />
          <button className="btn" style={{ width: '100px', marginTop: '10px' }} onClick={handleChat}>Send</button>
        </div>
      </div>

      {/* VERTICAL BOOKING FORM */}
      <div style={{ flex: 1, borderLeft: '1px solid #233554', paddingLeft: '30px' }}>
        <h3 style={{ color: '#64ffda', textAlign: 'left' }}>Book a Session</h3>
        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Select Therapist</label>
          <select onChange={(e) => setBookingData({...bookingData, therapistId: e.target.value})} required>
            <option value="">-- Choose --</option>
            {therapists.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>

          <label>Pick a Date</label>
          <input type="date" onChange={(e) => setBookingData({...bookingData, date: e.target.value})} required />

          <label>Select Time Slot</label>
          <select onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})} required>
            <option value="">-- Select Time --</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
          </select>

          <button type="submit" className="btn">Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;