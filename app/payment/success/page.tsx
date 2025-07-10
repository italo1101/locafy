'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const router = useRouter();

 useEffect(() => {
  toast.success("Reserva confirmada com sucesso");
  const timer = setTimeout(() => {
    router.push("/trips"); 
  }, 2000);

  return () => clearTimeout(timer);
}, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Pagamento aprovado! Redirecionando...</h1>
    </div>
  );
}
