import React, { useEffect } from "react";
import "../../App.css";
import { markTaskComplete, displayTasks } from "../../services/tasksServices";
import styles from "./tasks.module.scss";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store";
import { tasksLists } from "../../redux-toolkit/reducers/tasksSlice";

function Tasks() {
  const tasksSlice = useSelector((state: RootState) => state.tasksSlice);
  const dispatch = useDispatch();

  // Fetch tasks on component mount
  useEffect(() => {
    let isSubscribed = true;
    const getTracks = async () => {
      if (isSubscribed) await displayTasks();
    };

    getTracks();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);

  const handleMarkTaskComplete = (taskId: any) => {
    markTaskComplete(taskId)
      .then((response) => {
        const result = tasksSlice.tasks.map((task: any) =>
          task.id === taskId ? response.data : task
        );
        dispatch(tasksLists(result));
      })
      .catch((error) => {
        console.error("Error marking task complete:", error);
      });
  };

  return (
    <div className={styles.tasks} style={{ margin: 20 }}>
      <div className="row">
        <div className="col-sm-12">
          <TaskList
            tasks={tasksSlice.tasks}
            markTaskComplete={handleMarkTaskComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
