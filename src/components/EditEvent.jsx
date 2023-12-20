import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";

const EditEvent = ({ isOpen, onClose, onEditEvent, editedEvent }) => {
  const { categories, users } = useContext(CategoryContext);

  const formatDateTime = (dateTimeString) => {
    // Assuming dateTimeString is in ISO 8601 format
    return dateTimeString ? dateTimeString.slice(0, 16) : "";
  };

  useEffect(() => {
    // Set initial form data when the modal is opened
    setFormData({
      title: editedEvent?.title || "",
      description: editedEvent?.description || "",
      startTime: formatDateTime(editedEvent?.startTime) || "",
      endTime: formatDateTime(editedEvent?.endTime) || "",
      category: editedEvent?.category || "",
      createdBy: editedEvent?.createdBy || "",
      image: editedEvent?.image || "",
    });
  }, [editedEvent]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "",
    createdBy: "",
    image: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditEvent(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter event description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Created By</FormLabel>
              <Select
                value={formData.createdBy}
                onChange={(e) => handleInputChange("createdBy", e.target.value)}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {formData.image && (
              <FormControl mt={4}>
                <FormLabel>Existing Photo</FormLabel>
                <img
                  src={formData.image}
                  alt="Event"
                  style={{ maxWidth: "100%" }}
                />
              </FormControl>
            )}
            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditEvent;
