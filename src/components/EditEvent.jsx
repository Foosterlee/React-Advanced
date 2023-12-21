import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Select,
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { EventWithData, emtpyEvent } from "../utils/Events";
import { formatDatePicker } from "../utils/Formatting";

const EditEvent = ({ isOpen, onClose, onEditEvent, editedEvent }) => {
  const { categories, users } = useContext(CategoryContext);

  const [formData, setFormData] = useState(emtpyEvent);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  useEffect(() => {
    const data = EventWithData(editedEvent);
    setFormData({
      ...data,
      categoryIds:
        data.categoryIds?.map((x) => categories.find((c) => c.id === x).name) ||
        [],
    });
    setStartDateTime(formatDatePicker(data.startTime));
    setEndDateTime(formatDatePicker(data.endTime));
  }, [editedEvent]);

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

    onEditEvent({
      ...formData,
      startTime: new Date(startDateTime).toISOString(),
      endTime: new Date(endDateTime).toISOString(),
      createdBy: Number(formData.createdBy),
      categoryIds: formData.categoryIds.map((x) =>
        Number(categories.find((c) => c.name === x).id)
      ),
    });

    setFormData(emtpyEvent);
    setStartDateTime("");
    setEndDateTime("");

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
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <CheckboxGroup
                isInline
                spacing={16}
                variantColor="teal"
                value={formData.categoryIds || []}
                onChange={(values) => handleInputChange("categoryIds", values)}
              >
                {categories.map((category) => (
                  <Checkbox key={category.id} value={category.name}>
                    {category.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
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
