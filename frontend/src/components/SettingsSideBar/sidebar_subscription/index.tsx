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
import axios from "axios";
import { BASE_URL } from "../../../utils/utils";
import ModelPopup from "../../ModelPopup";
import { motion, AnimatePresence } from "framer-motion";

const url = import.meta.env.VITE_APP_API_URL;

const SidebarSub = ({variantGroup}) => {
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
    // const res = await cancelSub(userId);
    console.log(user);
    console.log(BASE_URL);
    await axios
      .put(
        `${BASE_URL}users/cancel-sub/${user._id}`,
        // {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res?.data) {
          console.log("Login successful");
          showSwal("Subscription cancelled", res?.data?.message, "success");
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err?.data) {
          Swal.fire({
            title:
              err?.error?.data?.message ||
              "Error encountered during cancellation",
            text: err?.error?.data?.message,
            icon: "error",
          });
        }
      });

    setShowCancelModal(false);

    // if (res?.data) {
    //   console.log("Login successful");
    //   showSwal("Subscription cancelled", res?.data?.message, "success");
    // }

    // if (!res?.data) {
    //   Swal.fire({
    //     title:
    //       res?.error?.data?.message || "Error encountered during cancellation",
    //     text: res?.error?.data?.message,
    //     icon: "error",
    //   });
    // }

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
            <div className="grid grid-cols-2 gap-[8px]">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelLoading(false);
                }}
                className={"theme_button"}
              >
                Close
              </button>
              <button
                onClick={() => onCancelSubscription()}
                className={"theme_button_danger"}
              >
                {cancelSubState.isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </Paper>
        </div>
      </Modal>
    );
  };

  const { tabVariant, tabChildVariant, parentTransition } = variantGroup;

  return (
 <motion.div
      key="uniqueSubscription"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariant}
      transition={parentTransition}
    >
       <motion.div variants={tabChildVariant}>
       <div className="mb-6 border-b border-[#4B4B4B]" />
     
     <button
       className={"theme_button_danger"}
       onClick={() => {
         setShowCancelModal(true);
       }}
     >
       End Subscription
     </button>

      </motion.div>

      <AnimatePresence>
        {showCancelModal && (
          <ModelPopup>
            <p className="text-lg mb-2">End subscription</p>
            <p className="text-base text-muted">Are you sure to end your subscription?</p>

            <div className="mt-10 flex gap-5 justify-center">
              <button
                className="theme_button"
                onClick={() => setShowCancelModal(false)}
              >
                Cancel
              </button>
              <button
                className="theme_button_danger"
                onClick={() => setShowCancelModal(false)}
              >
                Proceed
              </button>
            </div>
          </ModelPopup>
        )}
      </AnimatePresence>

      {/* {renderSubCancelModal()} */}
    </motion.div>
  );
};

export default SidebarSub;
