import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const BASE_URL = "https://users-crud.academlo.tech";

const UsersList = ({ deleteUser, handleUpdateUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/`)
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = (userId) => {
    axios
      .delete(`${BASE_URL}/users/${userId}/`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="grid gap-6 top-2 right-2 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
      {users.map((user) => (
        <article
          key={user.id}
          className="border-2 rounded-sm py-2 px-2 hover:shadow-lg transition-shadow grid gap-2"
        >
          <h2 className="mb-1 pb-2 border-b capitalize font-bold text-lg line-clamp-1">
            {user.first_name} {user.last_name}
          </h2>
          <ul className="mb-1 pb-2 border-b">
            <li>
              <span className="font-semibold text-gray-400">EMAIL</span> 
            </li>
            <li>{user.email}</li>
            <li>
              <span className="font-semibold text-gray-400">CUMPLEAÑOS</span>{" "}
            </li>
            <li>{user.birthday}</li>
          </ul>
          <div className="flex gap-3 justify-end">
          <button
              onClick={() => handleDeleteUser(user.id)}
              className="rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"
            >
            <IconTrash />
            </button>
            <button
              onClick={() => handleUpdateUser(user)}
              className="rounded-md p-1 text-gray-500 bg-red-100 hover:shadow-lg hover:bg-red-200 transition-colors shadow-sm"
            >
            <IconEdit />
            </button>
           
          </div>
        </article>
      ))}
    </section>
  );
};

export default UsersList;