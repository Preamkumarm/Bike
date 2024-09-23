import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Namecontext } from '../App';
import Navbar from './Navbar';

function AdminDashboard() {
  const { selectedUser, userList } = useContext(Namecontext);
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/User/booking/allUser');
        console.log("Response from booking API:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (e, index) => {
    const updatedStatus = e.target.value;

    const updatedBookings = bookings.map((booking, id) =>
      id === index ? { ...booking, status: updatedStatus } : booking
    );
    setBookings(updatedBookings);

    if (updatedStatus === 'Completed') {
      const email = userList.find(user => user.userName === bookings[index].userName)?.emailId; 
      await sendCompletionNotification(email);
    }
  };

  const getSelectClassName = (status) => {
    if (status === 'Pending') return 'bg-red-600 text-white';
    if (status === 'Ongoing') return 'bg-orange-500 text-white';
    if (status === 'Completed') return 'bg-green-500 text-white';
    return '';
  };

  const sendCompletionNotification = async (email) => {
    console.log('Sending email to:', email); 
    try {
      const response = await axios.post('http://localhost:3001/completed', {
        email: email,
        message: 'Your order has been completed!'
      });
  
      if (response.status === 200) {
        console.log('Email notification sent successfully');
      } else {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error.response.data);
    }
  };
  
  return (
    <div>
      <div className='-mt-8 absolute'>
        <Navbar />
      </div>

      <div className="mt-10 p-8 relative">
        <h2 className="text-xl font-bold mt-10">Admin Dashboard</h2>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          <div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email ID</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Vehicle Model</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{booking.userName}</td>
                      <td className="border px-4 py-2">{booking.emailId}</td>
                      <td className="border px-4 py-2">{booking.desc}</td>
                      <td className="border px-4 py-2">{booking.price}</td>
                      <td className="border px-4 py-2">{booking.address}</td>
                      <td className="border px-4 py-2">{booking.vehicleModel}</td>
                      <td className="border px-4 py-2">
                        {isAdmin ? (
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(e, index)}
                            className={getSelectClassName(booking.status)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                          </select>
                        ) : (
                          <span>{booking.status}</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">No bookings available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
