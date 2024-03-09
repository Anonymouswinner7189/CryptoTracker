import { Typography } from '@mui/material';
import { Container, styled } from '@mui/system';
import React from 'react';
import Carousel from './Carousel';

const BannerContainer = styled('div')({
    backgroundImage: "url(./banner2.jpg)",
});

const BannerContent = styled(Container)({
    height:400,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around",
});

const BannerTagline = styled('div')({
    display:"flex",
    height:"40%",
    flexDirection:"column",
    justifyContent:"center",
    textAlign:"center",
});

const Banner = () => {

    return (
        <BannerContainer>
            <BannerContent>
                <BannerTagline>
                    <Typography
                        variant="h2"
                        style={{
                            fontweight:"bold",
                            marginBottom:15,
                            fontFamily:"Montserrat",
                        }}
                    >
                        Crypto Tracker
                    </Typography>
                    <Typography
                        variant="subtitle"
                        style={{
                            color:"darkgrey",
                            textTransform:"capitalize",
                            fontFamily:"Montserrat",
                        }}
                    >
                        Get all the Info regarding your favourite Crypto Coins.
                    </Typography>
                </BannerTagline>
                <Carousel />
            </BannerContent>
        </BannerContainer>
    );
};

export default Banner
