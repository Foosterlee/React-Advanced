import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom"; // Voeg useLoaderData toe
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return { categories: await categories.json(), users: await users.json() };
};

export const Root = () => {
  const { categories, users } = useLoaderData();

  return (
    <Box>
      <Container maxW="100%" p="0">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            fontFamily="serif"
            mb="8"
            mt="8"
            cursor="pointer"
          >
            Events{" "}
            <Text as="span" fontFamily="cursive" color="teal.500">
              for
            </Text>{" "}
            U
          </Heading>
        </Link>
        <CategoryContext.Provider value={{ categories, users }}>
          <Outlet />
        </CategoryContext.Provider>
      </Container>
    </Box>
  );
};
