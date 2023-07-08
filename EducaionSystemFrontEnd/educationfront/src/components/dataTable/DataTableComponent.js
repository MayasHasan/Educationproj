import DataTable from "react-data-table-component";
import React,{useState} from "react";
import "./DataTableComponent.css";
import DeleteModal from "../deleteModal/DeleteModal";
import { useSelector } from "react-redux";



const DataTableComponent = ({columns,selectableRows , isLoading,setItemToDelete,data,deleteItem,title}) => {
  const { user} = useSelector((state) => state.auth);

	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
    setItemToDelete(selectedRows)

  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        marginTop: "20px",
        fontWeight: "bold",
        color: "blue",
        fontSize: "18px",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    
    },
    cells: {
      style: {
        fontSize: "17px",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };


  
  // const contextActions = React.useMemo(() => {
	// 	const handleDelete = () => {
	// 		if (window.confirm(`Are you sure you want to delete?`)) {
  //       deleteItem();
	// 			setToggleCleared(!toggleCleared);
	// 		}
	// 	};


	// 	return (
	// 		<button className="delete-btn" onClick={handleDelete}>
	// 			Delete
	// 		</button>
	// 	);
	// }, [ selectedRows, toggleCleared]);



  const contextActions = React.useMemo(() => {
		const handleDelete = () => {
      setDeleteModal(true)
		};


		return (
			<button className="delete-btn" onClick={handleDelete}>
				Delete
			</button>
		);
	}, [ selectedRows, toggleCleared]);


  return (
<>
    <DataTable
    title={title}
      columns={columns}
      data={data}
      fixedHeader
      fixedHeaderScrollHeight="470px"
      pagination
      customStyles={customStyles}
      progressPending={isLoading}
      selectableRowsHighlight
      highlightOnHover
      dense
      selectableRows = {user.roles.includes("Teacher") ? selectableRows : false}
      onSelectedRowsChange={handleChange}
			contextActions={contextActions}
			clearSelectedRows={toggleCleared}

    ></DataTable>

    {deleteModal && (
      <DeleteModal setDeleteModal={setDeleteModal} setToggleCleared={setToggleCleared} toggleCleared={toggleCleared} setconfirmDelete={setconfirmDelete} deleteItem={deleteItem}/>

    )}
          </>
  );
};

export default DataTableComponent;
