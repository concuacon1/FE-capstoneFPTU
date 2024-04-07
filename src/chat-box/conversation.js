import React from "react";
import { Box, Stack, Avatar, Badge, Typography, TextField, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import ChatHeader from "./chat-header.js";
import ChatFooter from "./chat-footer.js";
import ChatMessage from "./chat-message.js"
const Conversation = () => {
    const theme = useTheme();
    return (
        <>
            <Stack height={'100vh'} maxHeight={'100vh'} width='100%'>
                {/* Chat header */}
                <ChatHeader />
                {/* Message */}
                <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflow: "hidden scroll" }}>
                    <ChatMessage />
                </Box>
                {/* Chat footer */}
                <ChatFooter />
            </Stack>
        </>
    )
}

export default Conversation;