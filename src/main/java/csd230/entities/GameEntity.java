package csd230.entities;

import jakarta.persistence.Entity;

@Entity
public class GameEntity extends PublicationEntity {

    private String platform;
    private String genre;
    private String studio;
    private String rating;

    public GameEntity() {
    }

    public GameEntity(String title, double price, int copies, String platform, String genre, String studio, String rating) {
        super(title, price, copies);
        this.platform = platform;
        this.genre = genre;
        this.studio = studio;
        this.rating = rating;
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

    public String getStudio() {
        return studio;
    }

    public void setStudio(String studio) {
        this.studio = studio;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}