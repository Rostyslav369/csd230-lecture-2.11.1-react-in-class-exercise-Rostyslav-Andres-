package csd230.entities;

import jakarta.persistence.Entity;

@Entity
public class MovieEntity extends ProductEntity {

    private String title;
    private String director;
    private String genre;
    private String rating;
    private double price;
    private int copies;
    private int durationMinutes;

    public MovieEntity() {
    }

    public MovieEntity(String title, String director, String genre, String rating, double price, int copies, int durationMinutes) {
        this.title = title;
        this.director = director;
        this.genre = genre;
        this.rating = rating;
        this.price = price;
        this.copies = copies;
        this.durationMinutes = durationMinutes;
    }

    @Override
    public void sellItem() {
        if (copies > 0) {
            copies--;
            System.out.println("Sold movie '" + title + "'. Remaining copies: " + copies);
        } else {
            System.out.println("Cannot sell '" + title + "'. Out of stock.");
        }
    }

    @Override
    public double getPrice() {
        return price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCopies() {
        return copies;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}