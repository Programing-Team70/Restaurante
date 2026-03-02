import MenuItem from "./menu.model.js";
import Order from ".order.model.js"; 
import Table from "..table.model.js";
import Restaurant from "./restaurant.model.js";

class StatisticsService {
  async getTopDishes(restaurantId) {
    return await MenuItem.aggregate([
      { $match: { restaurant: restaurantId } },
      { $lookup: { from: "orders", localField: "_id", foreignField: "menuItem", as: "orders" } },
      { $addFields: { totalSold: { $sum: "$orders.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
  }

  async getPeakHours(restaurantId) {
    return await Order.aggregate([
      { $match: { restaurant: restaurantId } },
      { $group: { _id: { $hour: "$orderTime" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
  }

  async getRestaurantRevenue(restaurantId) {
    return await Order.aggregate([
      { $match: { restaurant: restaurantId } },
      { $group: { _id: "$restaurant", total: { $sum: "$total" } } }
    ]);
  }
}

export default new StatisticsService();
