export const formatDateTime = (dateTimeString, separator = <br />) => {
  return (
    <>
      {formatDate(dateTimeString)}
      {separator}
      {formatTime(dateTimeString)}
    </>
  );
};

export const formatDate = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (dateTimeString) => {
  return new Date(dateTimeString)
    .toLocaleTimeString()
    .match(/\d{2}:\d{2}|[AMP]+/g)
    ?.join(" ");
};

export const formatDatePicker = (dateTimeString) => {
  if (dateTimeString == "" || dateTimeString == undefined) {
    return "";
  }
  return new Date(dateTimeString).toISOString().substring(0, 23);
};
