import getCurrentUser from "./actions/GetCurrentUser";
import getListings, { IListingsParams } from "./actions/GetListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams;

  const listingsParams: IListingsParams = {
    category: typeof params.category === 'string' ? params.category : undefined,
    locationValue: typeof params.locationValue === 'string' ? params.locationValue : undefined,
    guestCount: typeof params.guestCount === 'string' ? Number(params.guestCount) : undefined,
    roomCount: typeof params.roomCount === 'string' ? Number(params.roomCount) : undefined,
    bathroomCount: typeof params.bathroomCount === 'string' ? Number(params.bathroomCount) : undefined,
    wifiCount: typeof params.wifiCount === 'string' ? Number(params.wifiCount) : undefined,
    acCount: typeof params.acCount === 'string' ? Number(params.acCount) : undefined,
    startDate: typeof params.startDate === 'string' ? params.startDate : undefined,
    endDate: typeof params.endDate === 'string' ? params.endDate : undefined,
  };

  const listings = await getListings(listingsParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
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
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
