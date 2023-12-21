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
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { EventWithData, emtpyEvent } from "../utils/Events";
import EventForm from "./EventForm";
import { formatDatePicker } from "../utils/Formatting";

const EditEvent = ({
  isOpen,
  onClose,
  onEditEvent,
  editedEvent
}) => {
  const { categories, users } = useContext(CategoryContext);

  useEffect(() => {
    // Set initial form data when the modal is opened
    const data = EventWithData(editedEvent)
    // console.log("data", data)
    setFormData({
      ...data,
      categoryIds: data.categoryIds?.map(x => categories.find(c => c.id == x).name) || []
    });
  }, [editedEvent]);

  const [formData, setFormData] = useState(emtpyEvent);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Voer onEditEvent uit met de bijgewerkte formData
    onEditEvent({
      ...formData,
      startTime: formatDatePicker(formData.startTime),
      endTime: formatDatePicker(formData.endTime),
      createdBy: Number(formData.createdBy),
      categoryIds: formData.categoryIds.map(x => Number(categories.find(c => c.name == x).id)),
    });

    // Reset de form fields
    setFormData(emtpyEvent);

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
            <EventForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal >
  );
};

export default EditEvent;
