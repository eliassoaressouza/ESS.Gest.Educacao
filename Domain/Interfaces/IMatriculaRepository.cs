﻿using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMatriculaRepository
    {
        IList<Matricula> ObterLista();
    }
}
