import React from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles";
import { InsertPhoto } from "@mui/icons-material";
import { Smiley, PaperPlaneTilt } from "@phosphor-icons/react"

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));

const ChatFooter = () => {
    const theme = useTheme()
    return (
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
                    <InsertPhoto />
                </IconButton>
                <StyledInput
                    fullWidth
                    placeholder="Write a message..."
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                        endAdornment:
                            <IconButton>
                                <Smiley />
                            </IconButton>
                    }}
                />
                <Box sx={{ height: 40, width: 40, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                        <IconButton>
                            <PaperPlaneTilt color="#FFF" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
};

export default ChatFooter;