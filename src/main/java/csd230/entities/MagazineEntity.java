package csd230.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {

    private int orderQty;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime currentIssue;

    private String category;
    private String publisher;

    public MagazineEntity() {
    }

    public MagazineEntity(String title, double price, int copies, int orderQty, LocalDateTime currentIssue, String category, String publisher) {
        super(title, price, copies);
        this.orderQty = orderQty;
        this.currentIssue = currentIssue;
        this.category = category;
        this.publisher = publisher;
    }

    public int getOrderQty() {
        return orderQty;
    }

    public void setOrderQty(int orderQty) {
        this.orderQty = orderQty;
    }

    public LocalDateTime getCurrentIssue() {
        return currentIssue;
    }

    public void setCurrentIssue(LocalDateTime currentIssue) {
        this.currentIssue = currentIssue;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    @Override
    public String toString() {
        return "MagazineEntity{" +
                "orderQty=" + orderQty +
                ", currentIssue=" + currentIssue +
                ", category='" + category + '\'' +
                ", publisher='" + publisher + '\'' +
                "} " + super.toString();
    }
}