import apiCoingecko from './apiCoingecko';

export type CoinType = {
    id: string;
    name: string;
    currentPrice: number;
    priceChangePercentage24h: number;
};

export type CoinDetailsType = {
    prices: [number, number][];
    totalVolumes: [number, number][];
};

type RejectType = {
    ok: false;
};

type FetchCoinsSuccessType = {
    ok: true;
    coins: CoinType[];
};

type FetchCoinDetailsSuccessType = {
    ok: true;
    coinDetails: CoinDetailsType;
};

export async function fetchCoins(currency: string): Promise<FetchCoinsSuccessType | RejectType> {
    try {
        const res = await apiCoingecko.get<Record<string, unknown>[]>(`/coins/markets?vs_currency=${currency}`);
        const coins = res.data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            currentPrice: coin.current_price,
            priceChangePercentage24h: coin.price_change_percentage_24h,
        })) as CoinType[];
        return {
            ok: true,
            coins,
        };
    } catch {
        return {
            ok: false,
        };
    }
}

export async function fetchCoinDetails(
    coinId: string,
    currency: string
): Promise<FetchCoinDetailsSuccessType | RejectType> {
    try {
        const res = await apiCoingecko.get<Record<string, unknown>>(
            `/coins/${coinId}/market_chart?vs_currency=${currency}&days=1`
        );
        const coinDetails = {
            prices: res.data.prices,
            totalVolumes: res.data.total_volumes,
        } as CoinDetailsType;
        return {
            ok: true,
            coinDetails,
        };
    } catch {
        return {
            ok: false,
        };
    }
}
