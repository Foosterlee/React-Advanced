import React, { useState, useEffect } from "react";
import { Container, VStack, Flex, Button, useToast } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EventList from "../components/EventsList";
import AddEvent from "../components/AddEvent";

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: 0,
    image: "",
  });

  const toast = useToast();

  const fetchData = async () => {
    try {
      const categoriesResponse = await fetch(
        "http://localhost:3000/categories"
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const eventsResponse = await fetch("http://localhost:3000/events");
      const eventsData = await eventsResponse.json();
      setEvents(eventsData);

      const usersResponse = await fetch("http://localhost:3000/users");
      const usersData = await usersResponse.json();
      setUsers(usersData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = events.filter((event) => {
    const titleMatchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatchesFilter =
      selectedCategory === "all" ||
      (event.categoryIds &&
        event.categoryIds.includes(Number(selectedCategory)));
    return titleMatchesSearch && categoryMatchesFilter;
  });

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      fetchData();
      setIsModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        categoryIds: [],
        createdBy: null,
        image: "",
      });

      toast({
        title: "Event added",
        description: "The event has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" padding="4">
      <VStack spacing="4" align="stretch">
        <Flex justify="space-between" wrap="wrap">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
          <Button
            colorScheme="teal"
            onClick={() => setIsModalOpen(true)}
            width="100px"
            justifyContent="center"
            position="fixed"
            bottom="6"
            right="6"
          >
            Add Event
          </Button>
        </Flex>

        <EventList
          loading={loading}
          filteredEvents={filteredEvents}
          categories={categories}
        />

        <AddEvent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setNewEvent={setNewEvent}
          newEvent={newEvent}
          categories={categories}
          handleAddEvent={handleAddEvent}
          users={users}
        />
      </VStack>
    </Container>
  );
};

export const loader = async () => {
  return { data: "some data" };
};

export default EventsPage;
