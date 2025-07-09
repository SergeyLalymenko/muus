import { CoinType } from '@/services/coinsService';

type PropsType = {
    coin: CoinType;
    onCoinClick: (coin: CoinType) => void;
};

function Card({ coin, onCoinClick }: PropsType) {
    return (
        <div className="flex flex-col gap-1 w-full border border-solid border-gray-700 rounded p-2">
            <p
                className="text-lg font-medium hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                onClick={() => onCoinClick(coin)}
            >
                {coin.name}
            </p>
            <div>
                Ціна: <span className="font-bold text-indigo-300">${coin.currentPrice}</span>
            </div>
            <div>
                <span className="font-bold text-indigo-300">${coin.priceChangePercentage24h}%</span> за 24г
            </div>
        </div>
    );
}

export default Card;
