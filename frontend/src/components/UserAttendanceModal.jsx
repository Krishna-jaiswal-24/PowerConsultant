import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import axios from "axios";

function UserAttendanceModal({ isOpen, onRequestClose, userId, editDetail }) {
  const [date, setDate] = useState("");
  const [dutyHours, setDutyHours] = useState("");
  const [otHours, setOtHours] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [remark, setRemark] = useState("");
  const [dutyType, setDutyType] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/client");
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();

    if (editDetail) {
      setDate(editDetail.date);
      setDutyHours(editDetail.dutyHours);
      setOtHours(editDetail.otHours);
      setSiteLocation(editDetail.siteLocation);
      setRemark(editDetail.remark);
      setDutyType(editDetail.dutyType);
    } else {
      setDate("");
      setDutyHours("");
      setOtHours("");
      setSiteLocation("");
      setRemark("");
      setDutyType("");
    }
  }, [editDetail]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      userId,
      date,
      dutyType,
      dutyHours,
      otHours,
      siteLocation: selectedClient.siteLocation,
      remark,
      client: selectedClient.clientName,
    };

    try {
      if (editDetail) {
        await axios.put(`http://localhost:8000/api/user/attendance/${editDetail._id}`, formData);
      } else {
        await axios.post("http://localhost:8000/api/user/attendance", formData);
      }
      onRequestClose();
      setDate("");
      setDutyHours("");
      setOtHours("");
      setSiteLocation("");
      setRemark("");
      setDutyType("");
      setSelectedClient({});
    } catch (error) {
      console.error("Error saving attendance detail:", error);
    }
  };

  const handleCancel = () => {
    onRequestClose();
    setDate("");
    setDutyHours("");
    setOtHours("");
    setSiteLocation("");
    setRemark("");
    setDutyType("");
    setSelectedClient({});
  };

  const handleChangeDutyType = (event) => {
    setDutyType(event.target.value);
    if (event.target.value === "OnSite") {
      setDutyHours("9:30AM to 7:30PM");
      setDutyHours("10");
    } else {
      setDutyHours("");
    }
  };

  const handleClientChange = (event) => {
    const clientId = event.target.value;
    const client = clients.find(client => client._id === clientId);
    if (client) {
      setSiteLocation(client.siteLocation);
      setSelectedClient(client);
    } else {
      setSiteLocation("");
      setSelectedClient({});
    }
  };

  const isSmallScreen = window.innerWidth <= 768;

  const customStyles = {
    content: {
      borderRadius: '20px',
      width: isSmallScreen ? '80%' : '40%',
      margin: 'auto'
    },
  };

  return (
      <div>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
          <div className="flex justify-end" onClick={() => { onRequestClose(); setDate(""); setDutyHours(""); setOtHours(""); setSiteLocation(""); setRemark(""); setDutyType(""); setSelectedClient({}); }}>
            <IoClose className="text-4xl cursor-pointer" />
          </div>
          <div className="flex justify-center items-center my-20">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {editDetail ? "Edit Attendance Details" : "Add Details for Attendance"}
              </h2>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                    Date:
                  </label>
                  <input
                      type="date"
                      id="date"
                      placeholder="dd/mm/yyyy"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label>Duty Type:</label>
                  <select
                      name="dutyType"
                      value={dutyType}
                      onChange={handleChangeDutyType}
                      className="block w-full mt-1 p-2 border"
                      required
                  >
                    <option value="">Select</option>
                    <option value="OnSite">On-Site</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="dutyHours" className="block text-gray-700 text-sm font-bold mb-2">
                    Duty Hours Details:
                  </label>
                  <input
                      type="text"
                      id="dutyHours"
                      placeholder="Duty Hours Details"
                      value={dutyType === "OnSite" ? "9:30AM to 7:30PM" : dutyHours}
                      onChange={(e) => setDutyHours(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled={dutyType === "OnSite"}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="otHours" className="block text-gray-700 text-sm font-bold mb-2">
                    OT Hours:
                  </label>
                  <input
                      type="number"
                      id="otHours"
                      placeholder="Hours"
                      value={otHours}
                      onChange={(e) => setOtHours(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="siteLocation" className="block text-gray-700 text-sm font-bold mb-2">
                    Client and Site Location:
                  </label>
                  <select
                      id="siteLocation"
                      value={selectedClient._id || ""}
                      onChange={handleClientChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Site Location</option>
                    {clients.map(client => (
                        <option key={client._id} value={client._id}>
                          {client.clientName} - {client.siteLocation}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="remark" className="block text-gray-700 text-sm font-bold mb-2">
                    Remark:
                  </label>
                  <input
                      type="text"
                      id="remark"
                      placeholder="Remark"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
  );
}

export default UserAttendanceModal;
