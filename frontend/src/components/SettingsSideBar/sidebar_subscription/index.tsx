import * as React from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  Container,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import Swal from "sweetalert2";

import styles from "../sidebar.module.scss";

import CircularProgress from "@mui/material-next/CircularProgress";
import { addClassNames } from "../../../store/utils/functions";
import { useCancelSubMutation } from "../../../store/rtk-query/usersApi";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/reducers/auth";

const url = import.meta.env.VITE_APP_API_URL;

const SidebarSub = () => {
  const user = useAppSelector(selectUser);
  const accessToken = user?.accessToken;

  const userId = user?._id;

  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);

  const [cancelSub, cancelSubState] = useCancelSubMutation();

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onCancelSubscription = async () => {
    const res = await cancelSub(userId);

    setShowCancelModal(false);

    if (res?.data) {
      console.log("Login successful");
      showSwal("Subscription cancelled", res?.data?.message, "success");
    }

    if (!res?.data) {
      Swal.fire({
        title:
          res?.error?.data?.message || "Error encountered during cancellation",
        text: res?.error?.data?.message,
        icon: "error",
      });
    }

    // client
    //   .deleteUser(user?._id)
    //   .then(() => {
    //     setCancelLoading(false);
    //     Swal.fire({
    //       title: "",
    //       text: "Subscription canceled and account deleted successfully.",
    //       icon: "success",
    //       timer: 1500,
    //     }).then(function () {
    //       dispatch(setUser(null));
    //       window.location.href = "/";
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     Swal.fire({
    //       title: "Error",
    //       icon: "error",
    //       text: "Failed - try again later",
    //     });
    //   });
  };

  const renderSubCancelModal = () => {
    return (
      <Modal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="">
          <Paper
            className="relative border !bg-[#FFFFFF1A] !rounded-[20px] !backdrop-blur-[13px] mx-2"
            sx={{ color: "#fff", padding: 5 }}
          >
            <Typography variant="h6">Cancel subscription</Typography>
            <p style={{ marginBottom: 50 }}>
              Are you sure to cancel your subscription?
            </p>
            <IconButton
              edge="end"
              color="white"
              //onClick={handleCloseModal}
              onClick={() => {
                setShowCancelModal(false);
                setCancelLoading(false);
              }}
              aria-label="close"
              style={{ position: "absolute", top: 0, right: 35, color: "#fff" }}
            >
              <Close />
            </IconButton>
            <div className="flex gap-[8px]">
              {/* <Button
                                variant="contained"
                                onClick={() => {
                                    setShowCancelModal(false)
                                    setCancelLoading(false)
                                }}
                                className={styles["app_button"]}
                                sx={{}}
                            >
                                Close
                            </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => onCancelSubscription()}
                className={addClassNames(styles["app_button"], "!mx-[0]")}
                sx={{ color: "#fff", width: "130px !important" }}
              >
                {cancelSubState.isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Cancel"
                )}
              </Button>
            </div>
          </Paper>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      {/* Divider */}
      <div className="mb-6 border-b border-[#4B4B4B]" />
      <Button
        className={styles["app_button"]}
        fullWidth
        variant="contained"
        onClick={() => {
          setShowCancelModal(true);
        }}
      >
        Cancel Subscription
      </Button>
      {renderSubCancelModal()}
    </div>
  );
};

export default SidebarSub;
