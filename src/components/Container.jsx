import React, { useState, useContext } from 'react';
import { data1 } from '../data.js';
import { Namecontext } from '../App';
import axios from 'axios';

function Container() {
  const [showPopup, setShowPopup] = useState(false);
  const { selectedUser, setSelectedUser, userList, setUserList } = useContext(Namecontext);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (item) => {
    setSelectedUser(item);
    setShowPopup(true);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    const userData = {
      address: selectedUser.address,
      vehicleModel: selectedUser.vehicleModel,
      emailId: userList.emailId,
      password: selectedUser.password,
      userId: userList._id,
      desc: selectedUser.desc,
      price: selectedUser.price,
      userName: userList.userName,
    };

    axios.post('http://localhost:3001/User/booking', userData)
      .then((response) => {
        console.log('User saved successfully:', response.data);
        setUserList((prevList) => [{...prevList}, response.data]); 
        setSelectedUser(response.data);
        setShowPopup(false); 
      })
      .catch((error) => {
        console.error('Error saving user:', error);
      });
  };
const handleDeleteUser = (userId) => {
  axios.delete(`http://localhost:3001/User/DeleteOrder/${userId}`)
    .then((response) => {
      console.log('User deleted successfully:', response.data);
      setUserList((prevList) => {
        const updatedList = prevList.filter(user => user.userId !== userId);
        setShowPopup(false);
        return updatedList;
      });
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
};


  return (
    <div>
      <div className='flex flex-row gap-8 relative'>
        {data1.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="h-[185px] md:w-299 md:min-w-[250px] backdrop-blur-xl mt-96 lg:mt-[2rem] mb-4 lg:mb-12 border-none rounded-lg p-4 cursor-pointer flex flex-col items-center justify-between bg-blue-400"
          >
            <div className="w-full flex flex-col gap-2 items-end justify-end">
              <p className="text-white font-semibold text-base md:text-lg">
                {item.desc}
              </p>
              <p className="mt-1 text-black text-sm">Calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-white font-semibold">
                  <span className="text-sm text-white">${item.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button 
              className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
              onClick={handleClosePopup}
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-4">User Information</h2>

            <label className="block mb-2">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={selectedUser.address}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
  
            <label className="block mb-2">
              <span className="text-gray-700">Vehicle Model:</span>
              <input
                type="text" 
                name="vehicleModel" 
                value={selectedUser.vehicleModel} 
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveUser} 
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.userId)} // Pass the userId
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Container;
