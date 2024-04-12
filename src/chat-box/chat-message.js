import React from "react";
import { Box, Stack } from "@mui/material"
import { Chat_History } from "../data/chat.data";
import { TextMsg, Timeline, MediaMsg, DocMsg, ReplyMsg, LinkMsg } from "./msg-type";

const Message = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            //time-line    
                            return <Timeline el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    //img-msg
                                    return <MediaMsg el={el} />
                                case "doc":
                                    //doc-msg
                                    return <DocMsg el={el} />
                                default:
                                    //text-msg
                                    return <TextMsg el={el} />
                            }
                            break;
                    }
                })}
            </Stack>
        </Box >
    )
};
export default Message;