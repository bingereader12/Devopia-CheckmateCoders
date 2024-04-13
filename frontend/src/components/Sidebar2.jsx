import { React, useState } from "react";
import { NavLink } from "react-router-dom";
// import { RiHome5Fill,RiHome5Line } from "react-icons/ri";
// import { IoDocuments,IoDocumentsOutline,IoSettings,IoSettingsOutline } from "react-icons/io5";
// import { MdExplore,MdOutlineExplore  } from "react-icons/md";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  return (
    <div className="flex flex-col w-80 h-full gap-10 place-items-center text-white border border-primaryGray">
      <h3 className="text-xl font-semibold py-5">Finance App</h3>
      <div className="flex flex-col gap-6 text-justify font-semibold">
        <NavLink
          to="/dashboard"
          className={`link ${activeLink ? "active" : ""}`}
          onClick={() => handleLinkClick(0)}
        >
          <button className="flex flex-row gap-2">
            {/* {activeLink ? <RiHome5Fill style={{fontSize: 22}}/> : <RiHome5Line style={{fontSize: 22}}/>}Dashboard */}
            Savings
          </button>
        </NavLink>
        <NavLink
          to="/savings"
          className={`link ${activeLink ? "active" : ""}`}
          onClick={() => handleLinkClick(0)}
        >
          <button className="flex flex-row gap-2">
            {/* {activeLink ? <IoDocuments style={{fontSize: 22}}/> : <IoDocumentsOutline style={{fontSize: 22}}/>}Myinternships */}
            Transactions
          </button>
        </NavLink>
        <NavLink
          to="/transcations"
          className={`link ${activeLink ? "active" : ""}`}
          onClick={() => handleLinkClick(0)}
        >
          <button className="flex flex-row gap-2">
            {/* {activeLink ? <MdExplore style={{fontSize: 22}}/> : <MdOutlineExplore style={{fontSize: 22}}/>}Explore */}
            Investments
          </button>
        </NavLink>
        <NavLink
          to="/investment"
          className={`link ${activeLink ? "active" : ""}`}
          onClick={() => handleLinkClick(0)}
        >
          <button className="flex flex-row gap-2">
            {/* {activeLink ? <IoSettings style={{fontSize: 22}}/> : <IoSettingsOutline style={{fontSize: 22}}/>}Settings */}
            Loans
          </button>
        </NavLink>
        <NavLink
          to="/investment"
          className={`link ${activeLink ? "active" : ""}`}
          onClick={() => handleLinkClick(0)}
        >
          <button className="flex flex-row gap-2">
            {/* {activeLink ? <IoSettings style={{fontSize: 22}}/> : <IoSettingsOutline style={{fontSize: 22}}/>}Settings */}
            Insurance
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
