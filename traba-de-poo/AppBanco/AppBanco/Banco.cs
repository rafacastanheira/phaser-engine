using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    public class Banco
    {
        public float Armazenar { get; set; }
        public float Emprestar { get; set; }
        public float Receber { get; set; }
        public List<Conta> contas { get; set; }
        public List<Cliente> clientes { get; set; }

        int contaC = 0;
        int clienteC = 0;

        public Banco()
        {
            this.contas = new List<Conta>();
            this.clientes = new List<Cliente>();
        }


        public void adicionarConta(Cliente cliente)
        {
            this.clientes.Add(cliente);
            clienteC += 1;
            cliente.IdCliente = clienteC;

            //Cliente cliente = new Cliente();

            //Console.WriteLine("Informe o nome do titular:");
            //cliente.Nome = Console.ReadLine();
            //Console.WriteLine("Informe o endereço do titular:");
            //cliente.Endereco = Console.ReadLine();
            //Console.WriteLine("Informe a data de nascimento do titular:");
            //cliente.DataNascimento = DateTime.Parse(Console.ReadLine());
            //Console.WriteLine("Informe o CPF do titular:");
            //cliente.Cpf = Console.ReadLine();
            //Console.WriteLine("Informe o e-mail do titular:");
            //cliente.Email = Console.ReadLine();

            Conta conta = new Conta()
            {
                Titular = cliente
            };

            Console.WriteLine("Conta cadastrada com sucesso!");
        }

        public void deletarConta(int numero)
        {
            var p = contas.FirstOrDefault(x => x.Numero == numero);
            var a = contas.Any(x => x.Numero == numero);
            if (a == true)
            {
                this.contas.Remove(p);
                Console.WriteLine("Conta deletada com sucesso!");
            }
            else
            {
                Console.WriteLine("ATENÇÃO! A conta informada não foi encontrada");
            }
        }

        public void listarCliente(int numero)
        {
            var p = contas.FirstOrDefault(x => x.Numero == numero);
            var a = contas.Any(x => x.Numero == numero);
            if (a == false)
            {
                Console.WriteLine("Não há registros para filtro");
            }
            else
            {
                Console.WriteLine("-------------------------------------------");
                Console.WriteLine("Conta: " + p.Numero);
                Console.WriteLine("Titular: " + p.Titular);
                Console.WriteLine("Saldo atual: " + p.Saldo);
                Console.WriteLine("-------------------------------------------");
            }

        }
    }
}
