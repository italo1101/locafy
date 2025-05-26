'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ptBR } from 'date-fns/locale';
import { Locale } from 'date-fns';

interface CalendarProps{
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}


const ptBRCustom: Locale = {
  ...ptBR,
  localize: ptBR.localize
    ? {
        ...ptBR.localize,
        day: (n: number) => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][n],
        month: (n: number) =>
          ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][n],
      }
    : undefined!,
};


const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return ( 
        <div>
            <DateRange
                rangeColors={["#1e3a8a"]}
                ranges={[value]}
                date={new Date()}
                locale={ptBRCustom}
                onChange={onChange}
                direction="vertical"
                showDateDisplay={false}
                minDate={new Date()}
                disabledDates={disabledDates}
            />
        </div>
     );
}
 
export default Calendar;