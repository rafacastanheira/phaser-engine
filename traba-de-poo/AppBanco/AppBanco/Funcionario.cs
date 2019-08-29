using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    public class Funcionario
    {
        public int Matricula { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string Email { get; set; }
        public string Cpf  { get; set; }

        public Funcionario()
        { }

        public Funcionario(string nome, string telefone, string endereco, string email, string cpf)
        {
            this.Nome = nome;
            this.Telefone = telefone;
            this.Endereco = endereco;
            this.Email = email;
            this.Cpf = cpf;
        }
    }
}
