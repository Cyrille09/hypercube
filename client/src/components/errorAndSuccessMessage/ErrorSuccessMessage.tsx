import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
// styles components

import { DefaultPopupMessage } from "../globalTypes/GlobalTypes";
import styles from "./errorSuccessMessage.module.scss";
import { DEFAULT_ERROR_SUCCESS_POPUP } from "../../constants/defaultValues";
import { RootState } from "../../redux-toolkit/store";
import {
  showErrorPopup,
  showSucessPopup,
} from "../../redux-toolkit/reducers/popupSlice";

export const GlobalErrorMessage = ({
  message,
  popupFadeoutTime = DEFAULT_ERROR_SUCCESS_POPUP,
}: {
  message: string;
  popupFadeoutTime?: number;
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const actions = useSelector((state: RootState) => state.popupSlice);

  useEffect(() => {
    const fadeoutTime = setTimeout(() => {
      dispatch(showErrorPopup({ ...DefaultPopupMessage }));
    }, popupFadeoutTime);

    return () => {
      clearTimeout(fadeoutTime);
    };
  }, [dispatch, popupFadeoutTime]);

  return (
    <CSSTransition
      in={actions.errorPopup.status}
      nodeRef={nodeRef}
      timeout={100}
      classNames="panel-animate"
      unmountOnExit={true}
      mountOnEnter={true}
      onEnter={() => document.body.classList.add("css-transition-modal-open")}
      onExited={() =>
        document.body.classList.remove("css-transition-modal-open")
      }
    >
      <div className={styles.errorMessage} role="alert">
        {message}
      </div>
    </CSSTransition>
  );
};

export const GlobalSuccessMessage = ({
  message,
  popupFadeoutTime = DEFAULT_ERROR_SUCCESS_POPUP,
}: {
  message: string;
  popupFadeoutTime?: number;
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const actions = useSelector((state: RootState) => state.popupSlice);

  useEffect(() => {
    const fadeoutTime = setTimeout(() => {
      dispatch(showSucessPopup({ ...DefaultPopupMessage }));
    }, popupFadeoutTime);

    return () => {
      clearTimeout(fadeoutTime);
    };
  }, [dispatch, popupFadeoutTime]);

  return (
    <CSSTransition
      in={actions.successPopup.status}
      nodeRef={nodeRef}
      timeout={100}
      classNames="panel-animate"
      unmountOnExit={true}
      mountOnEnter={true}
      onEnter={() => document.body.classList.add("css-transition-modal-open")}
      onExited={() =>
        document.body.classList.remove("css-transition-modal-open")
      }
    >
      <div className={styles.successMessage} role="alert">
        {message}
      </div>
    </CSSTransition>
  );
};

export const GlobalQueryErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.message} role="alert">
      {message}
    </div>
  );
};

export const GlobalWarningMessage = ({ message }: { message: string }) => {
  return <div className={styles.warningMessage}>{message}</div>;
};
