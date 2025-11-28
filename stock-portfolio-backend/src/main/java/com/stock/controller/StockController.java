package com.stock.controller;

import com.stock.entity.Order;
import com.stock.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin("*")
public class StockController {

    private final StockService stockService;
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    //create placeOrder method, @Postmapping, return type ResponseEntity<String>
    @PostMapping("/placeOrder")
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody Order order){
        return stockService.placeOrder(order);

    }

    @GetMapping
    public ResponseEntity<List<Order>>  getAllTradingHistory(){
        return stockService.getAllTradingHistory();
    }

    @GetMapping("{id}")
    public ResponseEntity<Order> getTradeStatus(@PathVariable int id){
        return stockService.getTradeStatus(id);
    }
}
