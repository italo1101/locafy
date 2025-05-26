import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/GetCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    guestCount,
    roomCount,
    wifiCount,
    bathroomCount,
    acCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((key: string) => {
    if (!body[key]) {
      throw new Error(`O campo ${key} está vazio.`);
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      guestCount,
      roomCount,
      wifiCount,
      bathroomCount,
      acCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
