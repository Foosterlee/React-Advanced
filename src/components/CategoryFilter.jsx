import React, { useContext } from "react";
import { Select, Box } from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { categories } = useContext(CategoryContext);
  return (
    <Box flex="1" marginLeft="4">
      <Select
        bg="blackAlpha.50"
        placeholder="Select category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CategoryFilter;
