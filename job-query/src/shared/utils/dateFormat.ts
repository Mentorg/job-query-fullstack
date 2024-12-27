const currentDate = new Date();

const formattedCurrentDate = String(currentDate.getMonth() + 1).padStart(
  2,
  "0",
);

export const currentMonth = `${currentDate.getFullYear()}-${formattedCurrentDate}-${String(currentDate.getDate()).padStart(2, "0")}`;

const deadlineDate = new Date(currentDate);
deadlineDate.setMonth(deadlineDate.getMonth() + 1);

const deadlineMonth = String(deadlineDate.getMonth() + 1).padStart(2, "0");

export const deadline = `${deadlineDate.getFullYear()}-${deadlineMonth}-${String(deadlineDate.getDate()).padStart(2, "0")}`;

export const formatDate = (dateString: string, separator: string = ".") => {
  let day: string, month: string, year: string;

  // Check if the dateString contains "T", indicating it's an ISO format with time
  if (dateString.includes("T")) {
    // Remove the time part and only keep the date part
    dateString = dateString.split("T")[0];
  }

  // Now, check if the dateString contains a dot (.) indicating dd.mm.yyyy format
  if (dateString.includes(".")) {
    const [dayPart, monthPart, yearPart] = dateString.split(separator);
    // Reformat the date to yyyy-mm-dd
    day = dayPart.padStart(2, "0");
    month = monthPart.padStart(2, "0");
    year = yearPart;
  } else if (dateString.includes("-")) {
    // If the format is yyyy-mm-dd, simply split by "-"
    const [yearPart, monthPart, dayPart] = dateString.split("-");
    day = dayPart.padStart(2, "0");
    month = monthPart.padStart(2, "0");
    year = yearPart;
  } else {
    return ""; // If the date is unrecognized, return an empty string
  }

  // Return the formatted date with the given separator
  return `${day}${separator}${month}${separator}${year}`;
};

export const formatDeadline = (dateString: string, separator: string = ".") => {
  const [datePart] = dateString.split(" ");

  const [year, month, day] = datePart.split("-");

  return `${day}${separator}${month}${separator}${year}`;
};
