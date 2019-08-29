using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    public class Conta
    {
        public int Numero { get; set; }
        public Cliente Titular { get; set; }
        public double Saldo { get; set; }
        public int TipoConta { get; set; }

        public Conta()
        { }

        public bool Sacar(double valor)
        {
            if (this.Saldo >= valor)
            {
                this.Saldo -= valor;
                return true;
            }
            else
            {
                return false;
            }
        }

        public void Depositar(double valor)
        {
            this.Saldo += valor;
        }

        public void Transferir(double valor, Conta destino)
        {
            if (this.Sacar(valor))
            {
                destino.Depositar(valor);
            }
        }
    }
}
