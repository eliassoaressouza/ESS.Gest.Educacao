import CardCurso from '@/app/(adminarea)/curso/ListaCursosCard/CardCurso/cardcurso';
import { ICursoDTO } from '@/dto/curso/curso.dto';
import React from 'react';

export default function ListaCursosCard(props: { listaCursos: ICursoDTO[] }) {
    return (
        <>
            {props.listaCursos && props.listaCursos.map(curso =>
                <CardCurso key={curso.IdCurso} curso={curso} />
            )
            }
        </>
    );
}