package com.asia.ecommerce.services;

import com.asia.ecommerce.entity.OrderEntity;
import com.asia.ecommerce.entity.OrderedItemEntity;
import com.asia.ecommerce.entity.StoreItemEntity;
import com.asia.ecommerce.model.OrderDetails;
import com.asia.ecommerce.model.OrderItem;
import com.asia.ecommerce.model.OrderItemDetails;
import com.asia.ecommerce.model.OrderStatus;
import com.asia.ecommerce.repository.OrderRepository;
import com.asia.ecommerce.repository.OrderedItemRepository;
import com.asia.ecommerce.repository.StoreItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private OrderedItemRepository orderedItemRepository;
    private StoreItemRepository storeItemRepository;

    public OrderService(OrderRepository orderRepository, OrderedItemRepository orderedItemRepository, StoreItemRepository storeItemRepository) {
        this.orderRepository = orderRepository;
        this.orderedItemRepository = orderedItemRepository;
        this.storeItemRepository = storeItemRepository;
    }

    /**
     *     transactional annotation used for concurrent use of store items table.
     *     row of store item is locked when saving user's order.
     *     this annotation is also used when reading data from locked rows of tables store items, orders, order items.
     **/
    @Transactional
    public List<OrderItem> processOrder(long userId, List<OrderItem> cart) {
        System.out.println(cart);
        OrderEntity newOrderEntity = new OrderEntity();
        int totalPrice = 0;
        orderRepository.save(newOrderEntity);
        for (OrderItem item : cart) {
            StoreItemEntity product = storeItemRepository.findById(item.getId()).orElseThrow();
            item.setPrice(product.getPrice());
            int currQuantity = product.getQuantity();
            int itemAmount = item.getAmount();
            if (currQuantity >= itemAmount) {
                product.setQuantity(currQuantity - itemAmount);
                storeItemRepository.save(product);
            }
            else {
                item.setAmount(currQuantity);
                product.setQuantity(0);
                storeItemRepository.save(product);
            }

            OrderedItemEntity newOrderedItemEntity = new OrderedItemEntity();

            newOrderedItemEntity.setProductId(item.getId());
            newOrderedItemEntity.setAmount(item.getAmount());
            newOrderedItemEntity.setPrice(item.getPrice());
            newOrderedItemEntity.setOrderEntity(newOrderEntity);
            newOrderedItemEntity.setName(product.getItemName());
            orderedItemRepository.save(newOrderedItemEntity);
            totalPrice += newOrderedItemEntity.getPrice() * newOrderedItemEntity.getAmount();

            newOrderEntity.addItemsToCartItems(newOrderedItemEntity);
        }
        newOrderEntity.setUserId(userId);
        newOrderEntity.setDate(new Date());
        if (totalPrice == 0) {
            newOrderEntity.setOrderStatus(OrderStatus.CANCELED);
        }
        else {
            newOrderEntity.setOrderStatus(OrderStatus.ACCEPTED);
        }
        newOrderEntity.setTotalAmount(totalPrice);
        orderRepository.save(newOrderEntity);

        // get user's payment details and charge it
        return cart;
    }

    @Transactional // read data from orders table
    public List<OrderDetails> getAllUserOrders(long userId) {
        List<OrderEntity> orders = orderRepository.findOrderEntityByUserId(userId);
        List<OrderDetails> orderList = new ArrayList<>();
        for (OrderEntity orderEntity : orders) {
            OrderDetails orderDetails = new OrderDetails();
            BeanUtils.copyProperties(orderEntity, orderDetails);
            List<OrderedItemEntity> items = getOrderItems(orderDetails.getId());
            List<OrderItemDetails> itemsList = new ArrayList<>();
            for (OrderedItemEntity itemEntity : items) {
                OrderItemDetails itemDetails = new OrderItemDetails();
                BeanUtils.copyProperties(itemEntity, itemDetails);
                itemsList.add(itemDetails);
            }
            orderDetails.setOrderItemDetails(itemsList);

            orderList.add(orderDetails);
        }
        return orderList;
    }

    @Transactional // read data from orders table
    public List<OrderedItemEntity> getOrderItems(long orderId) {
        OrderEntity order = orderRepository.findById(orderId).get();
        return orderedItemRepository.findOrderedItemEntitiesByOrderEntityId(orderId);
    }


    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public void changeOrderStatus(long orderId, String newStatus) {
        OrderEntity order = orderRepository.findById(orderId).get();
        switch (newStatus) {
            case "ACCEPTED" -> order.setOrderStatus(OrderStatus.ACCEPTED);
            case "PROCESSING" -> order.setOrderStatus(OrderStatus.PROCESSING);
            case "SENT" -> order.setOrderStatus(OrderStatus.SENT);
            case "CANCELED" -> order.setOrderStatus(OrderStatus.CANCELED);
        }
        if (newStatus.equals("CANCELED")) {
            List<OrderedItemEntity> orderItems = order.getCartItems();
            for (OrderedItemEntity item : orderItems) {
                StoreItemEntity storeItemEntity = storeItemRepository.findById(item.getProductId()).get();
                storeItemEntity.setQuantity(storeItemEntity.getQuantity() + item.getAmount());
                storeItemRepository.save(storeItemEntity);
                // get total amount of order and refund user for the order
            }
        }
        orderRepository.save(order);
    }
}
