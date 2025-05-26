'use client'

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { Safelisting, SafeUser } from '../types'

interface FavoritesClientProps{
    listings: Safelisting[];
    currentUser?: SafeUser | null;
}

const FavoriteClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return ( 
        <Container>
            <Heading
                title='Meus Favoritos'
                subtitle='Os lugares que você mais gostou'
            />

            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {listings.map((listing) => (
                  <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                  />  
                ))}
            </div>

        </Container>
     );
}
 
export default FavoriteClient;