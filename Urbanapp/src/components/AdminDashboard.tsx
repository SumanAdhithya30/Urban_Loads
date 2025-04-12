import React from "react";
import Card from "./Card";
import { Users, Settings, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="User Statistics">
          <div className="flex items-center space-x-4 p-4">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
              <p className="text-sm text-gray-500">Active Users</p>
            </div>
          </div>
        </Card>

        <Card title="System Status">
          <div className="flex items-center space-x-4 p-4">
            <Settings className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                All Systems Operational
              </p>
              <p className="text-sm text-gray-500">Last checked: 5 min ago</p>
            </div>
          </div>
        </Card>

        <Card title="Alerts">
          <div className="flex items-center space-x-4 p-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                2 Active Alerts
              </p>
              <p className="text-sm text-gray-500">Requires attention</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Policy Management">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            System Policies
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">
                  Peak Load Management
                </p>
                <p className="text-sm text-gray-600">Status: Active</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Edit Policy
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Energy Distribution</p>
                <p className="text-sm text-gray-600">Status: Under Review</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Edit Policy
              </button>
            </div>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
            Create New Policy
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
