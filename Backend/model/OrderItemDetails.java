package com.asia.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDetails {
    private long productId;
    private int amount;
    private String name;
}
