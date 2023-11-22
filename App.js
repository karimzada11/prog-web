import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    reason: 'sick',
  });

  const [adminInfo, setAdminInfo] = useState('');
  const [leaveRequestStatus, setLeaveRequestStatus] = useState(null); // null: no decision, true: accepted, false: rejected
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeaveRequest = () => {
    const { firstName, lastName, id, reason } = formData;

    setAdminInfo(`Name: ${firstName} ${lastName}<br>ID: ${id}<br>Reason: ${reason}`);
    setLeaveRequestStatus(null); // Reset status for a new request

    // Display the form and hide the message
    setShowMessage(false);
  };

  const handleAccept = () => {
    setLeaveRequestStatus(true);
    setShowMessage(true); // Display the message on the leave request page
  };

  const handleReject = () => {
    setLeaveRequestStatus(false);
    setShowMessage(true); // Display the message on the leave request page
  };

  const renderLeaveRequestForm = () => {
    return (
      <form className="form">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="reason">Reason to Leave:</label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          required
        >
          <option value="sick">Sick</option>
          <option value="travel">Travel</option>
          <option value="family">Family Problem</option>
          <option value="other">Other</option>
        </select>

        <button type="button" onClick={handleLeaveRequest}>
          Submit Request
        </button>
      </form>
    );
  };

  const renderLeaveRequestMessage = () => {
    if (leaveRequestStatus === true) {
      return <p className="accepted">Your leave request has been accepted. You are allowed to leave.</p>;
    } else if (leaveRequestStatus === false) {
      return <p className="rejected">Your leave request has been rejected. Sorry, you cannot leave at this time.</p>;
    }
    return null;
  };

  return (
    <div className="app-container">
      <div className="admin-page">
        <h2>Admin Page</h2>
        <div dangerouslySetInnerHTML={{ __html: adminInfo }}></div>
        {!showMessage && (
          <div>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        )}
      </div>

      <div className="leave-form">
        <h2>User page</h2>
        <h2>Request to Leave</h2>
        {!showMessage && renderLeaveRequestForm()}

        {showMessage && (
          <div className="message">
            {renderLeaveRequestMessage()}
          </div>
        )}
      </div>
    </div>
  );
};

export default App