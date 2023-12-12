import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IconArrowsMinimize, IconCircleX } from "@tabler/icons-react";

const Modal = ({
  showModal,
  onCloseModal,
  handleSubmit,
  register,
  createUser,
  isUpdating,
  updateUser,
  errors,
}) => {
  const { setValue } = useForm();

  const submit = (formData) => {
    isUpdating ? updateUser(formData) : createUser(formData);
  };

  useEffect(() => {
    if (!showModal) {
      setValue("first_name", "");
      setValue("last_name", "");
      setValue("email", "");
      setValue("password", ""); // Agregar el campo de contraseña
      setValue("birthday", "");
    }
  }, [showModal, setValue]);

  return (
    <section
      className={`fixed bg-black/60 top-0 left-0 right-0 h-screen flex justify-center items-center transition-all p-2 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-4 [&>label]:grid [&>label]:gap-1 [&>label>span>span]:text-red-500 [&>label>span]:text-sm [&>label>span]:font-semibold bg-white p-4 rounded-md relative w-[min(100%,_280px)]"
      >
        <button
          onClick={onCloseModal}
          type="button"
          className="absolute top-2 right-2 hover:text-blue-900 transition-colors"
        >
          <IconCircleX size={25} />
        </button>
        <h2 className="text-center font-semibold">
          {isUpdating ? "Actualizar usuario" : "Crear usuario"}
        </h2>
        <label>
          <span>
            Nombre: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("first_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </label>
        <label>
          <span>
            Apellido: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("last_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">
              {errors.last_name.message}
            </span>
          )}
        </label>
        <label>
          <span>
            Email: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Formato de email inválido",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </label>
        <label>
          <span>
            Contraseña: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </label>
        <label>
          <span>
            Fecha de nacimiento: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="date"
            {...register("birthday", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.birthday && (
            <span className="text-red-500 text-xs">
              {errors.birthday.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-900 text-white font-semibold p-2 rounded-sm hover:bg-blue-950 transition-all uppercase hover:tracking-widest"
        >
          {isUpdating ? "Guardar cambios" : "Crear"}
        </button>
      </form>
    </section>
  );
};

export default Modal;