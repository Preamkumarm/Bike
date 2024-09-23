import { useEffect, useState, useContext } from "react";
import { Namecontext } from '../App';
import axios from "axios";

function Prebooking() {
  const [showPopup, setShowPopup] = useState(false);
  const { userList } = useContext(Namecontext);
  const [bookings, setBookings] = useState([]); 

  
  useEffect(() => {
    const getBook = async () => {
      if (userList._id) {  
        try {
          const response = await axios.get(`http://localhost:3001/User/GetOrders/${userList._id}`);
          console.log("Previous Bookings", response.data);

          if (response.data.length > 0) {
            setBookings(response.data); 
          } else {
            setBookings([]);  
          }
        } catch (error) {
          console.error("Error Fetching Previous bookings", error);
        }
      }
    };
    getBook();
  }, [userList._id]);

  
  const handleClick = () => {
    setShowPopup(true);
  };

 
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="absolute ml-96 ">
      <div className="ml-96 -mt-80">
        <button
          className="bg-green-500 text-black px-3 py-1 rounded ml-80"
          
        >
          <img src={'/R.svg'} alt="" className="w-4" onClick={handleClick}/>
        </button>
      </div>

      
      {showPopup && bookings.length > 0 && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Previous Bookings</h2>
            <div className="overflow-y-auto max-h-64">
              {bookings.map((booking, index) => (
                <div key={index} className="mb-4">
                  <p><strong>Description:</strong> {booking.desc || "No description available"}</p>
                  <p><strong>Price:</strong> {booking.price || "Price not available"}</p>
                  <hr className="my-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      
      {showPopup && bookings.length === 0 && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">No Previous Bookings</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prebooking;