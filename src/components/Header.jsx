import { heroData,bike } from "../data.js";
import { useState } from "react";
import Container from "./Container.jsx";
import Navbar from "../components/Navbar.jsx";
import Body from "./Body.jsx";
function Header()
{
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 1;
  
    const scrollLeft = () => {
      setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    };
  
    const scrollRight = () => {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + itemsPerPage, heroData.length - itemsPerPage)
      );
    };
  
    return(<div className="">
      
      <div className="text-black">
      <Navbar/>
     
      </div>
      <div className="absolute ml-2 mt-16">
        <h1 className="mt-36 text-2xl font-semibold relative">Hello,</h1>
        <div>
        <p className="ml-16 -mt-8 text-2xl font-bold text-blue-800 kanit-semibold">&nbsp;Motoshop</p>

        </div>
        <p className="suse-paragraph font-semibold text-lg font-sans mt-1">
  Riding a motorcycle isn't just about the freedom 
  <br />of the open road—it's  a chance to escape the everyday and 
  <br />connect with the world around you.
</p>


      </div>

      <div>
        <Body/>
      </div>
      <div className="top-2/3 -mt-14 m-6 p-1  absolute">
      <div className="">
      <Container/>
      </div>
      </div>
      
    </div>)
}
export default Header