export const emtpyEvent = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  categoryIds: [],
  createdBy: "",
  image: "",
};

export const EventWithData = (data) => {
  return {
    title: data?.title || "",
    description: data?.description || "",
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
    categoryIds: data?.categoryIds || [],
    createdBy: data?.createdBy || "",
    image: data?.image || "",
  };
};
