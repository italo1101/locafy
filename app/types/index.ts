import { User, Listing, Reservation } from '@prisma/client';

export type Safelisting = Omit<
    Listing,
    "createdAt"
> & {
   createdAt: string; 
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: Safelisting;
}

export type SafeUser = Omit<
    User, 
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
