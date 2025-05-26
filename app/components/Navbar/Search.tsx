"use client";

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/userSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationlabel = useMemo(() => {
    if(locationValue){
      return getByValue(locationValue as string)?.label
    }

    return 'Qualquer Lugar'
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if(startDate && endDate){
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start)

      if(diff == 0){
        diff = 1;
      }

      return `${diff} days`
    }

    return 'Qualquer Semana'
  },[startDate, endDate])

  const guestLabel = useMemo(() => {
    if(guestCount){
      return `${guestCount} Pessoas`
    }

    return 'Adicione pessoas'
  },[guestCount])

  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        mb-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        flex
        flex-row
        items-center
        justify-between
      "
    >
      <div
        onClick={searchModal.onOpen}
        className="
          text-sm
          font-semibold
          px-6
          cursor-pointer
          hover:text-blue-700
        "
      >
        {locationlabel}
      </div>

      <div
        onClick={searchModal.onOpen}
        className="
          hidden
          sm:block
          text-sm
          font-semibold
          px-6
          border-x-[1px]
          flex-1
          text-center
          cursor-pointer
          hover:text-blue-700
        "
      >
        {durationLabel}
      </div>

      <div
        onClick={searchModal.onOpen}
        className="
          text-sm
          pl-6
          pr-2
          text-gray-600
          flex
          flex-row
          items-center
          gap-3
          cursor-pointer
          hover:text-blue-700
        "
      >
        <div className="hidden sm:block">{guestLabel}</div>
        <div
          className="
            p-2
            bg-blue-900
            rounded-full
            text-white
          "
        >
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
