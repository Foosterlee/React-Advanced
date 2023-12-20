// EventCard.jsx

import React from "react";
import { Box, Heading, Text, HStack, Tag, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const formatDate = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
};

const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const EventCard = ({ event, categories }) => {
  return (
    <Link to={`/event/${event.id}`} style={{ width: "calc(50% - 2rem)" }}>
      <Box
        key={event.id}
        borderWidth="1px"
        borderRadius="md"
        p="0" // Set padding to 0
        mt="4"
        w="100%" // Set width to 100%
        bg="blackAlpha.50"
        overflow="hidden" // Hide any overflow content
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }} // Add a slight scale effect on hover
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          boxSize="100%" // Set width to 100%
          h="250px" // Increased height
          bgImage={`url(${event.image})`}
          bgSize="cover"
          bgPosition="center"
          borderRadius="md"
        ></Box>
        <Box p="4" textAlign="center">
          <Heading as="h2" size="lg" mb="2" isTruncated>
            {event.title}
          </Heading>
          <Text fontStyle="italic" noOfLines={3} mb="2">
            {event.description}
          </Text>
          <HStack justify="center" spacing="10" mt="6" mb="5">
            <Text>
              {formatDate(event.startTime)} <br />
              {formatTime(event.startTime)}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              -
            </Text>
            <Text>
              {formatDate(event.endTime)} <br /> {formatTime(event.endTime)}
            </Text>
          </HStack>
          <Center>
            <HStack spacing="1" mt="4">
              {event.categoryIds &&
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
          </Center>
        </Box>
      </Box>
    </Link>
  );
};

export default EventCard;
