export const buildShowPlacePath = (placeId: string) => `/places/show/${placeId}`;

export const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(dateString));
