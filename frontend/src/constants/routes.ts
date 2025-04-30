export const ROUTES = {
    HOME: "/",
    ACCOUNT: {
        ROOT: "/account",
        BOOKINGS: "/account/bookings",
        PLACES: "/account/places",
        NEW_PLACE: "/account/places/new",
        SHOW_PLACE: "/account/places/:placeId"
    },
    CALLBACK: "/callback"
} as const

