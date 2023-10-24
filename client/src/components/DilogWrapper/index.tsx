import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, PropsWithChildren, forwardRef } from "react";
import { IDialogWrapperProps } from "types/types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogWrapper: FC<PropsWithChildren<IDialogWrapperProps>> = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: " blur(40px)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "30px",
        },
      }}
    >
      {children}
    </Dialog>
  )
}

export default DialogWrapper;