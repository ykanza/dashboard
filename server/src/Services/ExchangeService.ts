import Binance from 'node-binance-api';

const binance = new Binance().options({
    APIKEY: process.env.BINANCE_PUBLIC_KEY,
    APISECRET: process.env.BINANCE_SECRET_KEY
});

class ExchangeService {
    static async getRate(pair: string) {
        const response = await binance.futuresMarkPrice(pair);
        const price = parseFloat(response.markPrice);

        return {
            error: false,
            price: Number((price).toFixed(2))
        }
    }

    static async getEvolution(pair: string) {
        const response = await binance.futuresDaily(pair);

        return {
            error: false,
            data: {
                priceChange: parseFloat(response.priceChange),
                priceChangePercent: parseFloat(response.priceChangePercent)
            }
        }
    }
}

export default ExchangeService;
