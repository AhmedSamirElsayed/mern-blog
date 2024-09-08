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

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgeFile, setImageFile] = useState(null);
  const [imgeFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const filePickerRef = useRef();

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser?.email}
        />
        <TextInput type="password" id="password" placeholder="******" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
