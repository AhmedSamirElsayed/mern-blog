import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgess, setImageUploadProgess] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        setFormData(data.posts[0]);
        setPublishError(null);
      } catch (error) {
        console.log(error.message);
        setPublishError("Error fetching post");
      }
    };

    if (postId) {
      fetchPost();
    } else {
      setPublishError("Invalid post ID");
    }
  }, [postId]);
  // handle funcion
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please select an image ");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storagRef = ref(storage, `image/${fileName}`);
      const uploadTask = uploadBytesResumable(storagRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgess(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image upload failed");
          setImageUploadProgess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgess(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgess(null);
      console.log(error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else if (data.success === false) {
        setPublishError(data.message);
        return;
      } else if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.post.slug}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            required
            id="title"
            placeholder="Title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData.title}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          >
            <option value="uncategorized" hidden>
              Select a category
            </option>
            <option value="javaScript">JavaScript</option>
            <option value="react js">React Js</option>
            <option value="next js">Next Js</option>
            <option value="node Js">Node Js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-amber-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            id="image"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgess}
          >
            {imageUploadProgess ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgess}
                  text={`${imageUploadProgess || 0}%`}
                />
              </div>
            ) : (
              " Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-contain"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something....."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          onClick={(e) => {
            handleUpdatePost(e);
          }}
        >
          Update
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
