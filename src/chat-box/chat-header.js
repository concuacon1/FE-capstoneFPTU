import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../component/styledBadge"
import AvatarImage from "../images/avatar-customer.png"

const ChatHeader = () => {
    const theme = useTheme()
    return (
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
    )
};
export default ChatHeader;