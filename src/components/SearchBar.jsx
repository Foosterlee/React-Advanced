// SearchBar.jsx
import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Box flex="1">
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        bg="blackAlpha.50"
      />
    </Box>
  );
};

export default SearchBar;
