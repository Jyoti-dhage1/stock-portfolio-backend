export interface Trade {
   // tradeId: number;
   // stockSymbol: string;
   // quantity: number;
   // tradeType: 'Buy' | 'Sell';
   // price: number;
    //date: string; // ISO date string
   // status: 'PENDING' | 'COMPLETED' | 'CANCELLED';

     id: number;
     stockTicker: string;
     volume: number;
     buyOrSell: 'BUY' | 'SELL';
     price: number;
     tradedate: string; // ISO date string
    statusCode: number;

}