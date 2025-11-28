package com.stock.service;

import com.stock.entity.Order;
import com.stock.repository.StockRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StockServiceImpl implements StockService{

    private StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public ResponseEntity<Map<String, Object>> placeOrder(Order order) {
        Map<String, Object> response = new HashMap<>();

        Order savedOrder = stockRepository.save(order);
         if(savedOrder != null) {
             response.put("message", "Order placed successfully");
             return new ResponseEntity<>(response, HttpStatus.CREATED);
         }
         else{
             response.put("message", "Failed to place order");
             return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
         }

    }

    @Override
    public ResponseEntity<List<Order>> getAllTradingHistory() {
         List<Order> orders= stockRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Order> getTradeStatus(int id) {
        Order order = stockRepository.findById(id).orElse(null);
        if(order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
