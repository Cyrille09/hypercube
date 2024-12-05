import React, { useMemo, useState } from "react";
import { GlobalButton } from "../globalButton/GlobalButton";
import { Table, FormCheck } from "react-bootstrap";
import { KeyValueCard } from "../cards/Cards";
import { GlobalSelect } from "../globalSelect/GlobalSelect";
import styles from "./tasks.module.scss";
import {
  GlobalErrorMessage,
  GlobalSuccessMessage,
} from "../errorAndSuccessMessage/ErrorSuccessMessage";
import {
  showAddTaskPopup,
  showDeleteTaskPopup,
  showUpdateTaskPopup,
} from "../../redux-toolkit/reducers/popupSlice";
import { Pagination } from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store";
import {
  DefaultTask,
  TaskListProps,
  TaskProps,
} from "../globalTypes/GlobalTypes";
import { AddTaskModal } from "./AddTaskModal";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";

function TaskList({ tasks, markTaskComplete }: TaskListProps) {
  const [taskStatuss, setTaskstatus] = useState<string>("");

  const [task, setTask] = useState<TaskProps>(DefaultTask);
  const [sortTasksStatus, setSortTasksStatus] = useState<string>("title");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const dispatch = useDispatch();
  const popupSlice = useSelector((state: RootState) => state.popupSlice);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    const filteredTasks = taskStatuss
      ? tasks.filter((task) => task.completed.toString() === taskStatuss)
      : [...tasks]; // Ensure a copy of the array for sorting

    return filteredTasks.sort((a, b) => {
      if (sortTasksStatus === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortTasksStatus === "id") {
        return a.id - b.id;
      }
      return 0;
    });
  }, [tasks, taskStatuss, sortTasksStatus]);

  // Paginated tasks
  const paginatedTasks = useMemo(
    () =>
      filteredAndSortedTasks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredAndSortedTasks, currentPage, ITEMS_PER_PAGE]
  );

  const handlePageChange = (page: number) => {
    if (
      page >= 1 &&
      page <= Math.ceil(filteredAndSortedTasks.length / ITEMS_PER_PAGE)
    ) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {popupSlice.deleteTaskPopup && <DeleteTaskModal task={task} />}

      {popupSlice.updateTaskPopup && <UpdateTaskModal task={task} />}

      {popupSlice.addTaskPopup && <AddTaskModal />}

      <KeyValueCard
        title="Tasks"
        options={
          <div className={`${styles.controls} d-flex align-items-center`}>
            <div className={styles.select}>
              <GlobalSelect
                disabledPlaceholder
                labelStyle={{ width: 100 }}
                options={[
                  { value: "", label: "All" },
                  { value: "true", label: "Complete" },
                  { value: "false", label: "Incomplete" },
                ]}
                onChange={(value) => setTaskstatus(value.target.value)}
              />
            </div>
            <div className={styles.select}>
              <GlobalSelect
                label="Sort by:"
                disabledPlaceholder
                labelStyle={{ width: 100 }}
                options={[
                  { value: "title", label: "Title" },
                  { value: "id", label: "ID" },
                ]}
                onChange={(value) => setSortTasksStatus(value.target.value)}
              />
            </div>
            <div className={styles.selectButton}>
              <GlobalButton
                variant="secondary"
                size="sm"
                onClick={() => dispatch(showAddTaskPopup(true))}
              >
                Add Task
              </GlobalButton>
            </div>
          </div>
        }
      >
        <div className={styles.tasksTable}>
          {popupSlice.successPopup.status && (
            <GlobalSuccessMessage
              popupFadeoutTime={popupSlice.successPopup.popupFadeoutTime}
              message={popupSlice.successPopup.message}
            />
          )}

          {popupSlice.errorPopup.status && (
            <GlobalErrorMessage
              popupFadeoutTime={popupSlice.errorPopup.popupFadeoutTime}
              message={popupSlice.errorPopup.message}
            />
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
                <th className={styles.colSpan} colSpan={3}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.length ? (
                paginatedTasks.map((task) => (
                  <tr key={`${task.id}`}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.completed ? "Yes" : "No"}</td>

                    <td className={styles.colSpan}>
                      <GlobalButton
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setTask(task);
                          dispatch(showDeleteTaskPopup(true));
                        }}
                      >
                        Delete
                      </GlobalButton>
                    </td>
                    <td className={styles.colSpan}>
                      <FormCheck
                        inline
                        name="task"
                        type="checkbox"
                        onChange={() => markTaskComplete(task.id)}
                        id={`task-${task.id}`}
                        checked={task.completed}
                      />
                    </td>
                    <td className={styles.colSpan}>
                      <GlobalButton
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setTask(task);
                          dispatch(showUpdateTaskPopup(true));
                        }}
                      >
                        Edit
                      </GlobalButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    <h2>No records found</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Pagination
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            currentPage={currentPage}
            totalPages={Math.ceil(
              filteredAndSortedTasks.length / ITEMS_PER_PAGE
            )}
            filteredAndSortedTasks={filteredAndSortedTasks}
            handlePageChange={handlePageChange}
          />
        </div>
      </KeyValueCard>
    </>
  );
}

export default TaskList;
