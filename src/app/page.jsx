"use client";

import Todo from "@/components/Todo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface FormData {
//   title: string;
//   description: string;
// }

// interface TodoItem {
//   id: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
// }

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await axios.post("/api", formData);

    toast.success(response.data.msg);

    // Clear the form fields after submission
    setFormData({ title: "", description: "" });

    // Refresh the todos after adding a new one
    await fetchTodos();

    console.log(formData);
  };

  // console.log(todoData.data);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      setTodoData(response.data.data);
      // console.log(response.data.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });

    toast.success(response.data.msg);

    fetchTodos();
  };

  const updateTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );

    toast.success(response.data.msg);

    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <form className="flex items-start flex-col gap-2 w-[80%] text-black max-w-[600px] mt-24 px-2 mx-auto">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={changeHandler}
          placeholder="Enter title"
          className="px-3 py-2 border-2 w-full rounded-xl"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={changeHandler}
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full rounded-xl"
        ></textarea>
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-orange-500 text-white font-bold rounded-xl py-3 px-11"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-16 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={item.id}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
