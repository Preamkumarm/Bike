import { useState, useEffect } from "react";
import { bike } from "../data.js";
import Prebooking from "./Prebooking.jsx";
function Body() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % bike.length 
      );
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <div className="flex justify-center ml-80">
        <img
          src={bike[currentImageIndex].imageSrc} 
          alt={`Bike ${currentImageIndex + 1}`}
          className="w-656 transition-all duration-1000 ease-in-out mt-10"
        />
      </div>
      <Prebooking/>

    </div>
  );
}

export default Body;
