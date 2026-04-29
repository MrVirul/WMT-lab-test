import Item from "../models/Item.js";

// @desc    Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: error.message });
  }
};

// @desc    Get item by id
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch item", error: error.message });
  }
};

// @desc    Create new item
export const createItem = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      imageUrl = "",
      materialType,
      material,
    } = req.body;

    const resolvedMaterialType = materialType ?? material ?? "";
    const parsedPrice = Number(price);

    // Manual validation to catch empty fields before the DB does
    if (
      !name ||
      !category ||
      !description ||
      !resolvedMaterialType ||
      Number.isNaN(parsedPrice)
    ) {
      return res.status(400).json({
        message:
          "Name, Category, Price, Description, and Material Type are required",
      });
    }

    const newItem = await Item.create({
      name,
      category,
      price: parsedPrice,
      description,
      imageUrl,
      materialType: resolvedMaterialType,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create item", error: error.message });
  }
};

// @desc    Update item
export const updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price);
    }

    if (
      updateData.materialType === undefined &&
      updateData.material !== undefined
    ) {
      updateData.materialType = updateData.material;
    }

    delete updateData.material;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// @desc    Delete item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
