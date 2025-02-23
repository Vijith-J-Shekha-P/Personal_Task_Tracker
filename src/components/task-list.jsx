"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import EditTaskDialog from "./edit-task-dialog";
import { capitalizeFirstLetter } from "@/lib/helper";

const TaskList = ({ task, onUpdate, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (title, taskStatus) => {
    onUpdate({ ...task, title, taskStatus });
    setIsEditDialogOpen(false);
  };

  return (
    <li className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center space-x-2">
        <div>
          <h3
            className={`font-medium ${
              task.taskStatus === "done" ? "line-through" : ""
            }`}
            aria-label={`Task: ${task.title}`}
          >
            {task.title}
          </h3>
          <p
            className="text-sm text-gray-500"
            aria-label={`Status: ${capitalizeFirstLetter(task.taskStatus)}`}
          >
            {capitalizeFirstLetter(task.taskStatus)}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
          aria-label="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <EditTaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditTask={handleEdit}
        task={task}
      />
    </li>
  );
};

export default TaskList;
