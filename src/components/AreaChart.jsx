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
    console.log(uvData);
    // AM/PM format time
    const editedTimes = ['12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'];
    console.log();

    // Get root CSS variables for colors
    const rootColours = getComputedStyle(document.documentElement);
    const sunstopColour = rootColours.getPropertyValue('--colour-sunstop').trim();
    const backgroundColour1 = rootColours.getPropertyValue('--colour-surfaceB3-bg').trim();
    const backgroundColour1a = rootColours.getPropertyValue('--colour-surfaceB4-bg').trim();
    const backgroundColour1b = rootColours.getPropertyValue('--colour-surfaceB2-bg').trim();
    const backgroundColour2 = rootColours.getPropertyValue('--colour-sunstop-bg').trim();
    const tickColour = rootColours.getPropertyValue('--colour-tint-surface2a').trim();
    const gridColour = rootColours.getPropertyValue('--colour-surfaceB2-bg').trim();
    const axesColour = rootColours.getPropertyValue('--colour-button-outline').trim();
    const borderColour = rootColours.getPropertyValue('--colour-button-outline2').trim();
    const axesLabelColour = rootColours.getPropertyValue('--colour-surface1-txt').trim();
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
        labels: editedTimes,
        datasets: [
            {
                data: uvData,
                borderColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, -400, 0, 375);
            
                    gradient.addColorStop(0, 'rgba(248, 215, 180, 0)');
                    gradient.addColorStop(0.01, backgroundColour1a);
                    gradient.addColorStop(0.25, backgroundColour1a);
                    gradient.addColorStop(0.45, backgroundColour2);
                    gradient.addColorStop(0.5, backgroundColour2);
                    gradient.addColorStop(0.55, backgroundColour2);
                    gradient.addColorStop(0.75, backgroundColour1a);
                    gradient.addColorStop(0.95, backgroundColour1a);
                    gradient.addColorStop(1, 'rgba(248, 215, 180, 0)');
            
                    return gradient;
                  },
                borderWidth: 4, // Remove the border line
                backgroundColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, 0, 0, 370);
            
                    gradient.addColorStop(0, 'rgba(241, 157, 83, 1)');
                    gradient.addColorStop(0.1, 'rgba(241, 157, 83, 0.7)');
                    gradient.addColorStop(0.5, 'rgba(246, 233, 213, 0.65)');
                    gradient.addColorStop(0.75, 'rgba(246, 233, 213, 0.5)');
                    gradient.addColorStop(0.975, 'rgba(246, 233, 213, 0.3)');
                    gradient.addColorStop(1, 'rgba(246, 233, 213, 0)');
            
                    return gradient;
                  },
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
                        borderDash: [6, 8],
                    },
                    // Dotted line from the point to the Y-axis
                    yDottedLine: {
                        type: 'line',
                        xMin: 0,
                        xMax: currentHour,
                        yMin: currentUVIndex,
                        yMax: currentUVIndex,
                        borderColor: 'rgba(165, 42, 42, 0.5)', // Brown dotted line color
                        borderWidth: 0,
                        borderDash: [6, 8],
                    },
                    // Highlighted point showing current UV index
                    highlightedPoint: {
                        type: 'point',
                        xValue: currentHour,
                        yValue: currentUVIndex,
                        backgroundColor: sunstopColour, // Color for the point
                        borderColor: backgroundColour1b,
                        borderWidth: 4,
                        radius: 9, // Make the highlighted point size larger
                    },
                    // Label showing the current UV index value above the highlighted point
                    pointLabel: {
                        type: 'label',
                        xValue: currentHour,
                        yValue: currentUVIndex,
                        content: `${currentUVIndex}`, // Display the number above the circle
                        color: sunstopColour,
                        font: {
                            size: 65,
                            weight: '700',
                            family: 'Inter'
                        },
                        yAdjust: 60, // Position label slightly above the highlighted point
                    },
                },
            },
        },
        scales: {
            x: {
                min: 2,
                max: 22,
                grid: {
                    display: true, // Removes vertical grid lines
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    padding: 10,
                    align: 'inner',
                    maxTicksLimit: 6,
                    autoSkip: true,
                    display: true, // Hides ticks on the X-axis
                    maxRotation: 0,
                    minRotation: 0,
                    color: axesColour,
                    font: { size: 14, weight: 600, family: 'Inter' } // Optional: customize font style
                },
                border: {
                    display: true, // Keeps the X-axis line visible
                    color: borderColour, // Optional: set color for the axis line
                },
                title: {
                    display: true, // Enables the Y-axis title
                    text: 'Time',    // Sets the Y-axis label text
                    color: tickColour, // Optional: set color for the label
                    font: { size: 18, weight: 750, family: 'Inter' }, // Optional: customize font style
                    padding: 12
                },
            },
            y: {
                min: 0,
                //max: 10,
                //position: 'right',
                grid: {
                    display: true, // Removes horizontal grid lines
                    drawTicks: false,
                    color: gridColour
                },
                ticks: {
                    display: false, // Hides ticks on the Y-axis
                },
                border: {
                    display: true, // Keeps the Y-axis line visible
                    color: borderColour, // Optional: set color for the axis line
                },
                title: {
                    display: true, // Enables the Y-axis title
                    text: 'UV',    // Sets the Y-axis label text
                    color: tickColour, // Optional: set color for the label
                    font: { size: 18, weight: 650, family: 'Inter' }, // Optional: customize font style
                    padding: 20
                },
            },
        },
    };

    return (
        <div className={styles['area-chart-container']}>
            <Line data={data} options={options} width={600} height={480} />
        </div>
    );
}

export default AreaChart;
