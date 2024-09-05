import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/imgres?q=profile%20image&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F003%2F715%2F527%2Fnon_2x%2Fpicture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-pic&docid=CsbR9dJYuOywhM&tbnid=3nPRi6_QfknfYM&vet=12ahUKEwieyeLLv6qIAxWJiv0HHfUhJpsQM3oECBYQAA..i&w=980&h=980&hcb=2&ved=2ahUKEwieyeLLv6qIAxWJiv0HHfUhJpsQM3oECBYQAA",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
