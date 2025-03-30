const { User, UserPortfolio, Stock, Transaction } = require("../models");

async function buyStock(userId, stockId, shares) {
    const user = await User.findByPk(userId);
    const stock = await Stock.findByPk(stockId);

    if (!user || !stock) throw new Error("Invalid user or stock ID.");
    
    const totalCost = stock.base_price * shares;
    if (user.balance < totalCost) throw new Error("Insufficient funds.");

    // Deduct balance & update portfolio
    user.balance -= totalCost;
    await user.save();

    let portfolio = await UserPortfolio.findOne({ where: { user_id: userId, stock_id: stockId } });
    if (portfolio) {
        portfolio.shares_owned += shares;
    } else {
        portfolio = await UserPortfolio.create({ user_id: userId, stock_id: stockId, shares_owned: shares });
    }
    await portfolio.save();

    // Log transaction
    await Transaction.create({ user_id: userId, stock_id: stockId, type: "buy", shares, price: stock.base_price });

    return { message: "Stock purchased successfully.", balance: user.balance };
}

async function sellStock(userId, stockId, shares) {
    const user = await User.findByPk(userId);
    const portfolio = await UserPortfolio.findOne({ where: { user_id: userId, stock_id: stockId } });

    if (!user || !portfolio || portfolio.shares_owned < shares) throw new Error("Not enough shares to sell.");

    const stock = await Stock.findByPk(stockId);
    const earnings = stock.base_price * shares;

    // Update balance & portfolio
    user.balance += earnings;
    await user.save();

    portfolio.shares_owned -= shares;
    if (portfolio.shares_owned === 0) {
        await portfolio.destroy();
    } else {
        await portfolio.save();
    }

    // Log transaction
    await Transaction.create({ user_id: userId, stock_id: stockId, type: "sell", shares, price: stock.base_price });

    return { message: "Stock sold successfully.", balance: user.balance };
}

module.exports = { buyStock, sellStock };
