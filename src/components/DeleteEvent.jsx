import React, { useState } from "react";
import {
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const DeleteEvent = ({ onClose, onDeleteEvent }) => {
  const toast = useToast();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDelete = async () => {
    setIsAlertDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Voeg hier de logica toe om het evenement daadwerkelijk te verwijderen
      await onDeleteEvent();
      toast({
        title: "Event deleted",
        description: "The event has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsAlertDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={handleDelete}
        position="fixed"
        bottom="4"
        right="4"
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={isAlertDialogOpen}
        onClose={handleCancelDelete}
        leastDestructiveRef={undefined}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>
              Are you sure you want to delete this event?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={handleConfirmDelete}>
                Yes, delete
              </Button>
              <Button variant="ghost" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteEvent;
