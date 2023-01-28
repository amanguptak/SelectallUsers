import React, { useEffect, useReducer, useState } from "react";
import "./user.css";
import axios from "axios";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users"
      );
      setUsers(res.data);
    };
    fetchUsers();
    
  }, [users]);
  let month_name = (dt) => {
    let mlist = [
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
    return mlist[dt];
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
        let tempUser = users.map((user) =>
          {return { ...user, isChecked: checked }}
      );
      setUsers(tempUser);

    } else {
      let tempUser = users.map((user) =>
        user.id === name? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <div className="container">
      <table className="head">
        <tr className="detail">
          <th>
            Select All{" "}
            <input type="checkbox" name="all" onChange={handleChange} checked={users.filter(user=> user?.isChecked!==true).length<1}/>
          </th>
          <th>User Id</th>
          <th>User </th>
          <th>Email</th>
          <th>CreatedAt</th>
        </tr>

        {users.length === 0 ? (
          <tr>
            <td>
              <h1>No data</h1>
            </td>
          </tr>
        ) : (
          users.map((item) => (
            <tr className="users">
              <input
                type="checkbox"
                name={item.id}
                checked={item?.isChecked || false}
                onChange={handleChange}
              />
              <th>{item.id}</th>
              <td>
                <img src={item.avatar} alt="img not available" />
              </td>
              <td>{item.email}</td>
              {new Date(item.createdAt).getDate()}{" "}
              {month_name(new Date(item.createdAt).getMonth())}{" "}
              {new Date(item.createdAt).getFullYear()}{" "}
            </tr>
          ))
        )}
      </table>
    </div>
  );
}

export default Users;
