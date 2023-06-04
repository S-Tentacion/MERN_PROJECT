import { Box, Button } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import allImages from "../../constants/imageContants";
import { SearchIcon } from "@chakra-ui/icons";
import { css, StyleSheet } from "aphrodite";
import UserProfileAction from "./UserProfileActions";
import { MOBILE_QUERY } from "../../constants/mediaQueries";
import Link from "next/link";
import { useState } from "react";
import { useUserContext } from "../../context/AuthContext";

function debouncing(fn, del) {
  let timer;
  return (...args) => {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, del);
  };
}
const Header = () => {
  const { user } = useUserContext();
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const optimizedFn = debouncing((e) => {
    handleChange(e);
  }, 300);

  console.log(user, "user");
  return (
    <chakra.header minH={"100px"} h={"50px"} className={css(styles.container)}>
      <Box className={css(styles.wrapper)} h={"100%"} w={"100%"}>
        <Link href={"/"}>
          <chakra.img
            src={allImages.logo}
            w={"40px"}
            height={"40px"}
          ></chakra.img>
        </Link>
        <Box className={css(styles.searchBox)}>
          <Button
            className={css(styles.searchIcon)}
            variant="outline_black"
            size={"md"}
            leftIcon={<SearchIcon boxSize="1.2rem" />}
          ></Button>
          <chakra.input
            className={css(styles.searchBar) + " header-search-bar"}
            type={"text"}
            placeholder={"Search products, brands & more..."}
            onChange={optimizedFn}
          ></chakra.input>
        </Box>
        {!user ? (
          <Link href={"/login"}>
            <Button
              className={css(styles.loginBtn)}
              padding={"0px 30px"}
              colorScheme="purple"
            >
              Login
            </Button>
          </Link>
        ) : null}
        <UserProfileAction />
      </Box>
      <svg
        data-component="a9-ribbon"
        data-key="s001-main-navigation"
        width="100%"
        height="6px"
        fill="#fff6e6"
      >
        <defs>
          <pattern
            id="ribbon_s001-main-navigation"
            x="-36"
            y="0"
            width="45"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 0 0 C 11 0 11 6 21 6 C 31 6 31 0 42 0"></path>
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#ribbon_s001-main-navigation)"
        ></rect>
      </svg>
    </chakra.header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px 35px",
    [MOBILE_QUERY]: {
      padding: "7px 22px",
    },
  },
  loginBtn: {
    borderRadius: "9999px",
    fontWeight: "500",
  },
  searchBox: {
    width: "450px",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [MOBILE_QUERY]: {
      display: "none",
    },
  },
  container: {
    boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)",
    backgroundColor: "#fff6e6",
    position: "sticky",
    top: 0,
    zIndex: 9999,
  },
  searchIcon: {
    borderRadius: "6px 0 0 6px",
    backgroundColor: "#f5f5f6",
  },
  searchBar: {
    display: "inline-block",
    fontSize: "14px",
    height: "40px",
    lineHeight: "24px",
    width: "100%",
    padding: "8px 10px 10px",
    border: "1px solid #f5f5f6",
    borderRadius: "0 6px 6px 0",
    backgroundColor: "#f5f5f6",
    ":focus": {
      backgroundColor: "#fff",
      borderColor: "#eaeaec",
    },
  },
});

export default Header;
