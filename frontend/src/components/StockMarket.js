import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function StockMarket() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        socket.emit("subscribeToStockUpdates");
        socket.on("stockUpdate", (data) => setStocks(data));
    }, []);

    return (
        <div>
            <h2>Live Stock Market</h2>
            {stocks.map((stock) => (
                <p key={stock.id}>
                    {stock.name}: {stock.base_price.toFixed(2)} Galleons
                </p>
            ))}
        </div>
    );
}
