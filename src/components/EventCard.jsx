import React from "react";
import { Box, Heading, Text, HStack, Tag, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/Formatting";

const EventCard = ({ event, categories }) => {
  return (
    <Link to={`/event/${event.id}`} style={{ width: "calc(50% - 2rem)" }}>
      <Box
        key={event.id}
        borderWidth="1px"
        borderRadius="md"
        p="0"
        mt="4"
        w="100%"
        bg="blackAlpha.50"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          boxSize="100%"
          h="250px"
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
            <Text>{formatDateTime(event.startTime)}</Text>
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              -
            </Text>
            <Text>{formatDateTime(event.endTime)}</Text>
          </HStack>
          <Center>
            <HStack spacing="4" mt="4" justify="center" align="center">
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
