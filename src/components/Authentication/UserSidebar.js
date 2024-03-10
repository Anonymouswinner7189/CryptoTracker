import { Avatar, Button, Drawer } from "@mui/material";
import React from "react";
import { CryptoState } from "../../CryptoContext";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { numberWithCommas } from "../Banner/Carousel";
import { signOut } from "firebase/auth";
import { AiFillDelete } from "react-icons/ai";

const container = {
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
};

const profile = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
};

const logout = {
  height: "8%",
  width: "100%",
  backgroundColor: "#EEBC1D",
  marginTop: 20,
};

const picture = {
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
  objectFit: "contain",
};

const Batchlist = {
  flex: 1,
  width: "100%",
  backgroundColor: "white",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
};

const Doin = {
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
};

const UserSidebar = () => {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={container}>
              <div style={profile}>
                <Avatar
                  style={picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div style={Batchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div style={Doin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button variant="contained" style={logout} onClick={logOut}>
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;