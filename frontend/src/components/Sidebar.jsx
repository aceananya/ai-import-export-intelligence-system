
import {
  FiHome,
  FiFileText,
  FiSearch,
  FiDollarSign,
  FiTruck,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiHome />,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <FiFileText />,
  },
  {
    name: "HSN Classification",
    path: "/hsn",
    icon: <FiSearch />,
  },
  {
    name: "Duty Calculator",
    path: "/duty",
    icon: <FiDollarSign />,
  },
  {
    name: "Shipment Tracking",
    path: "/shipments",
    icon: <FiTruck />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <FiShoppingCart />,
  },
  {
    name: "Reports & Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    name: "Invoices",
    path: "/invoices",
    icon: <FiFileText />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="logo-section">
          <h2>TradeNexa</h2>
          <p>Import Export Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`menu-item ${
                location.pathname === item.path
                  ? "active"
                  : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="logout"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;

