import React, { useEffect, useState } from "react";
import {
  Heading,
  Image,
  Text,
  Button,
  Stack,
  Box,
  HStack,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import EditEvent from "../components/EditEvent";
import DeleteEvent from "../components/DeleteEvent";
import { formatDateTime } from "../utils/Formatting";

export const loader = async ({ params }) => {
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");
  const eventsResponse = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );

  const categories = await categoriesResponse.json();
  const users = await usersResponse.json();
  const event = await eventsResponse.json();

  return { categories, users, event };
};

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { eventId } = useParams();
  const navigate = useNavigate();

  const getUserNameAndImage = (userId) => {
    const user = users.find((u) => u.id === userId);
    return {
      name: user ? user.name : "Unknown User",
      image: user ? user.image : "",
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const usersResponse = await fetch("http://localhost:3000/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const eventResponse = await fetch(
          `http://localhost:3000/events/${eventId}`
        );

        if (!eventResponse.ok) {
          throw new Error("Event not found");
        }

        const eventData = await eventResponse.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleEditClick = () => {
    setEditedEvent({ ...event });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditEvent = async (editedEventData) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      setEvent(editedEventData);
      setEditModalOpen(false);
      setEditedEvent(null);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <Box mx="auto">
      <Image
        src={event?.image}
        alt={event?.title || "No Title"}
        objectFit="cover"
        w="100%"
        h="350px"
        pb="4"
      />
      <Stack align="center" mt="4" mb="4">
        <Heading p="4" textAlign="center" mb="8">
          {event?.title || "No Title"}
        </Heading>

        <Flex direction={{ base: "column", md: "row" }} mb="4">
          <Box
            bg="blackAlpha.50"
            p="5"
            borderRadius="md"
            flex="2"
            boxShadow="md"
            mb={{ base: "4", md: "0" }}
          >
            <Box color="teal" borderRadius="md" fontStyle="italic" mb="4">
              <Text>{event?.description || "No Description"}</Text>
            </Box>
            <Flex direction="column" align="center" mt="4">
              <Text fontWeight="bold">Starts:</Text>
              <Text>
                {event?.startTime
                  ? formatDateTime(event.startTime, " at ")
                  : "Not specified"}
              </Text>
              <Text fontWeight="bold" mt="4">
                Ends:
              </Text>
              <Text mb="3">
                {event?.endTime
                  ? formatDateTime(event.endTime, " at ")
                  : "Not specified"}
              </Text>
              <HStack spacing="1" mt="4">
                {event?.categoryIds &&
                  Array.isArray(event.categoryIds) &&
                  event.categoryIds.map((categoryId) => {
                    const category = categories.find(
                      (cat) => cat.id === categoryId
                    );
                    return category ? (
                      <Tag key={category.id} colorScheme="teal" size="sm">
                        {category.name}
                      </Tag>
                    ) : null;
                  })}
              </HStack>
            </Flex>
          </Box>

          <Box
            bg="blackAlpha.50"
            p={4}
            borderRadius="md"
            flex="1"
            mt={{ base: "4", md: "0" }}
            ml={{ base: "0", md: "4" }}
            boxShadow="md"
          >
            <Stack spacing={4} align="center">
              <Text fontWeight="bold" fontSize="xl" color="gray.600">
                Created{" "}
                <Text as="span" fontFamily="cursive" color="teal.500">
                  by
                </Text>
                :
              </Text>
              <Image
                src={getUserNameAndImage(event?.createdBy, users).image}
                alt={getUserNameAndImage(event?.createdBy, users).name}
                boxSize="100px"
                borderRadius="full"
              />
              <Text>{getUserNameAndImage(event?.createdBy, users).name}</Text>
            </Stack>
          </Box>
        </Flex>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        position="fixed"
        bottom="4"
        right="4"
      >
        <Button onClick={handleEditClick} flex="1">
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleDeleteClick} flex="1">
          Delete
        </Button>
      </Stack>
      <EditEvent
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        onEditEvent={handleEditEvent}
        editedEvent={editedEvent}
        categories={categories}
      />
      <DeleteEvent
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onDeleteEvent={handleDeleteEvent}
      />
    </Box>
  );
};

export default EventPage;
