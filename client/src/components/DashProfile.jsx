// import { Avatar } from "flowbite-react";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgeFile, setImageFile] = useState(null);
  const [imgeFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const handleImageChange = (e) => {
    const fileImage = e.target.files[0];
    if (fileImage) {
      if (fileImage.size > 2 * 1024 * 1024) {
        setImageFileUploadingError("File size must be less than 2MB");
        return;
      }
      if (!fileImage.type.startsWith("image/")) {
        setImageFileUploadingError("Only image files are allowed");
        return;
      }
      setImageFile(fileImage);
      setImageFileUrl(URL.createObjectURL(fileImage));
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (
  //       imgeFile &&
  //       typeof imgeFile === "object" &&
  //       imgeFile.size < 2 * 1024 * 1024
  //     ) {
  //       uploadImage();
  //     }
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [imgeFile]);
  useEffect(() => {
    if (imgeFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgeFile]);

  const uploadImage = async () => {
    //     service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size <2*1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    // console.log("uploading image .......");
    setImageFileUploading(true);
    setImageFileUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgeFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgeFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progess = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageFileUploadingProgress(progess.toFixed(0));
        // console.log(`Upload is ${progess}% done`);
      },
      () => {
        setImageFileUploadingError(
          "Could not upload image (file must be less than 2MB)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image upload");
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadingProgress > 0 &&
            imageFileUploadingProgress < 100 && (
              <CircularProgressbar
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,199,${
                      imageFileUploadingProgress / 100
                    })`,
                  },
                }}
              />
            )}

          <img
            src={imgeFileUrl || currentUser?.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadingError && (
          <Alert color="failure">{imageFileUploadingError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser?.username}
          onChange={handleChangeInput}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          onChange={handleChangeInput}
        />

        <TextInput
          type="password"
          id="password"
          placeholder="******"
          onChange={handleChangeInput}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
