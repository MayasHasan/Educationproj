import React,{useEffect} from 'react';
import "./AdminSessions.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/formik/FormikField";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import DataTableComponent from '../../components/dataTable/DataTableComponent';
import { getSessions,reset } from '../../api/sessions/sessionSlice';
import Header from './../../components/header/Header';

const AdminSessions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { sessions, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.session
    );
        const initialValues = {
 
          sessionDate: "",
          searchString:"",
          pageNumber:1,
          pageSize:10000,

          };
          var columns = [
            {
              name :"Session Title",
              selector: row => row.sessionTitle , 
              sortable:true,
           sortFiled:"sessionTitle"
            },
           
            {
              name :"Session Date",
              selector: row => row.date,
              sortable:true,
              sortFiled:"date"
            },
            
            {
              name : "Action",
          cell : (row)=>(
           <>
          <button style={{color:"white" , border:"none" , background:"blue", width:"50px" , height:"25px" , cursor:"pointer"}} onClick={()=>navigate(`/sessionDetails/${row.sessionId}`)}>View</button>
          
          </>
         )
            }
          ];
          const handleDelete = () => { 
           
            };
            const setItemToDelete = () => { 
           
            };
          const onSubmit = (values) => {
            dispatch(getSessions(values))
            
          };
 
          useEffect(() => {
            dispatch(reset()); 
            dispatch(getSessions(initialValues))
          }, [dispatch]);
        

        return (
            <div className="adminSessions">
            <Header title={"Sessions"}/>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Form className="adminSessionform">
                <div className="searchSessionItem">
                  <FormikField
                    label="Session Title"
                    name="searchString"
                    type="text"
                    placeholder="Enter Session Title"
                  />
                </div>
                <div className="searchSessionItem">
                  <FormikField
                    label="Date"
                    name="sessionDate"
                    type="date" 
                  />
                </div>       
                <div className="adminSession-btn">
                  <button type="submit" className="adminSessionSearch-btn">
                    Search
                  </button>
                  <button type="button" className="adminReset-btn">
                    Reset
                  </button>
                </div>
              </Form>
            </Formik>
            <div>
            <DataTableComponent columns={columns} selectableRows={true} title={`Total of Sessions ${sessions.length}`}
          data={sessions} isLoading={isLoading} setItemToDelete={setItemToDelete} deleteItem={handleDelete}  /> 
            </div>
          </div>
        );
      };
export default AdminSessions;
