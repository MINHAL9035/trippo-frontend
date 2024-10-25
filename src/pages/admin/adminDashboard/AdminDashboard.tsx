import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoPersonOutline } from "react-icons/io5";
import NavBar from "@/components/admin/NavBar";
import Sidebar from "@/components/admin/Sidebar";
import { RootState } from "@/redux/store/store";
import { getAdminDashboard } from "@/service/api/admin";
import handleError from "@/utils/errorHandler";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons/lib";

interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
  trend: number;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface Owner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface DashboardData {
  totalUsers: number;
  totalOwners: number;
  latestUsers: User[];
  latestOwners: Owner[];
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
      <Icon className="w-12 h-12 text-yellow-500" />
    </div>
    <p
      className={`mt-2 text-sm ${
        trend > 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
    </p>
  </div>
);

const UserTable: React.FC<{ users: User[] }> = ({ users }) => (
  <Card>
    <CardHeader>
      <CardTitle>Latest Users</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const OwnerTable: React.FC<{ owners: Owner[] }> = ({ owners }) => (
  <Card>
    <CardHeader>
      <CardTitle>Latest Owners</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>firstName</TableHead>
            <TableHead>lastName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner._id}>
              <TableCell>{owner.firstName}</TableCell>
              <TableCell>{owner.lastName}</TableCell>
              <TableCell>{owner.email}</TableCell>
              <TableCell>
                {new Date(owner.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalUsers: 0,
    totalOwners: 0,
    latestUsers: [],
    latestOwners: [],
  });

  const { adminInfo } = useSelector((state: RootState) => state.adminInfo);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard();
        if (response?.status === 200) {
          setDashboardData(response?.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchDashboard();
  }, [adminInfo.adminId]);

  const stats = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      icon: IoPersonOutline,
      trend: 12,
    },
    {
      title: "Total Owners",
      value: dashboardData.totalOwners,
      icon: IoPersonOutline,
      trend: 8,
    },
  ];

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserTable users={dashboardData.latestUsers} />
            <OwnerTable owners={dashboardData.latestOwners} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
