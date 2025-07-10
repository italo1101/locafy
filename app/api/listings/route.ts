import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/GetCurrentUser";
import { Filter } from "bad-words";

const filter = new Filter();
filter.addWords(
  "sexo", "puta", "caralho", "merda", "bosta", "porra", "cacete", "cu",
  "viado", "buceta", "pica", "arrombado", "foda", "fodido", "corno", "escroto",
  "otário", "fdp", "babaca", "desgraça", "vagabunda", "vagabundo", "nojento",
  "prostituta", "pau no cu", "pau no seu cu", "filho da puta", "cuzão",
  "retardado", "piranha", "enfia", "estupra", "estuprador", "estupro",
  "transa", "transar", "gozar", "gozo", "ejacular", "chupeta", "xereca",
  "rola", "anal", "oral", "boquete", "masturbação", "masturbar", "punheta",
  "siririca"
);

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // Melhor prática: retornar JSON com erro e status
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
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

  if (!title || title.length > 50 || filter.isProfane(title)) {
   
    return new NextResponse('Título inválido ou inadequado', { status: 400 });
  }

  if (!description || description.length > 5000 || filter.isProfane(description)) {
    
    return new NextResponse('Descrição inválida ou inadequada', { status: 400 });
  }

  if (!imageSrc) {
    
    return new NextResponse('A imagem é obrigatória', { status: 400 });
  }

  const numericPrice = parseInt(price, 10);
  if (isNaN(numericPrice) || numericPrice <= 0 || numericPrice > 100000) {
    
    return new NextResponse('O preço deve ser um número entre 1 e 100.000', { status: 400 });
  }

  if (guestCount > 1000 || bathroomCount > 50 || acCount > 50 || wifiCount > 50) {
    
    return new NextResponse('Valores para hóspedes, banheiros ou outros recursos parecem excessivos, verifique a quantidade de recursos antes de continuar.', { status: 400 });
  }

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
      price: numericPrice,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}