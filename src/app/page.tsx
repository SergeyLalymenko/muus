import { fetchCoins } from '@/services/coinsService';
import Container from '@/components/Container';
import Client from './Client';

async function Home() {
    const coinsRes = await fetchCoins('usd');
    if (!coinsRes.ok) {
        return <p>Fetch coins error!</p>;
    }

    const coins = coinsRes.coins;

    return (
        <main className="flex-1 bg-gray-900 py-5">
            <Container>
                <h1 className="text-3xl font-bold">Криптовалюти</h1>
                <Client coins={coins} />
            </Container>
        </main>
    );
}

export default Home;
