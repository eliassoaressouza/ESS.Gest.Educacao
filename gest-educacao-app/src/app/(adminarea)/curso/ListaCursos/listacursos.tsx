import CardCurso from '@/app/(adminarea)/curso/CardCurso/cardcurso';
import { ICursoDTO } from '@/dto/curso/curso.dto';
import React from 'react';

export default function ListaCursos(props: { listaCursos: ICursoDTO[] }) {
    return (
        <>
            {props.listaCursos && props.listaCursos.map(curso =>
                <CardCurso key={curso.idCurso} curso={curso} />
            )
            }
        </>
    );
}