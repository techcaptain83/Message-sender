import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt";
import Order from "../orders/orderModel";
import Rental from "../rentals/rentalModel";
import Deposit from "../deposit/depositModel";
import {
    getTotalStats,
    getDailyStats,
    getWeeklyStats,
    getMonthlyStats,
    getChartStats
} from "./statsService"


export const getStats = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;

        let userId: string;
        if (user_id) {
            userId = user_id as string;
        } else {
            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { id } = await verifyToken(token);
            userId = id;
        }

        const orders = await Order.find({ user: userId });
        const rentals = await Rental.find({ user: userId });
        const deposits = (await Deposit.find({ user: userId })).filter(deposit => deposit.status === "successful");

        const totalStats = getTotalStats({ orders, rentals, deposits });
        const dailyStats = getDailyStats({ orders, rentals, deposits });
        const weeklyStats = getWeeklyStats({ orders, rentals, deposits });

        const monthlyStats = getMonthlyStats({ orders, rentals, deposits });
        const chartStats = getChartStats({ orders, rentals, deposits });

        res.status(200).json({
            message: "success",
            stats: {
                totalDeposits: totalStats.deposits,
                totalSpent: totalStats.spent,
                totalVerifications: totalStats.verifications,
                daily: {
                    deposits: dailyStats.deposits,
                    spent: dailyStats.spent,
                    verifications: dailyStats.verifications,
                },
                weekly: {
                    deposits: weeklyStats.deposits,
                    spent: weeklyStats.spent,
                    verifications: weeklyStats.verifications,
                },
                monthly: {
                    deposits: monthlyStats.deposits,
                    spent: monthlyStats.spent,
                    verifications: monthlyStats.verifications,
                }
            },
            chartData: chartStats.chartData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}