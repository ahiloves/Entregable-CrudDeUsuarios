// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserCard from "./UserCard";

// const BASE_URL = "https://users-crud.academlo.tech";

// const UsersList = ({ deleteUser, handleUpdateUser }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/users/`)
//       .then(({ data }) => setUsers(data))
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDeleteUser = (userId) => {
//     axios
//       .delete(`${BASE_URL}/users/${userId}/`)
//       .then(() => {
//         const updatedUsers = users.filter((user) => user.id !== userId);
//         setUsers(updatedUsers);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <section className="grid gap-6 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
//       {users.map((user) => (
//         <article
//           key={user.id}
//           className="border-2 rounded-sm py-2 px-2 hover:shadow-lg transition-shadow grid gap-2"
//         >
//           <h2 className="mb-1 pb-2 border-b capitalize font-bold text-lg line-clamp-1">
//             {user.first_name} {user.last_name}
//           </h2>
//           <ul className="mb-1 pb-2 border-b">
//             <li>
//               <span className="font-semibold text-gray-400">EMAIL</span> {user.email}
//             </li>
//             <li>
//               <span className="font-semibold text-gray-400">CUMPLEAÑOS</span>{" "}
//               {user.birthday}
//             </li>
//           </ul>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={() => handleUpdateUser(user)}
//               className="rounded-md p-1 text-white bg-yellow-500 hover:shadow-lg hover:bg-yellow-400 transition-colors"
//             >
//               Editar
//             </button>
//             <button
//               onClick={() => handleDeleteUser(user.id)}
//               className="rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"
//             >
//               Eliminar
//             </button>
//           </div>
//         </article>
//       ))}
//     </section>
//   );
// };

// export default UsersList;




import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const BASE_URL = "https://users-crud.academlo.tech";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/users/`)
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = (userId) => {
    axios.delete(`${BASE_URL}/users/${userId}/`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        setSelectedUser(null);
      })
      .catch((err) => console.log(err));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <section className="grid gap-6 top-2 right-2 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      ))}
    </section>
  );
};

export default UsersList;