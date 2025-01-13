import { ICursoDTO } from '@/dto/curso/curso.dto';
import React from 'react';
import ListaCursosCard from '../../curso/ListaCursosCard/listacursoscard';

export default function Dashboard(props: { listaCursos: ICursoDTO[] }) {
    return (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
            <ListaCursosCard listaCursos={props.listaCursos} />
        </div>
    );
}