const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  try {
    const { therapistId, date, timeSlot, userId } = req.body;

    if (!therapistId || !date || !timeSlot || !userId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // --- DATE LOGIC START ---
    const selectedDate = new Date(date);
    const today = new Date();
    
    // Reset "today" to midnight so we only compare the calendar date
    today.setHours(0, 0, 0, 0);

    let initialStatus = 'pending';

    // If the selected date is strictly before today, mark it as 'confirmed'
    if (selectedDate < today) {
      initialStatus = 'confirmed'; 
    }
    // --- DATE LOGIC END ---

    const newAppointment = new Appointment({ 
      userId, 
      therapistId, 
      date: selectedDate, 
      timeSlot, 
      status: initialStatus 
    });

    await newAppointment.save();

    const responseMsg = initialStatus === 'confirmed' 
      ? "Past session recorded as 'confirmed' in database." 
      : "Upcoming session booked as 'pending'.";

    res.status(201).json({ msg: responseMsg });
  } catch (err) {
    res.status(500).json({ error: "Database error: " + err.message });
  }
};

// Logic for fetching therapist-specific appointments
exports.getTherapistAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ therapistId: req.params.id })
      .populate('userId', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};