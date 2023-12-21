import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { emtpyEvent } from "../utils/Events";
import EventForm from "./EventForm";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";
import { formatDatePicker } from "../utils/Formatting";

const AddEvent = ({
  isOpen,
  onClose,
  setNewEvent,
  newEvent,
  handleAddEvent,
}) => {
  const { categories } = useContext(CategoryContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Roep handleAddEvent aan met de bijgewerkte newEvent
    handleAddEvent({
      ...newEvent,
      startTime: formatDatePicker(newEvent.startTime),
      endTime: formatDatePicker(newEvent.endTime),
      createdBy: Number(newEvent.createdBy),
      categoryIds: newEvent.categoryIds.map(x => Number(categories.find(c => c.name == x).id)),
    });

    // Reset de form fields
    setNewEvent(emtpyEvent);

    // Sluit het modal
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewEvent((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <EventForm
              // formData={formData}
              formData={newEvent}
              handleInputChange={handleInputChange}
            />
            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Add Event
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEvent;
