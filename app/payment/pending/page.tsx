'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentPending() {
  const router = useRouter();

  useEffect(() => {
    toast("Pagamento pendente, a reserva não foi confirmada.");
    
    const timer = setTimeout(() => {
      router.push("/reservation");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Pagamento pendente. Redirecionando...</h1>
    </div>
  );
}
