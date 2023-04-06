import { RightDrawer } from "components/pages/core";
import { ArrowBackIcon, IconButton } from "lib";
import { useNavigate } from "react-router-dom";

export interface MessageDrawerProps {
  children: React.ReactNode;
  open: boolean;
}

export const MessageDrawer = (props: MessageDrawerProps) => {
  const { open, children } = props;

  const navigate = useNavigate();

  return (
    <RightDrawer open={open}>
      <IconButton onClick={() => navigate("")}>
        <ArrowBackIcon />
      </IconButton>
      {children}
    </RightDrawer>
  );
};
