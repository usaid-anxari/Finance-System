import React from "react";

const DeleteAlert = ({ content, onDelte }) => {
  return <div>
    <p className="text-sm"> {content} </p>
    <div className="flex justify-end mt-6">
        <button className="add-btn add-btn-fill" onClick={onDelte} type="button">Delete</button>
    </div>
  </div>;
};

export default DeleteAlert;
