package org.example;

public class Main {
    public static void main(String[] args) {
        // por ahora para probar la clase Peliculas{Creed, "Volver al Futuro"}
        Peliculas pelis = new Peliculas();
        pelis.insertarOpinion("Muyy inspiradora esta pelicula","Creed","Pedro");
        pelis.listarOpiniones("Creed");
    }
}