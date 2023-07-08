import React, { useState, useEffect } from "react";
import "./AdminStudents.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/formik/FormikField";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikSelect from "./../../components/formik/FormikSelect";
import { getStudents, deleteStudent } from "../../api/students/studentSlice";
import DataTableComponent from "./../../components/dataTable/DataTableComponent";
import Header from "./../../components/header/Header";
const AdminStudents = () => {
  const [studentToDelete, setStudentToDelete] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, isDeleted, isSuccess, isLoading } = useSelector(
    (state) => state.student
  );

  var columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      sortFiled: "First Name",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      sortFiled: "Last Name",
    },
    {
      name: "Joined Date",
      selector: (row) => row.joinedDate,
      sortable: true,
      sortFiled: "Joined Date",
    },
  
  ];

  useEffect(() => {
    dispatch(getStudents(initialValues));
  }, [dispatch]);

  const initialValues = {
    searchString: "",
    joinedDateFrom: "",
    level: "",
    joinedDateTo: "",
    pageNumber: 1,
    pageSize: 10000,
  };

  const onSubmit = (values) => {
    dispatch(getStudents(values));
  };

  const handleDelete = () => {
    dispatch(deleteStudent(studentToDelete[0].teacherId));
  };

  return (
    <div className="adminStudents">
      <Header title={"Students"} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="adminStudentform">
          <div className="searchStudentItem">
            <FormikField
              label="Student Name"
              name="searchString"
              type="text"
              placeholder="Enter Student Name"
            />
          </div>
          <div className="searchStudentItem">
            <FormikField label="From" name="joinedDateFrom" type="date" />
          </div>
          <div className="searchStudentItem">
            <FormikField label="To" name="joinedDateTo" type="date" />
          </div>
          <div className="adminStudent-btn">
            <button type="submit" className="adminStudentSearch-btn">
              Search
            </button>
            <button type="reset" className="adminReset-btn">
              Reset
            </button>
          </div>
        </Form>
      </Formik>
      <div>
        <DataTableComponent
          columns={columns}
          selectableRows={true}
          title={`Total of Students ${students.length}`}
          data={students}
          isLoading={isLoading}
          setItemToDelete={setStudentToDelete}
          deleteItem={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminStudents;
