import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconEdit, IconGift, IconTrash } from "@tabler/icons-react";

const BASE_URL = "https://users-crud.academlo.tech";


const UserCard = ({ user, onDeleteUser, onEditUser }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
  });
  

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birthday: user.birthday,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (user) {
      axios.put(`${BASE_URL}/users/${user.id}/`, formData)
        .then(() => {
          onEditUser(null);
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            birthday: "",
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios.post(`${BASE_URL}/users/`, formData)
        .then(() => {
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            birthday: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <article className="border-2 rounded-sm py-2 px-2 hover:shadow-lg transition-shadow grid gap-2">
      <h2 className="mb-1 pb-2 border-b capitalize font-bold text-lg line-clamp-1">
        {formData.first_name} {formData.last_name}
      </h2>
      <ul className="mb-1 pb-2 border-b">
        <li >
          <span className="font-semibold text-gray-400">EMAIL</span> 
          
        </li>
        <li>{formData.email}</li>
        <li>
          <span className="font-semibold text-gray-400">CUMPLEANOS</span> 
          
        </li>
        
        <li className="flex gap-2">
        <IconGift /> {formData.birthday}</li>
      </ul>
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => handleUpdateUser(user)}
          className="rounded-md p-1 text-white bg-yellow-500 hover:shadow-lg hover:bg-yellow-400 transition-colors"
        >
        <IconEdit />
        </button  >
        <button
          onClick={() => handleDeleteUser(user.id)}
          className="rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"
        >
        <IconTrash />
        </button>
      </div>
    </article>
  );
};

export default UserCard;