import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function Allattendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedSiteLocation, setSelectedSiteLocation] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/attendance"
      );
      setAttendance(response.data.data);
      console.log("All the user attendance is shown: ", attendance);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedClient("");
    setSelectedSiteLocation("");
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredAttendance = attendance.filter((user) => {
    const matchesSearchTerm =
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.client &&
        user.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.date && user.date.includes(searchTerm)) ||
      (user.dutyType &&
        user.dutyType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.siteLocation &&
        user.siteLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.designation &&
        user.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.workCategory &&
        user.workCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.actualGrossSalary &&
        user.actualGrossSalary.toString().includes(searchTerm)) ||
      (user.sex && user.sex.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.dutyHours && user.dutyHours.toString().includes(searchTerm)) ||
      (user.otHours && user.otHours.toString().includes(searchTerm));

    const matchesDateFilter =
      user.date &&
      (selectedMonth === "" ||
        new Date(user.date).getMonth() === months.indexOf(selectedMonth)) &&
      (selectedYear === "" ||
        new Date(user.date).getFullYear().toString() === selectedYear);

    const matchesClientFilter =
      selectedClient === "" || (user.client && user.client === selectedClient);
    const matchesSiteLocationFilter =
      selectedSiteLocation === "" ||
      (user.siteLocation && user.siteLocation === selectedSiteLocation);

    return (
      matchesSearchTerm &&
      matchesDateFilter &&
      matchesClientFilter &&
      matchesSiteLocationFilter
    );
  });

  const handleClientName = (e) => {
    setSelectedClient(e.target.value);
  };
  const handleSiteLocation = (e) => {
    setSelectedSiteLocation(e.target.value);
  };

  const extractUniqueYears = (attendance) => {
    const years = attendance.map((user) => new Date(user.date).getFullYear());
    return [...new Set(years)];
  };

  const uniqueYears = extractUniqueYears(attendance);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 md:p-8 overflow-scroll min-h-[30rem] md:overflow-hidden">
        <div className="py-4 flex md:flex-row-reverse w-full md:justify-between flex-col-reverse ">
          <div className="AllTheFilterOpt flex flex-col md:flex-row md:mt-[0.5rem]">
            <div className="filterOptionList flex h-10 md:h-11 mt-1 flex-wrap">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="p-1 border border-black rounded mr-2 w-40 m-1"
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="p-1 mr-2 border border-black rounded w-36 m-1"
              >
                <option value="">Select Year</option>
                {uniqueYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={selectedClient}
                onChange={handleClientName}
                className="p-1 mr-2 m-1 border border-black rounded"
              >
                <option value="">
                  {selectedClient === "" ? "Client" : selectedClient}
                </option>
                {attendance.map((user) => (
                  <option key={user._id} value={user.client}>
                    {user.client}
                  </option>
                ))}
              </select>
              <select
                value={selectedSiteLocation}
                onChange={handleSiteLocation}
                className="p-1 mr-2 m-1 border border-black rounded"
              >
                <option value="">
                  {selectedSiteLocation === ""
                    ? "Site Location"
                    : selectedSiteLocation}
                </option>
                {attendance.map((user) => (
                  <option key={user._id} value={user.siteLocation}>
                    {user.siteLocation}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex ml-1 mt-11  md:my-0">
              <div className="">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 border h-9 mt-1 md:h-9 border-black rounded mb-4 w-40  md:mt-[0.5rem]"
                />
              </div>

              <div
                className="flex cursor-pointer justify-start pl-2 w-36 h-9 items-center border m-1 ml-3 rounded-md md:mt-2 border-black"
                onClick={clearSearch}
              >
                <div className="items-center">Clear Filters</div>
              </div>
            </div>
          </div>

          <div className="my-4 text-2xl md:ml-8">All Attendance:</div>
        </div>

        <div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border bg-gray-200">Name</th>
                <th className="py-2 border bg-gray-200">Date</th>
                <th className="py-2 border bg-gray-200">Client</th>

                <th className="py-2 border bg-gray-200">Duty Type</th>
                <th className="py-2 border bg-gray-200">Site Location</th>
                <th className="py-2 border bg-gray-200">Designation</th>
                <th className="py-2 border bg-gray-200">Work Category</th>
                <th className="py-2 border bg-gray-200">Actual Gross Salary</th>
                <th className="py-2 border bg-gray-200">Gender</th>
                <th className="py-2 border bg-gray-200">Duty Hour</th>
                <th className="py-2 border bg-gray-200">Overtime Hour</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((user) => (
                <tr key={user._id} className="border-t text-center">
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.date}</td>
                  <td className="py-2 px-4 border">{user.client}</td>
                  <td className="py-2 px-4 border">{user.dutyType}</td>
                  <td className="py-2 px-4 border">{user.siteLocation}</td>
                  <td className="py-2 px-4 border">{user.designation}</td>
                  <td className="py-2 px-4 border">{user.workCategory}</td>
                  <td className="py-2 px-4 border">{user.actualGrossSalary}</td>
                  <td className="py-2 px-4 border">{user.sex}</td>
                  <td className="py-2 px-4 border">{user.dutyHours}</td>
                  <td className="py-2 px-4 border">{user.otHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Allattendance;
