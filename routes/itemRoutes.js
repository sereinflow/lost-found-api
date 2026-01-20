const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItemById,
  deleteAllItems,
  searchItems,
  updateItemStatus,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Search must be before :id
router.get("/search", searchItems);

// CRUD routes
router.post("/", protect, upload.single("image"), createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);
router.patch("/:id/status", protect, updateItemStatus);
router.delete("/:id", protect, deleteItemById);
router.delete("/", protect, deleteAllItems);

module.exports = router;
