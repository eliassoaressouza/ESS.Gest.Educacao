import { ICursoDTO } from '@/dto/curso/curso.dto';
import React from 'react';
import ListaCursosCard from '../../curso/ListaCursosCard/listacursoscard';

type DashboardParams = {
    listaCursos: ICursoDTO[];
}
export default function Dashboard({ listaCursos }: DashboardParams) {
    return (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
            {listaCursos && listaCursos.length ?
                <ListaCursosCard listaCursos={listaCursos} />
                : <p>Não foi possivel carregar lista de cursos!</p>
            }
        </div>
    );
}