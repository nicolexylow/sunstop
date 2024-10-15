import styles from '../scss/modules/ScreenSaver.module.scss';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Needed for the area fill
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function AreaChart(props) {
    const labels = Array.from({ length: props.data.length }, (_, i) => `${i}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Sample Data',
                data: props.data, // Use the array passed as a prop
                borderColor: '#F47722',
                backgroundColor: '#FFD692', // Sets the area fill color
                fill: true, // Enables the area fill under the line
                tension: 0.3, // Optional: smooths the line
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hour',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'UVI',
                },
            },
        },
    };

    return (
        <div className={styles['area-chart-continer']}>
            <Line data={data} options={options} width={800} height={700} />
        </div>
        
    );
}

export default AreaChart