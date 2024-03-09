import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TrendingCoins} from "../../config/api"
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const Slider = styled('div')({
    height:"50%",
    display:"flex",
    alignItems:"center",
});

const CarouselItem = styled(Link)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
})

export function numberWithCommas(x){
    if(x!==undefined) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return "";
}

const Carousel = () => {

    const [trending,setTrending] = useState([]);

    const {currency,symbol} = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch (error) {
            console.error('Error fetching trending coins:', error.message);
        }
    };

    useEffect(() => {
        fetchTrendingCoins();
    },[currency]);

    const items = trending.map((coin)=>{
        
        let profit = coin.price_change_percentage_24h>=0;
        return (
            <CarouselItem to={`/coins/${coin.id}`}>
                <img src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
                />
                <span>{coin?.symbol}
                    &nbsp;
                    <span>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CarouselItem>
        )
    });

    const responsive = {
        0 : {
            items : 2,
        },
        512 : {
            items : 4,
        },
    };

    return (
        <Slider>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </Slider>
    )
}

export default Carousel
