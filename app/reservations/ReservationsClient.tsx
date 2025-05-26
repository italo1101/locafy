'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeReservation } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface ReservationsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reserva Cancelada')
            router.refresh();
        })
        .catch(() => {
            toast.error('Alguma coisa deu errado')
        })
        .finally(() => {
           setDeletingId('');
        })
    }, [router])

    return ( 
       <Container>
            <Heading
                title="Agendamentos"
                subtitle="Confira quem reservou seu espaço"
            />
            <div
                className="
                     mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservations) =>(
                    <ListingCard
                        key={reservations.id}
                        data={reservations.listing}
                        reservation={reservations}
                        actionId={reservations.id}
                        onAction={onCancel}
                        disabled={deletingId == reservations.id}
                        actionLabel='Cancelar agendamento'
                        currentUser={currentUser}
                    />
                ))}
            </div>
       </Container>
     );
}
 
export default ReservationsClient;