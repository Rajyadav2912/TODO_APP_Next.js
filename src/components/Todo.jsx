import React from "react";

const Todo = ({
  id,
  title,
  description,
  complete,
  mongoId,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id + 1}
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">{complete ? "Complete" : "Pending"}</td>
      <td className="px-6 py-4 flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 shadow hover:shadow-stone-400 text-white rounded-2xl"
          onClick={() => updateTodo(mongoId)}
        >
          Done
        </button>
        <button
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white shadow hover:shadow-stone-400 rounded-2xl"
          onClick={() => deleteTodo(mongoId)}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default Todo;
