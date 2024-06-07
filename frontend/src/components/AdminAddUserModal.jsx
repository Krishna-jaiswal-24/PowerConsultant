// import React from 'react'

// function AdminAddUserModal() {
//   return (
//     <form onSubmit={handleSubmit} className="p-4 space-y-4">
//       <div>
//         <label>Full Name of the Employee</label>
//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Username</label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Father/Husband Name</label>
//         <input
//           type="text"
//           name="fatherOrHusbandName"
//           value={formData.fatherOrHusbandName}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>DOB</label>
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Age</label>
//         <input
//           type="text"
//           name="age"
//           value={formData.age}
//           readOnly
//           className="block w-full mt-1 p-2 border"
//         />
//       </div>
//       <div>
//         <label>Sex</label>
//         <select
//           name="sex"
//           value={formData.sex}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         >
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//       <div>
//         <label>DOJ</label>
//         <input
//           type="date"
//           name="doj"
//           value={formData.doj}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Nature of Work / Designation</label>
//         <select
//           name="designation"
//           value={formData.designation}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         >
//           <option value="">Select Industry</option>
//           {industries.map((industry, index) => (
//             <option key={index} value={industry}>
//               {industry}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Category</label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Address</label>
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Phone</label>
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Actual Gross Salary</label>
//         <input
//           type="number"
//           name="grossSalary"
//           value={formData.grossSalary}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <div>
//         <label>Email ID</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border"
//           required
//         />
//       </div>
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default AdminAddUserModal