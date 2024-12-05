import { DEFAULT_ERROR_SUCCESS_POPUP } from "../../constants/defaultValues";

export interface PopupMessageInterface {
  status: boolean;
  message: string;
  popupFadeoutTime: number;
}

export const DefaultPopupMessage = {
  status: false,
  message: "",
  popupFadeoutTime: DEFAULT_ERROR_SUCCESS_POPUP,
};

export interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
}

export const DefaultTask = {
  id: 0,
  title: "",
  completed: false,
};

export interface TaskListProps {
  tasks: TaskProps[];
  markTaskComplete: (value: number) => void;
}
