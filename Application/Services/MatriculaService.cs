using Application.Interaces;
using Application.Utils;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MatriculaService : IMatriculaService
    {
        private readonly IMatriculaRepository _MatriculaRepository;

        public MatriculaService(IMatriculaRepository matriculaRepository)
        {
            _MatriculaRepository = matriculaRepository;
        }

        public ReturnInfo<Matricula> ObterLista()
        {
            var result = new ReturnInfo<Matricula>();

            result.Items = _MatriculaRepository.ObterLista();

            return result;
        }
    }
}
