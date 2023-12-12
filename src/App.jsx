import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import UsersList from "./components/UsersList";

const BASE_URL = "https://users-crud.academlo.tech";

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "", // Agrega el campo de contraseña
      birthday: "",
    });
    setUserToEdit(null);
  };

  const handleUpdateUser = (user) => {
    handleOpenModal();
    setUserToEdit(user);
  };

  const createUser = (newUser) => {
    axios
      .post(BASE_URL + "/users/", newUser)
      .then(({ data: newUser }) => {
        setUsers([...users, newUser]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (userIdToDelete) => {
    axios
      .delete(BASE_URL + `/users/${userIdToDelete}/`)
      .then(() => {
        const newUsers = users.filter(
          (user) => user.id !== userIdToDelete
        );
        setUsers(newUsers);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (user) => {
    axios
      .put(BASE_URL + `/users/${userToEdit.id}/`, user)
      .then(({ data: updatedUser }) => {
        const newUsers = users.map((user) =>
          user.id === userToEdit.id ? updatedUser : user
        );
        setUsers(newUsers);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/users/")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userToEdit !== null) {
      reset(userToEdit);
    }
  }, [userToEdit]);

  return (
    <main className="text-[18px] p-12 ">
      <header className="flex justify-between p-2">
        <h1 className="text-center text-blue-900 text-2xl font-extrabold p-2">Usuarios</h1>
        <button
          className="bg-blue-900 text-white text-sm font-sm p-3 rounded-sm hover:bg-blue-950 transition-all flex gap-1 items-center"
          onClick={handleOpenModal}
        >
          <IconPlus /> Crear nuevo usuario 
        </button>
      </header>
      <Modal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        register={register}
        createUser={createUser}
        isUpdating={!!userToEdit}
        updateUser={updateUser}
        errors={errors}
      />
      <UsersList
        users={users}
        deleteUser={deleteUser}
        handleUpdateUser={handleUpdateUser}
      />
    </main>
  );
}

export default App;