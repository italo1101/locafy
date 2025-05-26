import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/GetCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extrair `reservationId` da URL
  const url = new URL(request.url);
  const reservationId = url.pathname.split('/').pop(); // ou use regex para maior segurança

  if (!reservationId) {
    return NextResponse.json({ error: "Invalid reservation ID" }, { status: 400 });
  }

  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      }
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
