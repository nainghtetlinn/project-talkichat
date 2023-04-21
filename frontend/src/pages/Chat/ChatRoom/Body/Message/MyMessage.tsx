import { Stack, Chip, Collapse, Typography } from "@mui/material";
import { MessageType } from "../../../../../@types";

import { useState } from "react";
import moment from "moment";

type Props = { message: MessageType };

export const MyMessage = ({ message }: Props) => {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }

  return (
    <>
      <Stack direction="row" justifyContent="right">
        <Chip
          onClick={handleClick}
          label={message.content}
          sx={{
            height: "auto",
            py: 0.5,
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "pre-line",
            },
            fontSize: 16,
          }}
        />
      </Stack>
      <Collapse in={show} timeout="auto">
        <Stack direction="row" justifyContent="right">
          <Typography variant="caption">
            {moment(message.createdAt).fromNow()}
          </Typography>
        </Stack>
      </Collapse>
    </>
  );
};
