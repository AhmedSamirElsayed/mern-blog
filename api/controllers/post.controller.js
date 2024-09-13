import Post from "../models/post.model.js";
import { errorHandelar } from "../utils/error.js";

// creat post
export const create = async (req, res, next) => {
  //   console.log(req.user);

  if (!req.user.isAdmin) {
    return next(errorHandelar(403, "you are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandelar(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.userId,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// get ALL posts
export const getALLposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const Now = new Date();
    const oneMonthAgo = new Date(
      Now.getFullYear(),
      Now.getMonth() - 1,
      Now.getDate()
    );

    const filters = {
      ...(req.query.userId && { _id: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const posts = await Post.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.userId !== req.params.userId) {
    return next(
      errorHandelar(403, "you are not allowed to delete this post .")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted successfully.");
  } catch (error) {
    next(error);
  }
};

// export const updatePost = async (req, res, next) => {
//   if (!req.user.isAdmin || req.user.userId !== req.params.userId) {
//     return next(
//       errorHandelar(403, "you are not allowed for you to update this post .")
//     );
//   }

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.postId,
//       {
//         $set: {
//           title: req.body.title,
//           content: req.body.conten,
//           category: req.body.category,
//           image: req.body.image,
//         },
//       },
//       { new: true }
//     );
//     res
//       .status(200)
//       .json(updatedPost, "The post has been updated successfully.");
//   } catch (error) {
//     next(error);
//   }
// };

export const updatePost = async (req, res, next) => {
  // Check if the user is authorized to update the post
  if (!req.user.isAdmin || req.user.userId !== req.params.userId) {
    return next(
      errorHandelar(403, "You are not authorized to update this post.")
    );
  }

  try {
    // Update the post with the provided details
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content, // Fixed typo: "conten" to "content"
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true } // Return the updated post
    );

    // Check if post was found and updated
    if (!updatedPost) {
      return next(errorHandler(404, "Post not found."));
    }

    // Send success response
    res.status(200).json({
      message: "The post has been updated successfully.",
      post: updatedPost,
    });
  } catch (error) {
    // Handle any errors that occurred during the update
    next(error);
  }
};
