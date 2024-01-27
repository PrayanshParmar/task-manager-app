export function formatDate(inputDate: string): string {
  const dateObject = new Date(inputDate);

  const day: string = String(dateObject.getDate()).padStart(2, "0");
  const month: string = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year: number = dateObject.getFullYear();

  return `${day}/${month}/${year}`;
}
