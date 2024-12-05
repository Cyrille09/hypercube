import Modal from "react-bootstrap/Modal";
import classnames from "classnames";

// style components
interface ModalProps {
  size?: "sm" | "lg" | "xl";
  backdrop?: "static" | true | false;
  centered?: true | false;
  scrollable?: true | false;
  fullscreen?:
    | true
    | "sm-down"
    | "md-down"
    | "lg-down"
    | "xl-down"
    | "xxl-down";
  footer?: React.ReactNode;
  className?: string;
  globalStyle?: React.CSSProperties;
  title?: string;
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export const GlobalModal = ({
  size,
  backdrop = true,
  centered = true,
  scrollable = false,
  fullscreen,
  title,
  show,
  handleClose,
  className,
  children,
}: ModalProps) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size={size}
        backdrop={backdrop}
        centered={centered}
        fullscreen={fullscreen}
        className={classnames(scrollable ? "modal-dialog-scrollable" : "")}
      >
        <div className={className}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: 20 }}>{title}</Modal.Title>
          </Modal.Header>
          {children}
        </div>
      </Modal>
    </>
  );
};
