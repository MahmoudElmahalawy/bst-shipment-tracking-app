export function getFormattedDateTime(dateStr: string, locale: "en-EG" | "ar-EG", dateOnly: boolean = false) {
	if (!dateStr) return;

	const date = new Date(dateStr);
	const dayOfWeek = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
	const dayOfMonth = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	if (dateOnly) return `${dayOfMonth} ${new Intl.DateTimeFormat(locale, { month: "long" }).format(date)} ${year}`;

	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	// Convert to 12-hour clock
	if (hours > 12) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}

	const formattedDate = `${dayOfWeek}, ${dayOfMonth}/${month}/${year} at ${hours}:${minutes
		.toString()
		.padStart(2, "0")}${ampm}`;
	return formattedDate;
}
