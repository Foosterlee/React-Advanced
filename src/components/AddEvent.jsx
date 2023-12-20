import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";

const AddEvent = ({
  isOpen,
  onClose,
  setNewEvent,
  newEvent,
  categories,
  creators,
  handleAddEvent,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zoek de maker en categorie op basis van de ingevulde namen
    const creator = creators.find((c) => c.name === newEvent.creator);
    const category = categories.find((c) => c.name === newEvent.category);

    // Als de maker en categorie zijn gevonden, gebruik hun id's
    if (creator && category) {
      // Hier moeten we 'setNewEvent' aanpassen om de juiste velden in te stellen
      setNewEvent({
        ...newEvent,
        createdBy: creator.id,
        categoryIds: [category.id],
      });

      // Roep handleAddEvent aan met de bijgewerkte newEvent
      handleAddEvent({
        ...newEvent,
        createdBy: creator.id,
        categoryIds: [category.id],
      });

      // Reset de form fields
      setNewEvent({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        category: "",
        creator: "",
        image: "",
      });

      // Sluit het modal
      onClose();
    } else {
      // Toon een foutmelding als de maker of categorie niet is gevonden
      console.error("Creator or category not found");
    }
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
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    startTime: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                value={newEvent.category || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
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
              <FormLabel>Creator</FormLabel>
              <Select
                value={newEvent.creator || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, creator: e.target.value })
                }
              >
                <option value="" disabled>
                  Select a creator
                </option>
                {creators.map((creator) => (
                  <option key={creator.id} value={creator.name}>
                    {creator.name}
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

            <Button mt={6} colorScheme="teal" type="submit">
              Add Event
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEvent;
