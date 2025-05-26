import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/GetCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/GetListings";

const PropertiesPage = async () => {
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

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="Nenhuma propriedade encontrada"
                    subtitle=" Parece que você ainda não tem nenhuma propriedade"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;