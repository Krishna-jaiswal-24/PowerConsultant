import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { CSVLink } from "react-csv";

function Allattendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedSiteLocation, setSelectedSiteLocation] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "date",
    "client",
    "dutyType",
    "siteLocation",
    "designation",
    "workCategory",
    "actualGrossSalary",
    "sex",
    "dutyHours",
    "otHours",
  ]);

  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

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

  const columns = [
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },
    { label: "Client", value: "client" },
    { label: "Duty Type", value: "dutyType" },
    { label: "Site Location", value: "siteLocation" },
    { label: "Designation", value: "designation" },
    { label: "Work Category", value: "workCategory" },
    { label: "Actual Gross Salary", value: "actualGrossSalary" },
    { label: "Gender", value: "sex" },
    { label: "Duty Hour", value: "dutyHours" },
    { label: "Overtime Hour", value: "otHours" },
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

  const handleColumnChange = (e) => {
    const value = e.target.value;
    setSelectedColumns((prev) =>
      prev.includes(value)
        ? prev.filter((col) => col !== value)
        : [...prev, value]
    );
  };

  const toggleColumnMenu = () => {
    setIsColumnMenuOpen((prev) => !prev);
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

  const exportData = filteredAttendance.map((user) =>
    selectedColumns.reduce((obj, col) => {
      obj[col] = user[col];
      return obj;
    }, {})
  );

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

              <div className="relative inline-block text-left m-1">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-start w-40 md:w-36 rounded-md border border-black shadow-sm px-4 py-2 bg-white text-sm  text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded={isColumnMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleColumnMenu}
                  >
                    Select Columns
                  </button>
                </div>

                {isColumnMenuOpen && (
                  <div
                    className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      {columns.map((column) => (
                        <div
                          key={column.value}
                          className="flex items-center px-4 py-2"
                        >
                          <input
                            type="checkbox"
                            value={column.value}
                            checked={selectedColumns.includes(column.value)}
                            onChange={handleColumnChange}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label className="ml-3 text-sm font-medium text-gray-700">
                            {column.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-1 md:mx-1 ml-2">
            <CSVLink
              data={exportData}
              filename={"attendance.csv"}
              className="inline-flex items-center justify-start w-36 md:w-36 rounded-md border border-black shadow-sm px-3 py-2 h-9 bg-white text-s  text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              Export
            </CSVLink>
          </div>
            </div>

            <div className="flex ml-1 mt-[5.5rem]  md:my-0">
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
                className="flex cursor-pointer justify-start pl-2 w-36 h-9 items-center border m-1 ml-3 md:ml-2 rounded-md md:mt-2 border-black"
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
                {selectedColumns.includes("name") && (
                  <th className="py-2 border bg-gray-200">Name</th>
                )}
                {selectedColumns.includes("date") && (
                  <th className="py-2 border bg-gray-200">Date</th>
                )}
                {selectedColumns.includes("client") && (
                  <th className="py-2 border bg-gray-200">Client</th>
                )}
                {selectedColumns.includes("dutyType") && (
                  <th className="py-2 border bg-gray-200">Duty Type</th>
                )}
                {selectedColumns.includes("siteLocation") && (
                  <th className="py-2 border bg-gray-200">Site Location</th>
                )}
                {selectedColumns.includes("designation") && (
                  <th className="py-2 border bg-gray-200">Designation</th>
                )}
                {selectedColumns.includes("workCategory") && (
                  <th className="py-2 border bg-gray-200">Work Category</th>
                )}
                {selectedColumns.includes("actualGrossSalary") && (
                  <th className="py-2 border bg-gray-200">Actual Gross Salary</th>
                )}
                {selectedColumns.includes("sex") && (
                  <th className="py-2 border bg-gray-200">Gender</th>
                )}
                {selectedColumns.includes("dutyHours") && (
                  <th className="py-2 border bg-gray-200">Duty Hour</th>
                )}
                {selectedColumns.includes("otHours") && (
                  <th className="py-2 border bg-gray-200">Overtime Hour</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((user) => (
                  <tr key={user._id} className="border-t text-center">
                    {selectedColumns.includes("name") && (
                      <td className="py-2 px-4 border">{user.name}</td>
                    )}
                    {selectedColumns.includes("date") && (
                      <td className="py-2 px-4 border">{user.date}</td>
                    )}
                    {selectedColumns.includes("client") && (
                      <td className="py-2 px-4 border">{user.client}</td>
                    )}
                    {selectedColumns.includes("dutyType") && (
                      <td className="py-2 px-4 border">{user.dutyType}</td>
                    )}
                    {selectedColumns.includes("siteLocation") && (
                      <td className="py-2 px-4 border">{user.siteLocation}</td>
                    )}
                    {selectedColumns.includes("designation") && (
                      <td className="py-2 px-4 border">{user.designation}</td>
                    )}
                    {selectedColumns.includes("workCategory") && (
                      <td className="py-2 px-4 border">{user.workCategory}</td>
                    )}
                    {selectedColumns.includes("actualGrossSalary") && (
                      <td className="py-2 px-4 border">{user.actualGrossSalary}</td>
                    )}
                    {selectedColumns.includes("sex") && (
                      <td className="py-2 px-4 border">{user.sex}</td>
                    )}
                    {selectedColumns.includes("dutyHours") && (
                      <td className="py-2 px-4 border">{user.dutyHours}</td>
                    )}
                    {selectedColumns.includes("otHours") && (
                      <td className="py-2 px-4 border">{user.otHours}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="py-2 px-4 border text-center">
                    No Results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Allattendance;
