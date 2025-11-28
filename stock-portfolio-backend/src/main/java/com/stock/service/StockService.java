package com.stock.service;
import com.stock.entity.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface StockService{
    public ResponseEntity<Map<String, Object>> placeOrder(Order order);
    public ResponseEntity<List<Order>> getAllTradingHistory();
    public ResponseEntity<Order> getTradeStatus(int id);
}
