import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PaginatedItems } from "components/pagination/Pagination";
import axios from "axios";
import { getDataApi } from "utils/fetchData";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart System",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

var labels = [];
var today = new Date();
for (var i = 0; i < 7; i++) {
  // Generate the date for each label by subtracting the number of days from the current date
  var date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - i
  );
  labels.push(date.toDateString());
}

export const data = {
  labels,
  datasets: [
    {
      label: "Users",
      data: [0, 10, 5, 2, 20, 30, 45],
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Posts",
      data: [0, 20, 3, 4, 30, 40, 41],
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ManageSystemPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getDataApi("postsByAdmin", auth.token);
        const resUser = await getDataApi("usersByAdmin", auth.token);
        setPosts(res.data.posts);
        setUsers(resUser.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [auth.token]);

  if (auth.user.isAdmin === false)
    return (
      <div className="text-xl font-bold  mt-16">
        You don't have permission to access this page
      </div>
    );

  return (
    <>
      <div className="container mt-16">
        <div className="w-full flex items-center gap-x-10 flex-col">
          <div className="flex flex-col gap-y-2">
            <p className="w-[200px] h-[100px] p-3 rounded-lg border border-slate-300 text-3xl font-bold flex items-center justify-center">{`${users.length} Users`}</p>
            <p className="w-[200px] h-[100px] p-3 rounded-lg border border-slate-300 text-3xl font-bold flex items-center justify-center">{`${posts.length} Posts`}</p>
          </div>
          <Bar
            style={{
              width: "",
              padding: "20px",
            }}
            options={options}
            data={data}
          />
        </div>

        <div className="w-full">
          <p className="text-3xl font-bold mb-4">Users</p>
          <PaginatedItems data={users} itemsPerPage={5}></PaginatedItems>
        </div>
        <div className="w-full">
          <p className="text-3xl font-bold mb-4">Posts</p>
          <PaginatedItems data={posts} itemsPerPage={5}></PaginatedItems>
        </div>
      </div>
    </>
  );
};

export default ManageSystemPage;
