import React, { useState ,useEffect } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { TbArrowsCross } from "react-icons/tb";
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch  } from 'react-redux';
import {setSession } from "../Store/slice/userToken"
import { FiUserPlus } from "react-icons/fi";
  import axios from "axios"
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
      const dispatch = useDispatch();


  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [data,setData] = useState([])
  const getUser = async() => {
    try {
      const res = await axios.get("http://localhost:4000/login/success",{withCredentials:true},)
      setData(res.data.user);
      dispatch(setSession());
      console.log("res",res);
    } catch (error) {
        console.log("Error: "+ error);     
    }
}

console.log("data",Object?.keys(data).length > 0);
  const logout = () => {
        window.open(`http://localhost:4000/logout`,"_self")
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <>
        <header className="bg-white">
        <nav className="flex shadow-xl justify-between  items-center w-[92%]  mx-auto border-b-2  border-theme-200">
             <div className="cursor-pointer text-[#fff]  font-sans font-semibold xl:text-[30px] text-[25px] px-4 py-1 flex flex-wrap items-center gap-6">
                  <span className="text-theme-200 -mr-5">Beyond Excellence</span>
        </div>
            <div
                className={`${isOpen ? `hidden`:`absolute`} xl:block  nav-links duration-500 md:static xl:z-0 z-[99999]  bg-white  md:min-h-fit xl:h-auto xl:w-auto min-h-[90vh] w-[70vw] gap-3 items-start pl-10 pt-6 xl:pl-0 xl:pt-0 xl:right-0 xl:top-0 xl:flex-row -right-[30vw] top-[6vh]  flex-col  md:w-auto  flex xl:items-center xl:px-5`}>
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ">
                    <li>
                        <a className="hover:border-theme-200 hover:border-b-2 pb-2 font-sans font-semibold" href="#">Home</a>
                    </li>
                    <li>
                        <a className="hover:border-theme-200 hover:border-b-2 pb-2 font-sans font-semibold" href="#">About</a>
                    </li>
                    <li>
                        <a className="hover:border-theme-200 hover:border-b-2 pb-2 font-sans font-semibold" href="#">Courses</a>
                    </li>
                    <li>
                        <a className="hover:border-theme-200 hover:border-b-2 pb-2 font-sans font-semibold" href="#">Testimonials</a>
                    </li>
                </ul>
                <div className={`${isOpen?`hidden`:`block`} xl:hidden flex items-center xl:gap-6 mt-6 gap-4`}>
                <IoSearch size={"20px"}/>
                {Object?.keys(data)?.length > 0 ?<FiUserPlus onClick={logout} size={"20px"}/>:<FiUserPlus onClick={logout} size={"20px"}/>

 }
                <FiShoppingCart size={"20px"}/>
            </div>
            </div>
            <div className={`xl:flex hidden items-center xl:gap-6 gap-2`}>
                <IoSearch size={"20px"}/>
                {Object.keys(data).length > 0 ?<Link to={'/profile'}><FaRegUser size={"20px"}/></Link>:<Link to={'/login'}><FiUserPlus size={"20px"}/></Link>
}
                <FiShoppingCart size={"20px"}/>
            </div>
            {isOpen?
                        <MdOutlineMenuOpen onClick={toggleMenu}  className="text-3xl relative z-[99999] cursor-pointer md:hidden" />:
                                    <TbArrowsCross onClick={toggleMenu}  className="text-3xl relative z-[99999] cursor-pointer md:hidden" />

}
            </nav>
    </header>

    </>
  )}

export default Navbar;
