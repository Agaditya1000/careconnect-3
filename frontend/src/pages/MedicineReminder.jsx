import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #4a89dc;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NextReminder = styled.div`
  background-color: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  color: #333;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #4a89dc;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #3d8b40;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const EditButton = styled(Button)`
  background-color: #2196f3;
  color: white;

  &:hover {
    background-color: #0b7dda;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ToggleButton = styled(Button)`
  background-color: ${props => props.active ? '#4caf50' : '#9e9e9e'};
  color: white;

  &:hover {
    background-color: ${props => props.active ? '#3d8b40' : '#757575'};
  }
`;

const RemindersList = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReminderItem = styled.li`
  background-color: ${props => props.active ? 'white' : '#f5f5f5'};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  opacity: ${props => props.active ? 1 : 0.7};
`;

const ReminderDetails = styled.div`
  flex: 1;
`;

const ReminderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.5s forwards;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const Title = styled.h1`
  margin: 0;
  color: white;
`;

const SubTitle = styled.h2`
  color: #333;
  border-bottom: 2px solid #4a89dc;
  padding-bottom: 10px;
`;

const MedicineReminder = () => {
  // State for form inputs
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [notes, setNotes] = useState('');
  
  // State for reminders list and editing
  const [reminders, setReminders] = useState([]);
  const [editId, setEditId] = useState(null);
  
  // State for next reminder notification
  const [nextReminder, setNextReminder] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('medicineReminders')) || [];
    setReminders(savedReminders);
    calculateNextReminder(savedReminders);
  }, []);

  // Check for due reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  // Check if any reminders are due now
  const checkReminders = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    reminders.forEach(reminder => {
      if (!reminder.isActive) return;
      
      const [reminderHours, reminderMinutes] = reminder.time.split(':').map(Number);
      
      if (currentHours === reminderHours && currentMinutes === reminderMinutes) {
        setShowNotification(true);
        // Hide notification after 30 seconds
        setTimeout(() => setShowNotification(false), 30000);
      }
    });
  };

  // Calculate the next upcoming reminder
  const calculateNextReminder = (remindersList) => {
    const activeReminders = remindersList.filter(r => r.isActive);
    if (activeReminders.length === 0) {
      setNextReminder(null);
      return;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    let closestTime = null;
    let closestReminder = null;
    let minDiff = Infinity;

    activeReminders.forEach(reminder => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const reminderTime = hours * 60 + minutes;
      let diff = reminderTime - currentTime;
      
      // If time has passed today, check for tomorrow
      if (diff < 0) diff += 1440;
      
      if (diff < minDiff) {
        minDiff = diff;
        closestTime = reminderTime;
        closestReminder = reminder;
      }
    });

    if (closestReminder) {
      const hours = Math.floor(closestTime / 60);
      const mins = closestTime % 60;
      setNextReminder({
        ...closestReminder,
        displayTime: `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!medicineName || !dosage || !time) {
      alert('Please fill in all required fields');
      return;
    }

    const newReminder = {
      id: editId || Date.now(),
      medicineName,
      dosage,
      time,
      frequency,
      notes,
      isActive: true
    };

    let updatedReminders;
    if (editId) {
      updatedReminders = reminders.map(reminder => 
        reminder.id === editId ? newReminder : reminder
      );
      setEditId(null);
    } else {
      updatedReminders = [...reminders, newReminder];
    }

    setReminders(updatedReminders);
    localStorage.setItem('medicineReminders', JSON.stringify(updatedReminders));
    calculateNextReminder(updatedReminders);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setMedicineName('');
    setDosage('');
    setTime('');
    setFrequency('daily');
    setNotes('');
  };

  // Edit a reminder
  const handleEdit = (id) => {
    const reminderToEdit = reminders.find(reminder => reminder.id === id);
    if (reminderToEdit) {
      setMedicineName(reminderToEdit.medicineName);
      setDosage(reminderToEdit.dosage);
      setTime(reminderToEdit.time);
      setFrequency(reminderToEdit.frequency);
      setNotes(reminderToEdit.notes || '');
      setEditId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Delete a reminder
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      const updatedReminders = reminders.filter(reminder => reminder.id !== id);
      setReminders(updatedReminders);
      localStorage.setItem('medicineReminders', JSON.stringify(updatedReminders));
      calculateNextReminder(updatedReminders);
      
      if (editId === id) {
        setEditId(null);
        resetForm();
      }
    }
  };

  // Toggle reminder active status
  const toggleReminderStatus = (id) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    );
    setReminders(updatedReminders);
    localStorage.setItem('medicineReminders', JSON.stringify(updatedReminders));
    calculateNextReminder(updatedReminders);
  };

  return (
    <Container>
      <Header>
        <Title>Medicine Reminder</Title>
        {nextReminder && (
          <NextReminder>
            <h3>Next Reminder:</h3>
            <p>{nextReminder.medicineName} - {nextReminder.dosage} at {nextReminder.displayTime}</p>
          </NextReminder>
        )}
      </Header>

      <FormContainer>
        <SubTitle>{editId ? 'Edit Reminder' : 'Add New Reminder'}</SubTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="medicineName">Medicine Name *</Label>
            <Input
              type="text"
              id="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="e.g., Ibuprofen, Vitamin D"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dosage">Dosage *</Label>
            <Input
              type="text"
              id="dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g., 1 tablet, 5ml"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="time">Time *</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="asNeeded">As Needed</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="notes">Notes</Label>
            <TextArea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional instructions or notes"
            />
          </FormGroup>

          <div>
            <SubmitButton type="submit">
              {editId ? 'Update Reminder' : 'Add Reminder'}
            </SubmitButton>
            {editId && (
              <CancelButton type="button" onClick={resetForm}>
                Cancel
              </CancelButton>
            )}
          </div>
        </form>
      </FormContainer>

      <RemindersList>
        <SubTitle>Your Reminders</SubTitle>
        {reminders.length === 0 ? (
          <p>No reminders added yet. Add your first reminder above.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reminders.map((reminder) => (
              <ReminderItem key={reminder.id} active={reminder.isActive}>
                <ReminderDetails>
                  <h3>{reminder.medicineName}</h3>
                  <p><strong>Dosage:</strong> {reminder.dosage}</p>
                  <p><strong>Time:</strong> {reminder.time}</p>
                  <p><strong>Frequency:</strong> {reminder.frequency}</p>
                  {reminder.notes && <p><strong>Notes:</strong> {reminder.notes}</p>}
                </ReminderDetails>
                <ReminderActions>
                  <ToggleButton 
                    active={reminder.isActive}
                    onClick={() => toggleReminderStatus(reminder.id)}
                  >
                    {reminder.isActive ? 'Active' : 'Inactive'}
                  </ToggleButton>
                  <EditButton onClick={() => handleEdit(reminder.id)}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(reminder.id)}>
                    Delete
                  </DeleteButton>
                </ReminderActions>
              </ReminderItem>
            ))}
          </ul>
        )}
      </RemindersList>

      {showNotification && (
        <Notification>
          <h3>Time to take your medicine!</h3>
          <p>{nextReminder?.medicineName} - {nextReminder?.dosage}</p>
          <button onClick={() => setShowNotification(false)} style={{
            background: 'white',
            color: '#4caf50',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            marginTop: '10px',
            cursor: 'pointer'
          }}>
            Dismiss
          </button>
        </Notification>
      )}
    </Container>
  );
};

export default MedicineReminder;