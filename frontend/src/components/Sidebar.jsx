import {
  FiHome,
  FiFileText,
  FiSearch,
  FiDollarSign,
  FiShield,
  FiTruck,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

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
    name: "Risk Assessment",
    path: "/risk",
    icon: <FiShield />,
  },
  {
    name: "Shipment Tracking",
    path: "/shipments",
    icon: <FiTruck />,
  },
  {
    name: "Clients",
    path: "/clients",
    icon: <FiUsers />,
  },
  {
    name: "Reports & Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    name: "Users & Roles",
    path: "/users",
    icon: <FiUsers />,
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="logo-section">
        <h2>SHNOOR</h2>
        <p>Import Export Intelligence</p>
      </div>

      {/* Navigation */}

      <nav className="menu">

        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
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
  );
}

export default Sidebar;