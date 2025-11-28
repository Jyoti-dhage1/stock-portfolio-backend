package com.stock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StockPortfolioBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockPortfolioBackendApplication.class, args);
		System.out.println("StockPortfolioBackendApplication started successfully.");
	}

}
