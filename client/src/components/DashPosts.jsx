import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userposts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?_id=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
        } else {
          throw new Error(data.message || "Failed to fetch posts");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="h-screen bg-yellow-100 text-center w-full text-black">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h1>DashPosts</h1>
          {userposts.length > 0 ? (
            <ul>
              {userposts.map((post) => (
                <>
                  <li key={post._id}>{post.title}</li>
                  <li>{post.content}</li>
                </>
              ))}
            </ul>
          ) : (
            <p>No posts available</p>
          )}
        </>
      )}
    </div>
  );
};

export default DashPosts;
