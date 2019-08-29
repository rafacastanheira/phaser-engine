using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    public class Gerente
    {
        public int IdGerente { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public string Email { get; set; }

        public Gerente()
        { }

        public Gerente(string nome, string telefone, string endereco, string email)
        {
            this.Nome = nome;
            this.Telefone = telefone;
            this.Endereco = endereco;
            this.Email = email;
        }
    }
}
