import styles from '../scss/modules/ScreenSaver.module.scss';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register Chart.js components and plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    annotationPlugin
);

function AreaChart({ data: uvData }) {
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const currentUVIndex = uvData[currentHour] || 0;

    // Get root CSS variables for colors
    const rootColours = getComputedStyle(document.documentElement);
    const sunstopColour = rootColours.getPropertyValue('--colour-sunstop').trim();
    const backgroundColour = rootColours.getPropertyValue('--colour-background').trim();
    const secondaryColour = rootColours.getPropertyValue('--colour-secondary').trim();

    // Update current hour every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // Chart data configuration
    const data = {
        labels: Array.from({ length: uvData.length }, (_, i) => `${i}:00`),
        datasets: [
            {
                data: uvData,
                borderColor: 'rgba(0, 0, 0, 0)', // Make the outline transparent
                borderWidth: 0, // Remove the border line
                backgroundColor: backgroundColour, // Fill color for the area
                fill: true,
                tension: 0.3, // Smooths the line
                pointRadius: 0, // Hides all data points
            },
        ],
    };

    // Chart options configuration with annotations
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `UV Index: ${context.raw}`,
                },
            },
            annotation: {
                annotations: {
                    // Dotted line from the point to the X-axis
                    xDottedLine: {
                        type: 'line',
                        xMin: currentHour,
                        xMax: currentHour,
                        yMin: 0,
                        yMax: currentUVIndex,
                        borderColor: 'rgba(165, 42, 42, 0.5)', // Brown dotted line color
                        borderWidth: 1,
                        borderDash: [4, 4],
                    },
                    // Dotted line from the point to the Y-axis
                    yDottedLine: {
                        type: 'line',
                        xMin: 0,
                        xMax: currentHour,
                        yMin: currentUVIndex,
                        yMax: currentUVIndex,
                        borderColor: 'rgba(165, 42, 42, 0.5)', // Brown dotted line color
                        borderWidth: 1,
                        borderDash: [4, 4],
                    },
                    // Highlighted point showing current UV index
                    highlightedPoint: {
                        type: 'point',
                        xValue: currentHour,
                        yValue: currentUVIndex,
                        backgroundColor: sunstopColour, // Color for the point
                        radius: 10, // Make the highlighted point size larger
                    },
                    // Label showing the current UV index value above the highlighted point
                    pointLabel: {
                        type: 'label',
                        xValue: currentHour,
                        yValue: currentUVIndex,
                        content: `${currentUVIndex}`, // Display the number above the circle
                        color: sunstopColour,
                        font: {
                            size: 40,
                            weight: 'bold',
                        },
                        yAdjust: 40, // Position label slightly above the highlighted point
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes vertical grid lines
                },
                ticks: {
                    display: false, // Hides ticks on the X-axis
                },
                border: {
                    display: true, // Keeps the X-axis line visible
                    color: secondaryColour, // Optional: set color for the axis line
                },
                title: {
                    display: true, // Enables the Y-axis title
                    text: 'Now',    // Sets the Y-axis label text
                    color: secondaryColour, // Optional: set color for the label
                    font: { size: 20, weight: 'bold' } // Optional: customize font style
                },
            },
            y: {
                grid: {
                    display: false, // Removes horizontal grid lines
                },
                ticks: {
                    display: false, // Hides ticks on the Y-axis
                },
                border: {
                    display: true, // Keeps the Y-axis line visible
                    color: secondaryColour, // Optional: set color for the axis line
                },
                title: {
                    display: true, // Enables the Y-axis title
                    text: 'UV',    // Sets the Y-axis label text
                    color: secondaryColour, // Optional: set color for the label
                    font: { size: 20, weight: 'bold' } // Optional: customize font style
                },
            },
        },
    };

    return (
        <div className={styles['area-chart-container']}>
            <Line data={data} options={options} width={800} height={700} />
        </div>
    );
}

export default AreaChart;
