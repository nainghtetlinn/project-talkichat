import { Badge, styled } from "@mui/material";

type Props = { children: JSX.Element; isActive: boolean };

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export const ActiveBadge = ({ children, isActive }: Props) => {
  return isActive ? (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      {children}
    </StyledBadge>
  ) : (
    <>{children}</>
  );
};
