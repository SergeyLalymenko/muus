'use client';

import { useMemo, useState, useEffect } from 'react';
import { CoinType, CoinDetailsType, fetchCoinDetails } from '@/services/coinsService';
import Card from './Card';
import Modal from '@/components/Modal';
import TimeChart from '@/components/TimeChart';
import Button from '@/UI/Button';

type PropsType = {
    coins: CoinType[];
};

function Client({ coins }: PropsType) {
    const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null);
    const [selectedCoinDetails, setSelectedCoinDetails] = useState<CoinDetailsType | null>(null);
    const [favoriteCoinsIds, setFavoriteCoinsIds] = useState<string[] | null>(null);

    useEffect(() => {
        const storageFavoriteCoinsIds = JSON.parse(localStorage.getItem('favoriteCoinsIds') || '[]');
        setFavoriteCoinsIds(storageFavoriteCoinsIds);
    }, []);

    useEffect(() => {
        if (!selectedCoin) {
            setSelectedCoinDetails(null);
            return;
        }
        const fetchData = async () => {
            const coinDetailsRes = await fetchCoinDetails(selectedCoin.id, 'usd');
            if (!coinDetailsRes.ok) {
                setSelectedCoin(null);
            } else {
                setSelectedCoinDetails(coinDetailsRes.coinDetails);
            }
        };
        fetchData();
    }, [selectedCoin]);

    const favoriteCoins = useMemo(() => {
        if (!favoriteCoinsIds) return [];
        return coins.filter((coin) => favoriteCoinsIds.includes(coin.id));
    }, [favoriteCoinsIds]);

    function onModalClose() {
        setSelectedCoin(null);
    }

    function onCoinClick(coin: CoinType) {
        setSelectedCoin(coin);
    }

    function toggleFavorite(coinId: string) {
        if (!favoriteCoinsIds) return;

        const isFavorite = favoriteCoinsIds.includes(coinId);
        const newFavoriteCoinsIds = isFavorite
            ? favoriteCoinsIds.filter((coin) => coin !== coinId)
            : [...favoriteCoinsIds, coinId];
        localStorage.setItem('favoriteCoinsIds', JSON.stringify(newFavoriteCoinsIds));
        setFavoriteCoinsIds(newFavoriteCoinsIds);
    }

    return (
        <>
            <h2 className="mt-10 text-xl font-semibold">Обране</h2>
            {favoriteCoins ? (
                favoriteCoins.length ? (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {favoriteCoins.map((coin) => (
                            <Card key={coin.id} coin={coin} onCoinClick={onCoinClick} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-2">Немає обраних валют!</p>
                )
            ) : (
                <p className="mt-2"> Загрузка...</p>
            )}
            <h2 className="mt-10 text-xl font-semibold">Усі</h2>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {coins.map((coin) => (
                    <Card key={coin.id} coin={coin} onCoinClick={onCoinClick} />
                ))}
            </div>
            <Modal title={selectedCoin?.name || ''} isOpen={Boolean(selectedCoin)} onClose={onModalClose}>
                {selectedCoinDetails && selectedCoin ? (
                    <div className="flex flex-col gap-2 w-full">
                        <div>
                            Ціна: <span className="font-bold text-indigo-300">${selectedCoin.currentPrice}</span>
                        </div>
                        <div>
                            <span className="font-bold text-indigo-300">${selectedCoin.priceChangePercentage24h}%</span>{' '}
                            за 24г
                        </div>
                        <div className="mb-4">
                            <TimeChart
                                initialData={selectedCoinDetails.prices}
                                title="Графік ціни за 24 години"
                                label="Ціна (USD)"
                            />
                        </div>
                        <div className="mb-4">
                            <TimeChart
                                initialData={selectedCoinDetails.totalVolumes}
                                title="Графік об'єму торгів за 24 години"
                                label="Об'єм"
                            />
                        </div>
                        <Button className="mt-4 w-fit" onClick={() => toggleFavorite(selectedCoin.id)}>
                            {favoriteCoinsIds && favoriteCoinsIds.includes(selectedCoin.id)
                                ? 'Видалити з обраного'
                                : 'Додати в обране'}
                        </Button>
                    </div>
                ) : (
                    <p>Загрузка...</p>
                )}
            </Modal>
        </>
    );
}

export default Client;
