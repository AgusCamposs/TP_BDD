package org.example;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

//Los métodos deben recibir a los documentos del estilo "{<campo> = <valor>}"
public class Peliculas {
    private final MongoDatabase database;

    public Peliculas() {
        database = MongodbConectar.getBasedeDatos();
    }

    // Método para insertar un documento, si un usuario ya habia opinado sobre una pelicula se pisa la opinion
    public void insertarOpinion(String Opinion,String Pelicula, String Usuario) {
        MongoCollection<Document> OpinionesPelicula = database.getCollection(Pelicula);
        Document filtro = new Document("Usuario", Usuario);
        Document resultado = OpinionesPelicula.find(filtro).first();
        if(resultado != null){
            OpinionesPelicula.updateOne(filtro, new Document("$set", new Document("Opinion",Opinion)));
        } else {
            Document nuevaOpinion = filtro.append("Opinion", Opinion);
            OpinionesPelicula.insertOne(nuevaOpinion);
        }
    }

    // Método para obtener todos los documentos
    public void listarOpiniones(String pelicula) {
        MongoCollection<Document> OpinionesPelicula = database.getCollection(pelicula);
        for (Document doc : OpinionesPelicula.find()) {
            System.out.println(doc.toJson());// por ahora se imprime, despues habria que ver como mostrarlo
        }
    }

    // Método para eliminar un documento
    public void eliminarOpinion(String Usuario, String Pelicula) {
        MongoCollection<Document> OpinionesPelicula = database.getCollection(Pelicula);
        OpinionesPelicula.deleteOne(new Document("Usuario", Usuario));
    }
}
