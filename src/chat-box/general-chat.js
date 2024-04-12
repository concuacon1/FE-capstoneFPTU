import React from "react";
import { Box, Stack, Typography, Avatar, IconButton, TextField } from "@mui/material";
import Chat from './chat-list-user'
import { styled, useTheme } from "@mui/material/styles"
import { Chat_History } from "../data/chat.data";
import { TextMsg, Timeline, MediaMsg, DocMsg } from "./msg-type";
import StyledBadge from "../component/styledBadge"
import AvatarImage from "../images/avatar-customer.png"
import { InsertPhoto, FileUploadSharp } from "@mui/icons-material";
import { Smiley, PaperPlaneTilt } from "@phosphor-icons/react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));

const ChatInput = ({ setOpenPicker }) => {
    return (
        <StyledInput
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                endAdornment:
                    <IconButton onClick={() => {
                        setOpenPicker((prev) => !prev);
                    }}>
                        <Smiley />
                    </IconButton>
            }}
        />
    )
}

const GeneralChat = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = React.useState(false);
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
                <Stack height={'100vh'} maxHeight={'100vh'} width='100%'>
                    {/* Chat header */}
                    <Box
                        p={5}
                        sx={{
                            height: 100,
                            width: "100%",
                            backgroundColor: '#F8FAFF',
                            boxShadow: '0 0 2px rgba(0,0,0,0.25)'
                        }}>
                        <Stack
                            alignItems={"center"}
                            direction={'row'}
                            justifyContent={'space-between'}
                            sx={{ width: '100%', height: '100%' }}
                        >
                            <Stack direction={'row'} spacing={2}>
                                <Box>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar alt="Full Name" src={AvatarImage} />
                                    </StyledBadge>
                                </Box>

                                <Stack spacing={0.2}>
                                    <Typography variant="subtitle2">Full name</Typography>
                                    <Typography variant="caption">Online</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                    {/* Message */}
                    <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflow: "hidden scroll" }}>
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
                    </Box>
                    {/* Chat footer */}
                    <Box
                        p={2}
                        sx={{
                            width: "100%",
                            backgroundColor: '#F8FAFF',
                            boxShadow: '0 0 2px rgba(0,0,0,0.25)'
                        }}>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            <IconButton>
                                <FileUploadSharp />
                            </IconButton>
                            <IconButton>
                                <InsertPhoto />
                            </IconButton>
                            <Stack sx={{ width: "100%" }}>
                                <Box sx={{
                                    display: openPicker ? "inline" : "none",
                                    zIndex: 10,
                                    position: "fixed",
                                    bottom: 81,
                                    right: 100
                                }}>
                                    <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                                </Box>
                                <ChatInput setOpenPicker={setOpenPicker} />
                            </Stack>
                            <Box sx={{
                                height: 40,
                                width: 40,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 1.5
                            }}>
                                <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                                    <IconButton>
                                        <PaperPlaneTilt color="#FFF" />
                                    </IconButton>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
};
export default GeneralChat;