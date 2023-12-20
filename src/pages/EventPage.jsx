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
    <>
      <Image
        src={event?.image}
        alt={event?.title || "No Title"}
        objectFit="cover"
        w="100%"
        h="350px"
        pb="4"
      />

      <Stack align="center" pb="2" mt="4">
        <Heading p="4" textAlign="center">
          {event?.title || "No Title"}
        </Heading>

        <Box color="teal" borderRadius="md" fontStyle="italic">
          <Text>{event?.description || "No Description"}</Text>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          spacing="-10"
          mb="4"
        >
          <Box bg="blackAlpha.50" p="4" borderRadius="md" flex="1" mb="4">
            <Flex direction="column" align="center" spacing="2">
              <Text fontWeight="bold">Event Time</Text>
              <Text>
                Starts:{" "}
                {event?.startTime
                  ? new Date(event.startTime).toLocaleDateString()
                  : "Not specified"}{" "}
                {event?.startTime &&
                  new Date(event.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </Text>
              <Text>
                Ends:{" "}
                {event?.endTime
                  ? new Date(event.endTime).toLocaleDateString()
                  : "Not specified"}{" "}
                {event?.endTime &&
                  new Date(event.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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

          <Box bg="blackAlpha.50" p={4} borderRadius="md" flex="1" mt="4">
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
    </>
  );
};

export default EventPage;
