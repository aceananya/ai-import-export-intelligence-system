import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@shnoor.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "ABC Exports",
      email: "abc@gmail.com",
      role: "Customer",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");

  const addUser = () => {
    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setUsers([...users, newUser]);

    setName("");
    setEmail("");
    setRole("Customer");

    setShowForm(false);
  };

  const updateRole = (id, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, role: newRole }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(
      users.filter(
        (user) => user.id !== id
      )
    );
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Users & Roles
      </h1>

      <p className="text-gray-500 mb-8">
        Manage system users.
      </p>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Admins
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              users.filter(
                (u) => u.role === "Admin"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              users.filter(
                (u) => u.role === "Customer"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Add User */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            User Management
          </h2>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add User
          </button>

        </div>

        {showForm && (

          <div className="grid grid-cols-4 gap-4 mt-6">

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Customer</option>
            </select>

            <button
              onClick={addUser}
              className="bg-green-600 text-white rounded-lg"
            >
              Save
            </button>

          </div>

        )}

      </div>

      {/* Users Table */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Role
              </th>

              <th className="text-left py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-4">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Customer</option>
                  </select>

                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;