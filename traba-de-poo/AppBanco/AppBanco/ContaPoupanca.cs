using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    public class ContaPoupanca
    {
        public int Numero { get; set; }
        public Cliente Titular { get; set; }
        public double Saldo { get; set; }

        public ContaPoupanca(int numero, Cliente titular, double saldo)
        {
            this.Numero = numero;
            this.Titular = titular;
            this.Saldo = saldo;

        }
    }
}
