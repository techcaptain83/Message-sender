
import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { ChartData as CData } from '@/types';
ChartJS.register(...registerables);

const options: any = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const UsageGraph = () => {
    const data: ChartData<"bar", (number | [number, number] | any)[], unknown> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Free Users',
                data: [
                    100, 120, 130, 190, 200, 210, 220, 230, 240, 250, 157, 278
                ],
                backgroundColor: '#085497',
                borderColor: '#085497',
                borderWidth: 1,
                barPercentage: 0.3,
                minBarLength: 5
            },
            {
                label: 'Premium Users',
                data: [
                    12, 4, 15, 32, 5, 9, 12, 4, 15, 32, 5, 9
                ],
                backgroundColor: '#2a88ba',
                borderColor: '#2a88ba',
                borderWidth: 1,
                barPercentage: 0.3,
                minBarLength: 5
            },
            {
                label: 'Enterprise Users',
                data: [
                    8, 2, 5, 12, 2, 4, 8, 2, 5, 12, 2, 4
                ],
                backgroundColor: '#E0DE40',
                borderColor: '#E0DE40',
                borderWidth: 1,
                barPercentage: 0.3,
                minBarLength: 5
            }
        ],
    };

    return (
        <div className='w-full h-[55vh] bg-white min-w-[640px] shadow-md rounded-md px-6 py-3 relative flex flex-col justify-between'>
            {
                <Bar data={data} options={{ ...options, maintainAspectRatio: false }} style={{ height: '100%', width: '100%' }} />
            }
        </div>
    );
};

export default UsageGraph;