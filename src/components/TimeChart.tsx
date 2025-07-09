import { Chart as ChartJS, LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend, Filler);

type PropsType = {
    initialData: [number, number][];
    title?: string;
    label?: string;
};

function TimeChart({ initialData, title, label = '' }: PropsType) {
    const formattedData = initialData.map(([timestamp, price]) => ({
        x: timestamp,
        y: price,
    }));

    const chartData = {
        datasets: [
            {
                label,
                data: formattedData,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'hour' as const,
                    tooltipFormat: 'HH:mm',
                },
                ticks: {
                    color: '#9CA3AF',
                },
                grid: {
                    color: '#E5E7EB',
                },
            },
            y: {
                ticks: {
                    color: '#9CA3AF',
                },
                grid: {
                    color: '#E5E7EB',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
    };

    return (
        <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
            <Line data={chartData} options={options} />
        </div>
    );
}

export default TimeChart;
