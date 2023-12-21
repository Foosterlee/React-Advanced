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
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // January is 0!
    const year = dateObject.getFullYear();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    return `${formattedDate}T${formattedTime}`;
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
    const updatedValue =
      field === "createdBy" && value !== "" ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Zoek de maker en categorie op basis van de ingevulde namen
    const creator =
      formData.createdBy &&
      users.find((user) => user.name === formData.createdBy);

    const category =
      formData.category && categories.find((c) => c.name === formData.category);

    // Als de maker en categorie zijn gevonden, gebruik hun id's
    if (creator) {
      onEditEvent({
        ...formData,
        startTime: formatDateTime(new Date(formData.startTime)),
        endTime: formatDateTime(new Date(formData.endTime)),
        createdBy: creator.id,
        categoryIds: category ? [category.id] : [],
      });
    } else {
      onEditEvent({
        ...formData,
        startTime: formatDateTime(new Date(formData.startTime)),
        endTime: formatDateTime(new Date(formData.endTime)),
        categoryIds: category ? [category.id] : [],
      });
    }

    // Reset de form fields
    setFormData({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      category: "",
      createdBy: "",
      image: "",
    });

    // Sluit het modal
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
                <option value="" disabled>
                  Select a category
                </option>
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
                <option value="" disabled>
                  Select a creator
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
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
