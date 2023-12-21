import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"; // Add this import
import { emtpyEvent } from "../utils/Events";
import { CategoryContext } from "./CategoryContext";
import { formatDatePicker } from "../utils/Formatting";
import { useContext } from "react";

const AddEvent = ({
  isOpen,
  onClose,
  setNewEvent,
  newEvent,
  handleAddEvent,
  users,
}) => {
  const { categories } = useContext(CategoryContext);
  if (!users) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleAddEvent({
      ...newEvent,
      startTime: new Date(newEvent.startTime).toISOString(),
      endTime: new Date(newEvent.endTime).toISOString(),
      createdBy: Number(newEvent.createdBy),
      categoryIds: newEvent.categoryIds.map((x) =>
        Number(categories.find((c) => c.name === x).id)
      ),
    });

    // Reset the form fields
    setNewEvent(emtpyEvent);

    // Close the modal
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter event description"
                value={newEvent.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={formatDatePicker(newEvent.startTime)}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={formatDatePicker(newEvent.endTime)}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <CheckboxGroup
                isInline
                spacing={16}
                variantColor="teal"
                value={newEvent.categoryIds || []}
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
              <FormLabel>Creator</FormLabel>
              <Select
                value={newEvent.createdBy}
                onChange={(e) => handleInputChange("createdBy", e.target.value)}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                value={newEvent.image}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, image: e.target.value })
                }
              />
            </FormControl>

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
