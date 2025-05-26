'use client';

import Container from "../Container";

import { FaWarehouse, FaSwimmer, FaBirthdayCake, FaMusic, FaUtensils, FaParking, FaChurch, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';
import { MdSportsBasketball, MdOutlineBusinessCenter, MdFestival } from 'react-icons/md';
import { GiSoccerBall, GiBowlingStrike, GiOfficeChair } from 'react-icons/gi';


import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
      label: 'Casa de Festa',
      icon: FaBirthdayCake,
      description: 'Espaço ideal para festas de aniversário e confraternizações.'
    },
    {
      label: 'Depósito',
      icon: FaWarehouse,
      description: 'Espaço para armazenamento e logística temporária.'
    },
    {
      label: 'Quadra de Basquete',
      icon: MdSportsBasketball,
      description: 'Espaço para prática e campeonatos de basquete.'
    },
    {
      label: 'Quadra de Society',
      icon: GiSoccerBall,
      description: 'Campo society ideal para jogos e torneios.'
    },
    {
      label: 'Piscina',
      icon: FaSwimmer,
      description: 'Local com piscina para eventos ou lazer.'
    },
    {
      label: 'Evento Corporativo',
      icon: MdOutlineBusinessCenter,
      description: 'Espaço voltado para eventos empresariais e reuniões.'
    },
    {
      label: 'Festa Noturna',
      icon: FaMusic,
      description: 'Espaço voltado para festas com música e iluminação especial.'
    },
    {
      label: 'Espaço Gourmet',
      icon: FaUtensils,
      description: 'Local com estrutura para eventos gastronômicos.'
    },
    {
      label: 'Estacionamento',
      icon: FaParking,
      description: 'Área ampla para estacionamento de veículos em eventos.'
    },
    {
      label: 'Salão de Eventos',
      icon: FaBuilding,
      description: 'Salão versátil para eventos sociais ou corporativos.'
    },
    {
      label: 'Sala de Reunião',
      icon: GiOfficeChair,
      description: 'Espaço reservado para reuniões empresariais.'
    },
    {
      label: 'Sala de Aula',
      icon: FaChalkboardTeacher,
      description: 'Ideal para cursos, palestras ou treinamentos.'
    },
    {
      label: 'Espaço para Casamento',
      icon: FaChurch,
      description: 'Ambiente preparado para cerimônias e festas de casamento.'
    },
    {
      label: 'Festival / Feira',
      icon: MdFestival,
      description: 'Espaço amplo para festivais, feiras e eventos ao ar livre.'
    },
    {
      label: 'Boliche',
      icon: GiBowlingStrike,
      description: 'Espaço com pistas de boliche para eventos recreativos.'
    }
  ];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/'

    if(!isMainPage){
        return null;
    }

    return(
      <Container>
        <div
            className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
        >
            {categories.map((item) => 
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category == item.label}
                    icon={item.icon}
                />
            )}
        </div>
      </Container>
    );
}

export default Categories;