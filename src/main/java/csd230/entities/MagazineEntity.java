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

    public MagazineEntity() {
    }

    public MagazineEntity(String title, double price, int copies, int orderQty, LocalDateTime currentIssue) {
        super(title, price, copies);
        this.orderQty = orderQty;
        this.currentIssue = currentIssue;
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

    @Override
    public String toString() {
        return "MagazineEntity{" +
                "orderQty=" + orderQty +
                ", currentIssue=" + currentIssue +
                "} " + super.toString();
    }
}