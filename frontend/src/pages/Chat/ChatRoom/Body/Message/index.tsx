import { Stack, Box, Chip, Avatar, Typography, Collapse } from "@mui/material";
import { MessageType } from "../../../../../@types";
import { ActiveBadge } from "../../../../../components";

import { useState } from "react";
import moment from "moment";

type Props = { message: MessageType; isLast: boolean; isFirst: boolean };

export const Message = ({ message, isFirst, isLast }: Props) => {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }

  return (
    <>
      {isFirst ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mt: 1.5 }}
        >
          <Box
            sx={{ display: "inline-block", width: 25, height: "100%" }}
          ></Box>
          <Typography variant="body2">{message.sender.username}</Typography>
        </Stack>
      ) : null}
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Box sx={{ width: 25 }}>
          {isLast ? (
            <ActiveBadge isActive={message.sender.isActive}>
              <Avatar
                alt={message.sender.username}
                src={message.sender.avatar}
                sx={{ height: 25, width: 25 }}
              />
            </ActiveBadge>
          ) : null}
        </Box>
        <Chip
          onClick={handleClick}
          color="primary"
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
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box
            sx={{ display: "inline-block", width: 25, height: "100%" }}
          ></Box>{" "}
          <Typography variant="caption">
            {moment(message.createdAt).fromNow()}
          </Typography>
        </Stack>
      </Collapse>
    </>
  );
};
