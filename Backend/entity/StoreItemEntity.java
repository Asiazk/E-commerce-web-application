package com.asia.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "store_items")
@Data
@NoArgsConstructor
public class StoreItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String itemName;
    private String description;
    private int price;
    private int quantity;
    private String imageUrl;
}
