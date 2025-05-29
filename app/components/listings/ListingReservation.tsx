'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/calendar';
import Button from '../Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void; // Esta função será chamada para salvar a reserva
  disabled?: boolean;
  disabledDates: Date[];
  listingId: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  listingId
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Primeiro salva a reserva (por exemplo, em banco de dados local)
      await onSubmit();

      // Depois inicia o pagamento no Mercado Pago
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomeEspaco: listingId,
          valor: totalPrice
        })
      });

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setLoading(false);
        alert('Erro ao iniciar pagamento');
      }
    } catch (error) {
      setLoading(false);
      alert('Erro de conexão ou ao criar reserva');
    }
  };

  return (
    <div className='bg-white rounded-xl border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className="text-2xl font-semibold">R${price}</div>
        <div className='font-light text-neutral-600'>diária</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>R$ {totalPrice}</div>
      </div>
      <div className='p-4'>
        <Button
          disable={disabled || loading}
          label={loading ? 'Processando...' : 'Reservar'}
          onClick={handlePayment}
        />
      </div>
    </div>
  );
};

export default ListingReservation;
