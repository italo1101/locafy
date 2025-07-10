import { NextResponse } from "next/server";
import mercadopago from "@/app/libs/mercadopago";
import { Preference } from "mercadopago/dist/clients/preference";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: "BASE_URL não definida no .env" }, { status: 500 });
    }

    const preferenceClient = new Preference(mercadopago);

    const preference = {
      items: [
        {
          id: "espaco-001",
          title: body.nomeEspaco || "Reserva",
          quantity: 1,
          unit_price: Number(body.valor) || 100,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`,
      },
      auto_return: "approved",
    };

    const response = await preferenceClient.create({ body: preference });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json({ error: "Erro ao criar preferência" }, { status: 500 });
  }
}

