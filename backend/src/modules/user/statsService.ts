
interface Options {
    orders: any[]
    rentals: any[],
    deposits: any[],
}


export const getTotalStats = (options: Options): {
    deposits: number,
    spent: number,
    verifications: number,
} => {
    const totalSpent = options.orders.reduce((acc, order) => acc + order.price, 0) + options.rentals.reduce((acc, rental) => acc + rental.price, 0);
    const totalDeposits = options.deposits.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalVerifications = options.orders.length + options.rentals.length;

    return {
        deposits: totalDeposits,
        spent: totalSpent,
        verifications: totalVerifications,
    }
};

export const getDailyStats = (options: Options): {
    deposits: number,
    spent: number,
    verifications: number,
} => {
    const dailyOrders = options.orders.filter(order => {
        const date = new Date(order.createdAt);
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const dailyRentals = options.rentals.filter(rental => {
        const date = new Date(rental.createdAt);
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const dailyDeposits = options.deposits.filter(deposit => {
        const date = new Date(deposit.createdAt);
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });

    return {
        deposits: dailyDeposits.reduce((acc, deposit) => acc + deposit.amount, 0),
        spent: dailyOrders.reduce((acc, order) => acc + order.price, 0) + dailyRentals.reduce((acc, rental) => acc + rental.price, 0),
        verifications: dailyOrders.length + dailyRentals.length,
    }
}

export const getWeeklyStats = (options: Options): {
    deposits: number,
    spent: number,
    verifications: number,
} => {
    const weeklyOrders = options.orders.filter(order => {
        const date = new Date(order.createdAt);
        const today = new Date();
        return date.getDate() >= today.getDate() - 7 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const weeklyRentals = options.rentals.filter(rental => {
        const date = new Date(rental.createdAt);
        const today = new Date();
        return date.getDate() >= today.getDate() - 7 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const weeklyDeposits = options.deposits.filter(deposit => {
        const date = new Date(deposit.createdAt);
        const today = new Date();
        return date.getDate() >= today.getDate() - 7 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });

    return {
        deposits: weeklyDeposits.reduce((acc, deposit) => acc + deposit.amount, 0),
        spent: weeklyOrders.reduce((acc, order) => acc + order.price, 0) + weeklyRentals.reduce((acc, rental) => acc + rental.price, 0),
        verifications: weeklyOrders.length + weeklyRentals.length,
    }
}

export const getMonthlyStats = (options: Options): {
    deposits: number,
    spent: number,
    verifications: number,
} => {

    const monthlyOrders = options.orders.filter(order => {
        const date = new Date(order.createdAt);
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const monthlyRentals = options.rentals.filter(rental => {
        const date = new Date(rental.createdAt);
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    const monthlyDeposits = options.deposits.filter(deposit => {
        const date = new Date(deposit.createdAt);
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });

    return {
        deposits: monthlyDeposits.reduce((acc, deposit) => acc + deposit.amount, 0),
        spent: monthlyOrders.reduce((acc, order) => acc + order.price, 0) + monthlyRentals.reduce((acc, rental) => acc + rental.price, 0),
        verifications: monthlyOrders.length + monthlyRentals.length,
    }
}

const getStatsByMonth = (month: number, options: Options) => {
    const monthlyOrders = options.orders.filter(order => {
        const date = new Date(order.createdAt);
        return date.getMonth() === month;
    });
    const monthlyRentals = options.rentals.filter(rental => {
        const date = new Date(rental.createdAt);
        return date.getMonth() === month;
    });
    const monthlyDeposits = options.deposits.filter(deposit => {
        const date = new Date(deposit.createdAt);
        return date.getMonth() === month;
    });

    return {
        deposits: monthlyDeposits.reduce((acc, deposit) => acc + deposit.amount, 0),
        spent: monthlyOrders.reduce((acc, order) => acc + order.price, 0) + monthlyRentals.reduce((acc, rental) => acc + rental.price, 0),
        verifications: monthlyOrders.length + monthlyRentals.length,
    }
}


export const getChartStats = (options: Options): {
    chartData: {
        [key: number]: {
            deposits: number,
            spent: number,
            verifications: number,
        }
    }
} => {
    const chartData: {
        [key: number]: {
            deposits: number,
            spent: number,
            verifications: number,
        }
    } = {};
    for (let i = 1; i <= 12; i++) {
        chartData[i] = getStatsByMonth(i-1, options);
    }
    return {
        chartData,
    }

}