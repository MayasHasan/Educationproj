import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ setDeleteModal,setToggleCleared, toggleCleared ,deleteItem}) => {

  const handleDelete = () => {
    deleteItem()
    setToggleCleared(!toggleCleared)
    setDeleteModal(false)
  };


  const handeltoggle=()=>{
    setDeleteModal(false)
    setToggleCleared(!toggleCleared)
  }


  return (
    <div className="modal">
      <div className="deleteBox-Confirm">
        <h3>Are you sure you want to Delete ? </h3>
        <div className="deleteModal-btn">
          <button
            className="yes-btn"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button className="no-btn" onClick={handeltoggle}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
