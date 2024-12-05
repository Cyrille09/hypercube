import { useDispatch, useSelector } from "react-redux";
import { GlobalButton } from "../globalButton/GlobalButton";
import { GlobalModal } from "../globalModal/globalModal";
import { RootState } from "../../redux-toolkit/store";
import {
  showDeleteTaskPopup,
  showErrorPopup,
  showIsLoading,
  showSucessPopup,
} from "../../redux-toolkit/reducers/popupSlice";
import { ACTIONS_ERROR_MESSAGE } from "../../constants/globalText";
import { GlobalErrorMessage } from "../errorAndSuccessMessage/ErrorSuccessMessage";
import { LoadingData } from "../loading/LoadingData";
import styles from "./tasks.module.scss";
import { deleteTask, displayTasks } from "../../services/tasksServices";
import { TaskProps } from "../globalTypes/GlobalTypes";

export const DeleteTaskModal = ({ task }: { task: TaskProps }) => {
  const dispatch = useDispatch();
  const popupSlice = useSelector((state: RootState) => state.popupSlice);

  const deleteTaskData = async (tasktId: number) => {
    dispatch(showIsLoading(true));
    try {
      await deleteTask(tasktId);
      await displayTasks();
      dispatch(showIsLoading(false));
      dispatch(
        showSucessPopup({
          status: true,
          message: "Task was successfully deleted!",
        })
      );
      handleCloseModal();
    } catch (error) {
      dispatch(showIsLoading(false));
      dispatch(
        showErrorPopup({
          status: true,
          message: ACTIONS_ERROR_MESSAGE,
        })
      );
    }
  };

  const handleCloseModal = () => {
    dispatch(showDeleteTaskPopup(false));
  };

  return (
    <GlobalModal
      title="Delete Track"
      show={popupSlice.deleteTaskPopup}
      handleClose={handleCloseModal}
    >
      <div className={styles.taskSave}>
        {popupSlice.isLoading && <LoadingData />}
        {popupSlice.errorPopup.status && (
          <GlobalErrorMessage
            popupFadeoutTime={popupSlice.errorPopup.popupFadeoutTime}
            message={popupSlice.errorPopup.message}
          />
        )}
        <div>
          <p>
            Are you sure you want to delete <b>{task.title}</b> track
          </p>
          <div className={styles.deleteTask}>
            <div>
              <GlobalButton
                size="sm"
                variant="light"
                onClick={handleCloseModal}
              >
                No
              </GlobalButton>
            </div>
            <div>
              <GlobalButton
                size="sm"
                variant="danger"
                onClick={() => deleteTaskData(task.id)}
              >
                Yes
              </GlobalButton>
            </div>
          </div>
        </div>
      </div>
    </GlobalModal>
  );
};
