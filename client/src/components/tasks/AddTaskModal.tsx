import { useDispatch, useSelector } from "react-redux";
import { GlobalButton } from "../globalButton/GlobalButton";
import { GlobalModal } from "../globalModal/globalModal";
import { RootState } from "../../redux-toolkit/store";
import {
  showAddTaskPopup,
  showErrorPopup,
  showIsLoading,
  showSucessPopup,
} from "../../redux-toolkit/reducers/popupSlice";
import { addTask, displayTasks } from "../../services/tasksServices";
import { ACTIONS_ERROR_MESSAGE } from "../../constants/globalText";
import { GlobalErrorMessage } from "../errorAndSuccessMessage/ErrorSuccessMessage";
import { LoadingData } from "../loading/LoadingData";
import styles from "./tasks.module.scss";
import { GlobalInput } from "../globalInput/GlobalInput";
import { Form } from "react-bootstrap";
import { Formik } from "formik";

export const AddTaskModal = () => {
  const dispatch = useDispatch();
  const popupSlice = useSelector((state: RootState) => state.popupSlice);

  const taskHandleSubmit = async (values: { title: string }) => {
    dispatch(showIsLoading(true));

    try {
      await addTask(values.title);
      await displayTasks();

      dispatch(showIsLoading(false));
      dispatch(
        showSucessPopup({
          status: true,
          message: `Task updated successfully!`,
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
    dispatch(showAddTaskPopup(false));
  };

  return (
    <GlobalModal
      title="Add Task"
      show={popupSlice.addTaskPopup}
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

        <Formik
          form
          initialValues={{
            title: "",
          }}
          onSubmit={taskHandleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <Form>
              <>
                <GlobalInput
                  name="title"
                  label="Title"
                  required
                  placeholder="Title"
                  id="title"
                  onChange={handleChange("title")}
                  onBlur={handleBlur("title")}
                  autoCapitalize="none"
                  error={errors.title}
                />
                <div className={styles.upload}>
                  <GlobalButton
                    size="sm"
                    variant="success"
                    disabled={!values.title}
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </GlobalButton>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </GlobalModal>
  );
};
