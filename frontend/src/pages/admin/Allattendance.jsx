import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'

function Allattendance() {
  return (
    <div>
        <AdminNavbar/>
        <div>
            here we will display attendance of all the users, and we can filter out according to month, location, and all,

            we'll have a table with the followig details
            <div>
                date, name, username, dutyType, siteLocation 
            </div>
        </div>
    </div>
  )
}

export default Allattendance