import getCurrentUser from "./actions/GetCurrentUser";
import getListings, { IListingsParams } from "./actions/GetListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({ searchParams }: HomeProps) => {
  // Converte searchParams em IListingsParams conforme necessário.
  const listingsParams: IListingsParams = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    locationValue: typeof searchParams.locationValue === 'string' ? searchParams.locationValue : undefined,
    guestCount: searchParams.guestCount ? Number(searchParams.guestCount) : undefined,
    roomCount: searchParams.roomCount ? Number(searchParams.roomCount) : undefined,
    bathroomCount: searchParams.bathroomCount ? Number(searchParams.bathroomCount) : undefined,
    wifiCount: searchParams.wifiCount ? Number(searchParams.wifiCount) : undefined,
    acCount: searchParams.acCount ? Number(searchParams.acCount) : undefined,
    startDate: typeof searchParams.startDate === 'string' ? searchParams.startDate : undefined,
    endDate: typeof searchParams.endDate === 'string' ? searchParams.endDate : undefined,
  };

  const listings = await getListings(listingsParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
