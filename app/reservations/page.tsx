import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/GetCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Acesso não autorizado"
                    subtitle="Faça login para continuar"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });
    
    if(reservations.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title=" Nenhuma reserva encontrada"
                    subtitle="Parece que ainda não há reservas nos seus espaços"
                />
            </ClientOnly>
        )
    }
    
    return(
        <ClientOnly>
           <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
           /> 
        </ClientOnly>
    )
}



export default ReservationsPage