'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentFailure() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Não foi possível confirmar o pagamento, sua reserva foi negada.");
  
    const timer = setTimeout(() => {
      router.push("/reservation"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Pagamento falhou! Redirecionando...</h1>
    </div>
  );
}
