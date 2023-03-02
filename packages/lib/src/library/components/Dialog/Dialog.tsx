import { Card, Divider } from "..";
import { IDialogState } from "../../providers";
import BlurryBackground from "../utils/BlurryBackground";

import styles from "./Dialog.css";

const Dialog = ({
  dialogState,
  closeDialog,
}: {
  dialogState: IDialogState;
  closeDialog: () => void;
}) => {
  const onOkClick = () => {
    dialogState.okCallback?.();
    closeDialog();
  };

  const onCancelClick = () => {
    dialogState.closeCallback?.();
    closeDialog();
  };

  return (
    <BlurryBackground onClick={closeDialog} visible={dialogState.open}>
      {dialogState.open && (
        <Card className={styles.Dialog}>
          <p>{dialogState.content}</p>
          <Divider style={{ marginBottom: "10px" }} />
          <div className={styles.Buttons}>
            <button onClick={onOkClick}>Ok</button>
            <button onClick={onCancelClick}>Cancel</button>
          </div>
        </Card>
      )}
    </BlurryBackground>
  );
};

export default Dialog;