import React from "react";
import { Box, Stack } from "@mui/material";
import Chat from './chat-list-user'
import Conversation from './conversation'
import { useTheme } from "@mui/material/styles";

const GeneralChat = () => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} sx={{ width: '100%', height: "100%" }}>
            {/* Chat list */}
            <Chat />
            {/* Box Chat */}
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.default
                }}>
                {/* Conversation */}
                <Conversation />
            </Box>
        </Stack>
    )
};
export default GeneralChat;