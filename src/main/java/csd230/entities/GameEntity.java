package csd230.entities;

import jakarta.persistence.Entity;

@Entity
public class GameEntity extends PublicationEntity {

    private String platform;
    private String genre;

    public GameEntity() {
    }

    public GameEntity(String title, double price, int copies, String platform, String genre) {
        super(title, price, copies);
        this.platform = platform;
        this.genre = genre;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}