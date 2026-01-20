const Item = require("../models/Item");

// @route   POST /api/items
// @desc    Create a new lost/found item
// @access  Protected
exports.createItem = async (req, res) => {
  try {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const item = await Item.create({
      name,
      description,
      location,
      createdBy: req.user._id,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/items
// @desc    Get all items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("createdBy", "name email");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/items/:id
// @desc    Update an item completely
// @access  Protected
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.location = req.body.location || item.location;

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PATCH /api/items/:id/status
// @desc    Update item status only
// @access  Protected
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = status || item.status;
    await item.save();

    res.status(200).json({
      message: "Status updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/items/:id
// @desc    Delete single item
// @access  Protected
exports.deleteItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/items
// @desc    Delete all items
// @access  Admin only
exports.deleteAllItems = async (req, res) => {
  try {
    await Item.deleteMany();
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/items/search?name=value
// @desc    Search items by name (partial match)
// @access  Public
exports.searchItems = async (req, res) => {
  try {
    const { name } = req.query;

    const items = await Item.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
