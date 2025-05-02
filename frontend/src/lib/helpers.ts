import { format } from "date-fns";

export const buildShowPlacePath = (placeId: string) => `/places/show/${placeId}`;
export const buildEditPlacePath = (placeId: string) => `/places/edit/${placeId}`;

export const formatDate = (date: string) => {
    return format(new Date(date), "MMM dd, yyyy");
}