export interface Order {
    // tradeId: number;
    // stockSymbol: string;
    // quantity: number;
    // tradeType: 'Buy' | 'Sell';
    // price: number;
     //date: string; // ISO date string
    // status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
 
      stockTicker: string;
      volume: number;
      buyOrSell: string;
      price: number;
      tradeDate: string; // ISO date string
     //statusCode: 'PENDING' | 'COMPLETED' | 'CANCELLED';
     statusCode: number;
 
 }