import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { styled } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

const Container = styled("div")(({ theme }) => ({
  display: "flex",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",

  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },

  [theme.breakpoints.down("xs")]: {
    alignItems: "flex-start",
  },
}));

const description = {
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
};

const heading = {
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
};

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={description}>
          {coin?.description.en.split(". ")[0] &&
            parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>

      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
