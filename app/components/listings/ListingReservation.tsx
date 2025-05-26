'use client'

import { Range } from 'react-date-range';
import Calendar from '../inputs/calendar';
import Button from '../Button';

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return ( 
        <div
            className='
                bg-white
                rounded-xl
                border-neutral-200
                overflow-hidden
            '
        >
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className="text-2xl font-semibold">
                    R${price}
                </div>
                <div className='font-light text-neutral-600'>
                    diária
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            '>
                <div>
                    Total
                </div>
                <div>
                  R$ {totalPrice}
                </div>
            </div>
            <div className='p-4'>
                <Button
                  disable={disabled}  
                  label="Reservar"
                  onClick={onSubmit}
                />

            </div>
        </div>
     );
}
 
export default ListingReservation;