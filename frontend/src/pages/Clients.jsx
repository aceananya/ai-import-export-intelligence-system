import { useState } from "react";

function Clients() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "ABC Exports",
      country: "USA",
      email: "abc@gmail.com",
      phone: "+1 987654321",
      status: "Active",
      risk: 95,
    },
    {
      id: 2,
      name: "Global Trade",
      country: "UAE",
      email: "global@gmail.com",
      phone: "+971 123456789",
      status: "Active",
      risk: 45,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [risk, setRisk] = useState(30);
  const addClient = () => {
    if (
      !name ||
      !country ||
      !email ||
      !phone
    ) {
      alert("Fill all fields");
      return;
    }

    const newClient = {
      id: Date.now(),
      name,
      country,
      email,
      phone,
      status: "Active",
      risk: Math.floor(Math.random() * 100) 
    };

    setClients([...clients, newClient]);

    setName("");
    setCountry("");
    setEmail("");
    setPhone("");
    setRisk(30);

    setShowForm(false);
  };

  const deleteClient = (id) => {
    setClients(
      clients.filter(
        (client) => client.id !== id
      )
    );
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Clients
      </h1>

      <p className="text-gray-500 mb-8">
        Manage import-export clients.
      </p>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Total Clients
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {clients.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Active Clients
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              clients.filter(
                (c) => c.status === "Active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            New This Month
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {clients.length}
          </h2>
        </div>

      </div>

      {/* Add Client */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            Client Management
          </h2>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add Client
          </button>

        </div>

        {showForm && (

          <div className="grid grid-cols-4 gap-4 mt-6">

            <input
              type="text"
              placeholder="Client Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
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

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="border rounded-lg p-3"
            />

          </div>

        )}

        {showForm && (

          <button
            onClick={addClient}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Save Client
          </button>

        )}

      </div>

      {/* Client Table */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left py-3">
                Client
              </th>

              <th className="text-left py-3">
                Country
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Phone
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Risk Score
              </th>
              <th className="text-left py-3">
                Action
             </th>

            </tr>
          </thead>

          <tbody>

            {clients.map((client) => (

              <tr
                key={client.id}
                className="border-b"
              >

                <td className="py-4">
                  {client.name}
                </td>

                <td>
                  {client.country}
                </td>

                <td>
                  {client.email}
                </td>

                <td>
                  {client.phone}
                </td>

                <td>
                  <span className="text-green-600 font-medium">
                    {client.status}
                  </span>
                </td>
                <td>
                  {client.risk}%
                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteClient(client.id)
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

export default Clients;