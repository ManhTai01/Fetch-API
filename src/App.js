import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState();
  const [usersData, setUsersData] = useState([]);
  const getUsers = async () => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsersData(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "") {
      getUsers();
    } else {
      setId(+e.target.value);
    }
  };
  const handleSubmit = (e) => {
    console.log(id);
    const user = usersData.find((user) => user.id === id);
    if (user) {
      setUsersData(user);
    }
    e.preventDefault();
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <form className="header" onSubmit={handleSubmit}>
          <input
            className="input-control"
            placeholder="Enter ID"
            onChange={handleChange}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length === undefined ? (
              <tr key={usersData.id}>
                <td>{usersData.id}</td>
                <td>{usersData.name}</td>
                <td>{usersData.email}</td>
                <td>
                  {usersData.address.suite},{usersData.address.street},
                  {usersData.address.city},{usersData.address.zipcode}
                </td>
                <td>{usersData.phone}</td>
                <td>{usersData.website}</td>
                <td>{usersData.company.name}</td>
              </tr>
            ) : (
              usersData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.address.suite},{user.address.street},
                      {user.address.city},{user.address.zipcode}
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
