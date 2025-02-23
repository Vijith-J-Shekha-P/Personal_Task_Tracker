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
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center space-x-2">
        <div>
          <h3
            className={`font-medium ${
              task.taskStatus === "done" ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-500">
            {capitalizeFirstLetter(task.taskStatus)}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(task._id)}
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
    </div>
  );
};

export default TaskList;
