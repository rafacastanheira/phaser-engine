using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace AppBanco
{
    class Program
    {
        static void Main(string[] args)
        {
            /*//Preenche uma lista
            List<Banco> list = new List<Banco>();
            for (int i = 0; i < 25; i++)
            {
                Banco b = new Banco();                
                list.Add(b);
            }
            //Salva em arquivo
            try
            {
                using (Stream stream = File.Open("data.bin", FileMode.Create))
                {
                    BinaryFormatter bin = new BinaryFormatter();
                    bin.Serialize(stream, list);
                }
            }
            catch (IOException)
            {
            }
            //Carrega de arquivo
            List<Banco> list2 = new List<Banco>();
            try
            {
                using (Stream stream = File.Open("data.bin", FileMode.Open))
                {
                    BinaryFormatter bin = new BinaryFormatter();

                    list2 = (List<Banco>)bin.Deserialize(stream);
                    foreach (Bancos b in list2)
                    {
                        Console.WriteLine(b.Nome);
                        b.printDependentes();
                    }
                }
            }
            catch (IOException)
            {
            }*/

            Menu menu = new Menu();
            menu.menuOpcoes();

            Console.ReadKey();
        }
    }
}
