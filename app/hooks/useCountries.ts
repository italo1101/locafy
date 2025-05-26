/* eslint-disable @typescript-eslint/no-require-imports */
import countries from 'world-countries';
import isoCountries from 'i18n-iso-countries';
import 'i18n-iso-countries/langs/pt.json';

isoCountries.registerLocale(require('i18n-iso-countries/langs/pt.json'));

const regionTranslations: Record<string, string> = {
  Europe: 'Europa',
  Americas: 'Américas',
  Asia: 'Ásia',
  Africa: 'África',
  Oceania: 'Oceania',
  Antarctic: 'Antártida',
};

const formattedCountries = countries.map((country) => {
  const ptLabel = isoCountries.getName(country.cca2, 'pt') || country.name.common;
  return {
    value: country.cca2,
    label: ptLabel,
    flag: country.flag,
    latlng: country.latlng,
    region: regionTranslations[country.region] || country.region,
  };
});


const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
       return formattedCountries.find((item) => item.value == value); 
    }

    return{
        getAll,
        getByValue,
    }
}

export default useCountries;