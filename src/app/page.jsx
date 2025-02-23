"use client";
import CreateTaskDialog from "@/components/create-task-dialog";
import ErrorBoundary from "@/components/error-boundary";
import TaskList from "@/components/task-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";
import { tasksURL } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { user, logout, token } = useAuth();

  const fetchTaskList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(tasksURL, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        setTasks(response?.data?.data);
      }
    } catch (error) {
      if (error.response?.status !== 200) {
        router.push("/login");
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTaskList();
    }
  }, []);

  const handleCreateTask = async (title, taskStatus) => {
    const newTask = {
      title,
      taskStatus,
    };
    try {
      await axios.post(
        tasksURL,
        newTask, // Pass newTask as the request body
        {
          headers: { Authorization: token }, // Authorization in headers
        }
      );
      await fetchTaskList(); // Refresh the list after creating
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const { _id, ...dataWithoutId } = updatedTask;
      if (!_id) {
        console.error("Task ID is undefined");
        return;
      }
      await axios.put(`${tasksURL}/${_id}`, dataWithoutId, {
        headers: { Authorization: token }, // Authorization in headers
      });
      await fetchTaskList(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (!taskId) {
        console.error("Task ID is undefined");
        return;
      }
      await axios.delete(`${tasksURL}/${taskId}`, {
        headers: { Authorization: token }, // Add missing Authorization header
      });
      await fetchTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <div className="bg-white m-auto p-10 w-full h-[100vh]">
          <div className=" w-full flex justify-end mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="user_img.png" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start">
                  <h1>{`Name: ${user?.name}`}</h1>
                  <h1>{`UserId: ${user?.id}`}</h1>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-bold"
                  onClick={() => logout()}
                >
                  {/* <Button onClick={() => alert("logout")}>Logout</Button> */}
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-between gap-4">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
              className="max-w-sm"
            />
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Task
            </Button>
          </div>
          <CreateTaskDialog
            isOpen={isCreateDialogOpen}
            onClose={() => setIsCreateDialogOpen(false)}
            onCreateTask={handleCreateTask}
          />
          <div className="flex flex-col space-y-4 mt-4">
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
              </div>
            )}
            {!isLoading && filteredTasks.length > 0 && (
              <ul className="flex flex-col space-y-4">
                {filteredTasks.map((task) => (
                  <TaskList
                    key={task._id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </ul>
            )}
            {!isLoading && filteredTasks.length === 0 && (
              <div className="p-4 rounded-lg flex justify-center">
                <p className="text-gray-300 font-semibold">No tasks found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
