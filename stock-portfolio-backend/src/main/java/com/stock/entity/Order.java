package com.stock.entity;
import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="stockTicker")
    private String stockTicker;
    private double price;
    private int volume;

    @Column(name="buyOrSell")
    private String buyOrSell;

    @Column(name="statusCode")
    private int statusCode;

    @Column(name="tradeDate")
    private String tradeDate;
}
