import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { DataGrid } from "@material-ui/data-grid";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "react-modal";

import ApiService from "../../../Sevices/ApiService";

import ApiUrl from "../../../ServerApi";
import AddUserComponent from "./AddUserComponent";
import EditUserComponent from "./EditUserComponent";
import Appcontext from "./data/Appcontext";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70vw",
    //width: "100%",
    height: "70vh",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "50%",
    height: "50%",

    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2%",
  },
};
const fetchuser = async () => {
  let ress = await ApiService.fetchUsers();
  console.log("rkijriotjioprjtfgjeriogj",ress);
  return ress;
}


const Runz = (props) => {
  let rows = [];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

 



  // model setup
  const openModal = () => {
    // window.localStorage.clear();
    setModalOpenAdd(() => true);
  };

  const openModale = () => setModalOpenEdit(() => true);

  const closeModal = () => setModalOpenAdd(() => false);

  const closeModale = () => setModalOpenEdit(() => false);

  const { details } = useContext(Appcontext);

  const value = async () => {
    const usersdum = await ApiService.fetchUsers().then((res) => res);
    console.log("asdsaddsadafdwfsfas", usersdum)

    setUsers(() => usersdum.data.data);
  };

  useEffect(() => {
    value();
  }, [modalOpenAdd, modalOpenEdit]);

  //
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteUser = async (userId) => {
    await ApiService.deleteUser(userId).then(() => {
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      setMessage("User deleted successfully.");
    });
    const deleteUser = users.find((user) => user._id === userId);
    await axios.delete(`${ApiUrl}/notes/${deleteUser.runID}`);
    setOpen(true);
  };

  const editUser = (id) => {
    //window.localStorage.clear();
    window.localStorage.setItem("userId", id);
    openModale();
  };

  const playUser = (id) => {
    window.localStorage.removeItem("userId");
    window.localStorage.setItem("userId", id);
    props.history.push(`/userdash/${id}`);
  };

  users.map((user, ident) => {

    if (user.userid == details._id)
      return rows.push({
        id: ident,
        ProcedureId: user._id,
        TemplateId: user.runID.slice(user.runID.length - 12),
        ProcedureName: user.experimentName,
        LabName: user.labType,
        ExperimentName: user.experimentName,
        editUser: () => editUser(user._id),
        deleteUser: () => deleteUser(user._id),
      })
  }
  );

  return (
    <div className={classes.root}>
      <Button
        style={{
          border: "none",
          position: "absolute",
          top: "60px",
          right: "20px",
        }}
        onClick={() => openModal()}
      >
        <AddCircleOutlineIcon style={{ fontSize: "3.5em" }} />
      </Button>
      <Modal
        isOpen={modalOpenAdd}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"

      >
        <AddUserComponent closeModal={closeModal} />
      </Modal>

      <Modal
        isOpen={modalOpenEdit}
        onRequestClose={closeModale}
        style={customStyles}
        contentLabel="Example Modal"

      >
        <EditUserComponent closeModale={closeModale} />
      </Modal>
      {rows ? (
        <DataGrid
          pagination
          columns={[
            {
              field: "ProcedureId",
              headerName: "ID",
              description: "The identification used Procedure Sequence.",
              width: 100,
              thisRow: "",
              renderCell(params) {
                const onClick = () => {
                  const api = params.api;

                  const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);

                  this.thisRow = {};
                  fields.forEach((f) => {
                    this.thisRow[f] = params.row?.[f];
                    console.log("Parameter : ", this.thisRow[f]);
                  });

                  return playUser(this.thisRow["ProcedureId"]);
                };
                return (
                  <Button style={{ width: "100%" }} onClick={onClick}>
                    {params["id"] + 1}
                  </Button>
                );
              },
            },
            {
              field: "ProcedureName",
              headerName: "Procedure Name",
              width: 190,
            },
            { field: "TemplateId", headerName: "Template Id", width: 170 },

            {
              field: "ExperimentName",
              headerName: "Experiment Name",
              width: 200,
            },
            { field: "LabName", headerName: "Lab Name", width: 170 },

            {
              field: "editUser",
              headerName: "Edit User",
              width:150,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  const api = params.api;

                  const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);

                  const thisRow = {};
                  fields.forEach((f) => {
                    thisRow[f] = params.row?.[f];
                  });

                  return editUser(thisRow["ProcedureId"]);
                };
                return <Button onClick={onClick}>Edit</Button>;
              },
            },
            {
              field: "deleteUser",
              headerName: "Delete User",
              width:150,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  const api = params.api;

                  const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);

                  const thisRow = {};

                  fields.forEach((f) => {
                    thisRow[f] = params.row?.[f];
                  });

                  return deleteUser(thisRow["ProcedureId"]);
                };
                return <Button onClick={onClick}>Delete</Button>;
              },
            },
          ]}
          rows={rows}
        />
      ) : null}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Runz;
