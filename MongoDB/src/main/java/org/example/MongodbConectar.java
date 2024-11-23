package org.example;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongodbConectar {
    private static MongoClient MongoClient = null;
    private static final String URI =  "mongodb+srv://Santi04:1234@basedatos.w0v3c.mongodb.net/";
    private static final String NombreBDD = "TP";

    //devuelve la base de datos verificando si ya se abrio o no
    public static MongoDatabase getBasedeDatos() {
        if (MongoClient == null) {
            MongoClient = MongoClients.create(URI);
        }
        return MongoClient.getDatabase(NombreBDD);
    }

    //cierra la base de datos si es que esta abierta
    public static void CloseMongodb() {
        if (MongoClient != null) {
            MongoClient.close();
        }
    }
}
