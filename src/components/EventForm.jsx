import React, { useContext } from "react";
import {
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { formatDatePicker } from "../utils/Formatting";

const EventForm = ({
    formData,
    handleInputChange
}) => {
    const { categories, users } = useContext(CategoryContext);

    return (
        <>
            <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) =>
                        handleInputChange("description", e.target.value)
                    }
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Start Time</FormLabel>
                <Input
                    type="datetime-local"
                    value={formatDatePicker(formData.startTime)}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                    type="datetime-local"
                    value={formatDatePicker(formData.endTime)}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <CheckboxGroup
                    isInline
                    spacing={16}
                    variantColor="teal"
                    value={formData.categoryIds || []}
                    onChange={(values) => handleInputChange("categoryIds", values)}
                >
                    {categories.map((category) => (
                        <Checkbox key={category.id} value={category.name} >{category.name}</Checkbox>
                    ))}
                </CheckboxGroup>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Created By</FormLabel>
                <Select
                    value={formData.createdBy}
                    onChange={(e) => handleInputChange("createdBy", e.target.value)}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            {formData.image && (
                <FormControl mt={4}>
                    <FormLabel>Existing Photo</FormLabel>
                    <img
                        src={formData.image}
                        alt="Event"
                        style={{ maxWidth: "100%" }}
                    />
                </FormControl>
            )}
        </>
    );
};

export default EventForm;
