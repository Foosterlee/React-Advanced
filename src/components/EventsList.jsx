import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";

const EventList = ({ loading, filteredEvents, categories }) => {
  return (
    <Flex justify="space-between" wrap="wrap">
      {loading ? (
        <Text>Loading events...</Text>
      ) : filteredEvents.length === 0 ? (
        <Text>No matching events found.</Text>
      ) : (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} categories={categories} />
        ))
      )}
    </Flex>
  );
};

export default EventList;
