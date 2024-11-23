const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const upload = require("../config/multerConfig"); // Import the Multer configuration

const router = express.Router();

// router.route("/")
//   .get(getPosts)
//   .post(upload.single("image"), createPost); // Use the Multer upload middleware

// router.route("/:id")
//   .get(getPostById)
//   .put(upload.single("image"), updatePost)
//   .delete(deletePost);

router.post("/create-posts",upload.single("image"), createPost)
router.get("/get-posts",getPosts)
router.get("/get-posts/:id",getPostById)
router.put("/update-posts/:id",upload.single("image"),updatePost)
router.delete("/delete-posts/:id",deletePost)

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ fileUrl: req.file.path }); // Cloudinary URL
});


module.exports = router;
