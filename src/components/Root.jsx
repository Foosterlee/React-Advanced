import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";

export const loader = async () => {
  const [categories, users] = await Promise.all([
    fetch("http://localhost:3000/categories").then((res) => res.json()),
    fetch("http://localhost:3000/users").then((res) => res.json()),
  ]);

  return { categories, users };
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
