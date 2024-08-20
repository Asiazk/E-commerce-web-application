package com.asia.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ordered_items")
@Data
@NoArgsConstructor
public class OrderedItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long productId;
    private int amount;
    private int price;
    private String name;

    @ManyToOne
    @JoinColumn
    private OrderEntity orderEntity;
}

