import { ACTIONS_ERROR_MESSAGE } from "../constants/globalText";
import { get, put, remove, post } from "../lib/axiosInterceptors";
import { showErrorPopup } from "../redux-toolkit/reducers/popupSlice";
import { tasksLists } from "../redux-toolkit/reducers/tasksSlice";
import { store } from "../redux-toolkit/store";

export const getTasks = async () => {
  return await get(`tasks`, {});
};

export const addTask = async (title: string) => {
  return await post(`/tasks`, { title });
};

export const deleteTask = async (taskId: number) => {
  return await remove(`tasks/${taskId}`);
};

export const markTaskComplete = async (taskId: number) => {
  return await put(`tasks/status/${taskId}`, {});
};

export const updateTask = async (id: number, data: { title: string }) => {
  return await put(`tasks/${id}`, data);
};

export const displayTasks = async () => {
  try {
    const response = await getTasks();
    store.dispatch(tasksLists(response.data));
  } catch (error) {
    store.dispatch(
      showErrorPopup({
        status: true,
        message: ACTIONS_ERROR_MESSAGE,
      })
    );
  }
};
