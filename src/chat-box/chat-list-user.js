import React from "react";
import {
    Box,
    IconButton,
    Stack,
    Typography,
    InputBase,
    Avatar,
    Button,
    Divider,
    Badge
} from "@mui/material";
import {
    ArchiveBox,
    CircleDashed,
    MagnifyingGlass,
} from "phosphor-react";
import { styled, alpha } from "@mui/material/styles"
import SimpleBarReact from "simplebar-react";
import { ChatList } from "../data/chat.data.js"

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
    // maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
        },
        '&.simplebar-visible:before': {
            opacity: 1,
        },
    },
    '& .simplebar-track.simplebar-vertical': {
        width: 10,
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
        height: 6,
    },
    '& .simplebar-mask': {
        zIndex: 'inherit',
    },
    "& .simplebar-placeholder": {
        height: '0 !important',
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: '#FFF'
            }}
            p={2}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={2}>
                    {online ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar src={img} />
                        </StyledBadge> : <Avatar src={img} />
                    }

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{msg}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography sx={{ fontWeight: 600 }} variant='caption'>
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}>

                    </Badge>
                </Stack>
            </Stack>
        </Box>
    )
};

const SearchUserChat = styled("div")(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.paper, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%'
    },
}));
const Chats = () => {
    return (
        <Stack direction={'row'}>
            <Box sx={{
                position: 'relative',
                width: 400,
                backgroundColor: '#F8FAFF',
                boxShadow: '0 0 2px rgba(0,0,0,0.25)'
            }}>
                <Stack p={5} spacing={2} sx={{ height: "100vh" }}>
                    <Stack
                        direction='row'
                        alignItem='center'
                        justifyContent='space-between'
                    >
                        <Typography
                            variant="h5"
                            style={{ display: 'flex', alignContent: "center" }}>
                            Đoạn chat
                        </Typography>
                        <IconButton>
                            <CircleDashed />
                        </IconButton>
                    </Stack>
                    <Stack sx={{ width: '100%' }}>
                        <SearchUserChat>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
                        </SearchUserChat>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1, overflow: "hidden scroll", height: "100%" }}>
                        {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                Pined
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767", marginTop: "2px" }} >
                                All chat
                            </Typography>
                            {ChatList.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                        {/* </SimpleBarStyle> */}
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
};
export default Chats;