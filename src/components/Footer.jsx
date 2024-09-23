function Footer()
{
    return(
    <div>
        <section class="bg-green-100 p-10 flex flex-col gap-5 mt-5"style={{backgroundImage: "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)"}}>
        <h1 class="text-4xl font-bold ml-96">Follow Lx Gallery</h1>
        <div className="ml-96 mt-5 ">
        <div className="w-6 flex flex-row ml-16 items-center gap-3">
  <img 
    src={"./twit.svg"} alt=""
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
  />
  <img 
    src={"./facebook.svg"} alt=""
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
  />
  <img 
    src={"./instagram.svg"} alt=""
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
  />
  <img 
    src={"./linkedin.svg"} alt=""
    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
  />
</div>

        </div>
    </section>
    <p className="ml-36 mt-5 text-xl font-semibold">The Standard chunk of Lorem ipsum used since the 1500s is reprodused below for those interest</p>
    <p className="mt-12 ml-72 text-xl font-normal">copyright &copy; 2021 All rights reserved | Made with ❤ by Lx</p>
    </div>
    )
}
export default Footer