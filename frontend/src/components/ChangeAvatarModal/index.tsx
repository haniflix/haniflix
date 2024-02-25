import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { CloseIcon } from "../../Assets/svgs/tsSvgs";
import { useGetAvatarsQuery } from "../../store/rtk-query/avatarsApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../store/rtk-query/usersApi";
import { addClassNames } from "../../store/utils/functions";

import CircularProgress from "@mui/material-next/CircularProgress";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import styles from "./change_avatar.module.scss";

import Swal from "sweetalert2";

const ChangeAvatarModal = ({ show, onClose }) => {
  const user = useAppSelector(selectUser);

  const userId = user?._id;

  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: refetchUserData,
  } = useGetUserQuery(userId);

 

  const { data: avatarsData, isLoading: avatarsLoading } = useGetAvatarsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

//   const avatarsData = {
//     avatars: [
//         {
//             "_id": "65d22fce2c3bae00186076a6",
//             "filename": "a2pwgs.jpg",
//             "mimetype": "image/jpeg",
//             "size": 160319,
//             "url": "/api/image/avatar/static/a2pwgs.jpg"
//         },
//         {
//             "_id": "65d22fce2c3bae00186076a8",
//             "filename": "3qk5t.jpg",
//             "mimetype": "image/jpeg",
//             "size": 227667,
//             "url": "/api/image/avatar/static/3qk5t.jpg"
//         },
//         {
//             "_id": "65d22fce2c3bae00186076aa",
//             "filename": "lq6gex.jpg",
//             "mimetype": "image/jpeg",
//             "size": 176545,
//             "url": "/api/image/avatar/static/lq6gex.jpg"
//         },
//         {
//             "_id": "65d22fce2c3bae00186076ac",
//             "filename": "fq8t7q.jpg",
//             "mimetype": "image/jpeg",
//             "size": 291121,
//             "url": "/api/image/avatar/static/fq8t7q.jpg"
//         },
//         {
//             "_id": "65d22fe82c3bae00186076c0",
//             "filename": "di4qmp.jpg",
//             "mimetype": "image/jpeg",
//             "size": 172303,
//             "url": "/api/image/avatar/static/di4qmp.jpg"
//         },
//         {
//             "_id": "65d22fe82c3bae00186076c2",
//             "filename": "8k0dkk.jpg",
//             "mimetype": "image/jpeg",
//             "size": 151915,
//             "url": "/api/image/avatar/static/8k0dkk.jpg"
//         },
//         {
//             "_id": "65d22fe82c3bae00186076c4",
//             "filename": "z3lpjo.jpg",
//             "mimetype": "image/jpeg",
//             "size": 167374,
//             "url": "/api/image/avatar/static/z3lpjo.jpg"
//         },
//         {
//             "_id": "65d22ff12c3bae00186076c9",
//             "filename": "dh8f5b.jpg",
//             "mimetype": "image/jpeg",
//             "size": 258001,
//             "url": "/api/image/avatar/static/dh8f5b.jpg"
//         },
//         {
//             "_id": "65d22ff12c3bae00186076cb",
//             "filename": "bm9fzr.jpg",
//             "mimetype": "image/jpeg",
//             "size": 256170,
//             "url": "/api/image/avatar/static/bm9fzr.jpg"
//         },
//         {
//             "_id": "65d22ff12c3bae00186076cd",
//             "filename": "f7rmh.jpg",
//             "mimetype": "image/jpeg",
//             "size": 144004,
//             "url": "/api/image/avatar/static/f7rmh.jpg"
//         },
//         {
//             "_id": "65d22fff2c3bae00186076e9",
//             "filename": "iz6mh7.jpg",
//             "mimetype": "image/jpeg",
//             "size": 242190,
//             "url": "/api/image/avatar/static/iz6mh7.jpg"
//         },
//         {
//             "_id": "65d22fff2c3bae00186076eb",
//             "filename": "l9i507.jpg",
//             "mimetype": "image/jpeg",
//             "size": 210000,
//             "url": "/api/image/avatar/static/l9i507.jpg"
//         },
//         {
//             "_id": "65d22fff2c3bae00186076ed",
//             "filename": "57gayj.jpg",
//             "mimetype": "image/jpeg",
//             "size": 171354,
//             "url": "/api/image/avatar/static/57gayj.jpg"
//         },
//         {
//             "_id": "65d2300e2c3bae00186076f8",
//             "filename": "yylchr.jpg",
//             "mimetype": "image/jpeg",
//             "size": 227200,
//             "url": "/api/image/avatar/static/yylchr.jpg"
//         },
//         {
//             "_id": "65d2300f2c3bae00186076fb",
//             "filename": "p91f2a.jpg",
//             "mimetype": "image/jpeg",
//             "size": 200918,
//             "url": "/api/image/avatar/static/p91f2a.jpg"
//         },
//         {
//             "_id": "65d2300f2c3bae00186076fe",
//             "filename": "fvycx4.jpg",
//             "mimetype": "image/jpeg",
//             "size": 138042,
//             "url": "/api/image/avatar/static/fvycx4.jpg"
//         },
//         {
//             "_id": "65d230192c3bae001860770b",
//             "filename": "u2sei8.jpg",
//             "mimetype": "image/jpeg",
//             "size": 188577,
//             "url": "/api/image/avatar/static/u2sei8.jpg"
//         },
//         {
//             "_id": "65d230192c3bae001860770d",
//             "filename": "kxsf9d.jpg",
//             "mimetype": "image/jpeg",
//             "size": 184531,
//             "url": "/api/image/avatar/static/kxsf9d.jpg"
//         },
//         {
//             "_id": "65d230192c3bae001860770f",
//             "filename": "wslymq.jpg",
//             "mimetype": "image/jpeg",
//             "size": 327573,
//             "url": "/api/image/avatar/static/wslymq.jpg"
//         },
//         {
//             "_id": "65d230a62c3bae0018607767",
//             "filename": "dqtdv1.jpg",
//             "mimetype": "image/jpeg",
//             "size": 135091,
//             "url": "/api/image/avatar/static/dqtdv1.jpg"
//         },
//         {
//             "_id": "65d230a62c3bae0018607769",
//             "filename": "1hvtxn.jpg",
//             "mimetype": "image/jpeg",
//             "size": 179330,
//             "url": "/api/image/avatar/static/1hvtxn.jpg"
//         },
//         {
//             "_id": "65d230a62c3bae001860776b",
//             "filename": "qusew8.jpg",
//             "mimetype": "image/jpeg",
//             "size": 163093,
//             "url": "/api/image/avatar/static/qusew8.jpg"
//         },
//         {
//             "_id": "65d230d02c3bae0018607789",
//             "filename": "3p9kkk.jpg",
//             "mimetype": "image/jpeg",
//             "size": 192823,
//             "url": "/api/image/avatar/static/3p9kkk.jpg"
//         },
//         {
//             "_id": "65d230d02c3bae001860778b",
//             "filename": "6zl6wq.jpg",
//             "mimetype": "image/jpeg",
//             "size": 163024,
//             "url": "/api/image/avatar/static/6zl6wq.jpg"
//         },
//         {
//             "_id": "65d230d02c3bae001860778d",
//             "filename": "z5fwys.jpg",
//             "mimetype": "image/jpeg",
//             "size": 190755,
//             "url": "/api/image/avatar/static/z5fwys.jpg"
//         },
//         {
//             "_id": "65d230dd2c3bae0018607792",
//             "filename": "wxt3xp.jpg",
//             "mimetype": "image/jpeg",
//             "size": 140175,
//             "url": "/api/image/avatar/static/wxt3xp.jpg"
//         },
//         {
//             "_id": "65d230dd2c3bae0018607794",
//             "filename": "u59xq.jpg",
//             "mimetype": "image/jpeg",
//             "size": 233441,
//             "url": "/api/image/avatar/static/u59xq.jpg"
//         },
//         {
//             "_id": "65d230dd2c3bae0018607796",
//             "filename": "khvuh5.jpg",
//             "mimetype": "image/jpeg",
//             "size": 191288,
//             "url": "/api/image/avatar/static/khvuh5.jpg"
//         },
//         {
//             "_id": "65d230f52c3bae00186077b0",
//             "filename": "k2nr6d.jpg",
//             "mimetype": "image/jpeg",
//             "size": 125268,
//             "url": "/api/image/avatar/static/k2nr6d.jpg"
//         },
//         {
//             "_id": "65d230f52c3bae00186077b2",
//             "filename": "72qqhp.jpg",
//             "mimetype": "image/jpeg",
//             "size": 206064,
//             "url": "/api/image/avatar/static/72qqhp.jpg"
//         },
//         {
//             "_id": "65d230f52c3bae00186077b4",
//             "filename": "e3z5b.jpg",
//             "mimetype": "image/jpeg",
//             "size": 135620,
//             "url": "/api/image/avatar/static/e3z5b.jpg"
//         },
//         {
//             "_id": "65d231042c3bae00186077b9",
//             "filename": "losm.jpg",
//             "mimetype": "image/jpeg",
//             "size": 253545,
//             "url": "/api/image/avatar/static/losm.jpg"
//         },
//         {
//             "_id": "65d231042c3bae00186077bb",
//             "filename": "1i6mwh.jpg",
//             "mimetype": "image/jpeg",
//             "size": 232128,
//             "url": "/api/image/avatar/static/1i6mwh.jpg"
//         },
//         {
//             "_id": "65d231042c3bae00186077bd",
//             "filename": "h5qovl.jpg",
//             "mimetype": "image/jpeg",
//             "size": 170552,
//             "url": "/api/image/avatar/static/h5qovl.jpg"
//         },
//         {
//             "_id": "65d231312c3bae00186077d7",
//             "filename": "lw391f.jpg",
//             "mimetype": "image/jpeg",
//             "size": 198757,
//             "url": "/api/image/avatar/static/lw391f.jpg"
//         },
//         {
//             "_id": "65d231312c3bae00186077d9",
//             "filename": "11znr.jpg",
//             "mimetype": "image/jpeg",
//             "size": 225228,
//             "url": "/api/image/avatar/static/11znr.jpg"
//         },
//         {
//             "_id": "65d231322c3bae00186077db",
//             "filename": "kpsmgd.jpg",
//             "mimetype": "image/jpeg",
//             "size": 158818,
//             "url": "/api/image/avatar/static/kpsmgd.jpg"
//         },
//         {
//             "_id": "65d231402c3bae00186077e0",
//             "filename": "kle5ne.jpg",
//             "mimetype": "image/jpeg",
//             "size": 155522,
//             "url": "/api/image/avatar/static/kle5ne.jpg"
//         },
//         {
//             "_id": "65d231402c3bae00186077e2",
//             "filename": "am98fh.jpg",
//             "mimetype": "image/jpeg",
//             "size": 144951,
//             "url": "/api/image/avatar/static/am98fh.jpg"
//         },
//         {
//             "_id": "65d231402c3bae00186077e4",
//             "filename": "fioioc.jpg",
//             "mimetype": "image/jpeg",
//             "size": 158748,
//             "url": "/api/image/avatar/static/fioioc.jpg"
//         },
//         {
//             "_id": "65d2314d2c3bae00186077f5",
//             "filename": "8655jv.jpg",
//             "mimetype": "image/jpeg",
//             "size": 186182,
//             "url": "/api/image/avatar/static/8655jv.jpg"
//         },
//         {
//             "_id": "65d2314d2c3bae00186077f7",
//             "filename": "m6r9g.jpg",
//             "mimetype": "image/jpeg",
//             "size": 174612,
//             "url": "/api/image/avatar/static/m6r9g.jpg"
//         },
//         {
//             "_id": "65d2314d2c3bae00186077f9",
//             "filename": "ivjqhp.jpg",
//             "mimetype": "image/jpeg",
//             "size": 167309,
//             "url": "/api/image/avatar/static/ivjqhp.jpg"
//         },
//         {
//             "_id": "65d2315a2c3bae0018607808",
//             "filename": "zu5hhp.jpg",
//             "mimetype": "image/jpeg",
//             "size": 240283,
//             "url": "/api/image/avatar/static/zu5hhp.jpg"
//         },
//         {
//             "_id": "65d2315a2c3bae001860780a",
//             "filename": "q8az6o.jpg",
//             "mimetype": "image/jpeg",
//             "size": 162058,
//             "url": "/api/image/avatar/static/q8az6o.jpg"
//         },
//         {
//             "_id": "65d2315a2c3bae001860780c",
//             "filename": "dzouc.jpg",
//             "mimetype": "image/jpeg",
//             "size": 185351,
//             "url": "/api/image/avatar/static/dzouc.jpg"
//         },
//         {
//             "_id": "65d231932c3bae0018607827",
//             "filename": "yfb7w.jpg",
//             "mimetype": "image/jpeg",
//             "size": 184105,
//             "url": "/api/image/avatar/static/yfb7w.jpg"
//         },
//         {
//             "_id": "65d231932c3bae0018607829",
//             "filename": "tq8k17.jpg",
//             "mimetype": "image/jpeg",
//             "size": 164183,
//             "url": "/api/image/avatar/static/tq8k17.jpg"
//         },
//         {
//             "_id": "65d231932c3bae001860782b",
//             "filename": "fs7wb9.jpg",
//             "mimetype": "image/jpeg",
//             "size": 173973,
//             "url": "/api/image/avatar/static/fs7wb9.jpg"
//         },
//         {
//             "_id": "65d232b72c3bae0018608612",
//             "filename": "dnli2c.jpg",
//             "mimetype": "image/jpeg",
//             "size": 154291,
//             "url": "/api/image/avatar/static/dnli2c.jpg"
//         },
//         {
//             "_id": "65d232b72c3bae0018608614",
//             "filename": "mazt4v.jpg",
//             "mimetype": "image/jpeg",
//             "size": 223811,
//             "url": "/api/image/avatar/static/mazt4v.jpg"
//         },
//         {
//             "_id": "65d232b72c3bae0018608616",
//             "filename": "v8cvk.jpg",
//             "mimetype": "image/jpeg",
//             "size": 168317,
//             "url": "/api/image/avatar/static/v8cvk.jpg"
//         },
//         {
//             "_id": "65d233112c3bae0018608651",
//             "filename": "loe3lj.jpg",
//             "mimetype": "image/jpeg",
//             "size": 199423,
//             "url": "/api/image/avatar/static/loe3lj.jpg"
//         },
//         {
//             "_id": "65d233112c3bae0018608653",
//             "filename": "son5ab.jpg",
//             "mimetype": "image/jpeg",
//             "size": 121139,
//             "url": "/api/image/avatar/static/son5ab.jpg"
//         },
//         {
//             "_id": "65d233112c3bae0018608655",
//             "filename": "29jjv.jpg",
//             "mimetype": "image/jpeg",
//             "size": 189058,
//             "url": "/api/image/avatar/static/29jjv.jpg"
//         },
//         {
//             "_id": "65d237b62c3bae0018608a20",
//             "filename": "0zquns.jpg",
//             "mimetype": "image/jpeg",
//             "size": 226076,
//             "url": "/api/image/avatar/static/0zquns.jpg"
//         },
//         {
//             "_id": "65d237b62c3bae0018608a22",
//             "filename": "r67mv8.jpg",
//             "mimetype": "image/jpeg",
//             "size": 163561,
//             "url": "/api/image/avatar/static/r67mv8.jpg"
//         },
//         {
//             "_id": "65d237b62c3bae0018608a24",
//             "filename": "bb9o24.jpg",
//             "mimetype": "image/jpeg",
//             "size": 270947,
//             "url": "/api/image/avatar/static/bb9o24.jpg"
//         },
//         {
//             "_id": "65d237e92c3bae0018608a42",
//             "filename": "3of2g2.jpg",
//             "mimetype": "image/jpeg",
//             "size": 209235,
//             "url": "/api/image/avatar/static/3of2g2.jpg"
//         },
//         {
//             "_id": "65d237e92c3bae0018608a44",
//             "filename": "tj0koqc.jpg",
//             "mimetype": "image/jpeg",
//             "size": 154079,
//             "url": "/api/image/avatar/static/tj0koqc.jpg"
//         }
//     ]
// }; 

  const [updateUser, updateUserState] = useUpdateUserMutation();

  const [selectedAvatar, setSelectedAvatar] = React.useState<undefined | any>(
    undefined
  );

  const closeButtonRef = React.useRef();

  const BASE_URL = import.meta.env.VITE_APP_API_URL;


  // Close on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.code === "Escape") {
        onClose();
        setSelectedAvatar(undefined);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const onSubmit = async () => {
    const data = {
      ...(selectedAvatar && { avatar: selectedAvatar?.url }),
    };

    if (Object.keys(data).length == 0) {
      return;
    }

    const res = await updateUser({
      data,
      id: userId,
    });

    if (res?.data) {
      Swal.fire({
        title: "",
        text: "Profile updated",
        icon: "success",
        timer: 1500,
      });
      refetchUserData();
    } else {
      Swal.fire({
        title: res?.error?.data?.message || "Error encountered during update",
        text: res?.error?.data?.message,
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    onClose(); // Pass closure to ensure correct state update
    setSelectedAvatar(undefined);
  };

  return (
    <Transition show={show}>
      <div
        className={addClassNames(
          "fixed top-0 right-0 left-0 bottom-0 overflow-hidden z-[1000] bg-transparent border",
          "flex items-center justify-center"
        )}
      >
        <div
          className="absolute top-0 right-0 left-0 bottom-0 backdrop-filter backdrop-brightness-[0.3]"
          onClick={handleClose}
        ></div>

        <Transition.Child
          enter="transition duration-150 ease-out"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition duration-100 ease-in-out"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className={addClassNames(
              "relative shadow-xl rounded-lg  p-[37px]  text-left overflow-auto scrollbar-thin scrollbar-thumb-gray-200 sm:scrollbar-thumb-gray-300",
              "backdrop-blur-[13px] bg-[#FFFFFF1A] border border-[#4B4B4B]",
              "min-w-[52vw] !max-w-[1221px] max-h-[70vh]",
              styles["choose-your-profile-modal"]
            )}
          >
            {/* Top section with heading and close button */}
            <div className="flex items-center justify-between mb-[35px]">
              <h3 className="text-[25px] font-[500] leading-6 text-white">
                Choose Your Profile Picture
              </h3>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={handleClose}
                className="h-[40px] w-[40px] rounded-[40px] bg-[#FFFFFF40] inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CloseIcon />
              </button>
            </div>
            {/* Divider */}
            <div className="mb-6 border-b border-[#4B4B4B]" />
            <div
              className="mt-5 flex flex-wrap gap-[13px] overflow-y-auto h-[80%]"
              aria-labelledby="modal-title"
            >
              {avatarsData?.avatars?.map((avatar, index) => {
                const imageUrl = avatar?.url?.replace("/api/", "");
                return (
                  <div
                    key={avatar?._id}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={addClassNames(
                      // "h-[110px] w-[110px] bg-[gray] rounded-[2px] cursor-pointer relative",
                      selectedAvatar?._id == avatar?._id
                        ? "border border-[4px] border-[#FFFFFF]"
                        : "",
                         styles['avatar']
                    )}
                  >
                    {selectedAvatar?._id == avatar?._id ? (
                      <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center left-0 backdrop-filter backdrop-brightness-[0.3]">
                        <div
                          onClick={onSubmit}
                          className={addClassNames(
                            styles["app_button"],
                            "!h-[33px] !w-[70px] !text-[12px] "
                          )}
                        >
                          {updateUserState.isLoading ? (
                            <div className="text-white">
                              <CircularProgress color="inherit" size={24} />
                            </div>
                          ) : (
                            "Select"
                          )}
                        </div>
                      </div>
                    ) : undefined}
                    <img
                      className="w-full h-full rounded-[2px]"
                      src={`${BASE_URL}${imageUrl}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ChangeAvatarModal;
