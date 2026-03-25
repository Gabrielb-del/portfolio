import { Container, Grid, styled, Typography } from "@mui/material"
import Avatar from "../../../../assets/images/avatar.jpeg"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import theme from "../../../../theme";
import StyledButton from "../../../../components/StyledButton/StyledButton";
import AnimatedBackground from "../../../../components/AnimatedBackgroundColor/AnimatedBackground";





const Hero = () => {
    const StyledHero = styled("div")(() => ({

        backgroundColor: theme.palette.primary.contrastText,
        height: "100vh",
        display: "flex",
        alignItems: "center"
    
    }))
    
    const StyledImg = styled("img")(() => ({
    
        width: "80%",
        borderRadius: "50%",
        border: `1px solid ${theme.palette.secondary.contrastText}`
    
    
    }))



    return (
        <>
            <StyledHero>
                <Container maxWidth="lg">
                    <AnimatedBackground/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <StyledImg src={Avatar} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Typography color="secondary" variant="h2" textAlign="center">
                                Prazer meu nome é
                            </Typography>
                            <Typography color="primary" variant="h1" textAlign="center">
                                Gabriel Baunilia
                            </Typography>
                            <Grid container display="flex" justifyContent="center" spacing={3}>
                                <Grid item xs={12} md={6} display="flex" justifyContent="center">
                                    <StyledButton>
                                        <FileDownloadIcon />
                                        <Typography>
                                            Download CV
                                        </Typography>
                                    </StyledButton>
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <StyledButton>
                                        <ForwardToInboxIcon />
                                        <Typography>
                                            Contate-me
                                        </Typography>
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledHero>
        </>
    )
}

export default Hero
