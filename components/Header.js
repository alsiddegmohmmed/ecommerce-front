import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useState, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "./icons/BarsIcon";
import { motion } from "framer-motion";

const StyledHeader = styled.header`
  background-color: #222;
  z-index: 1000;
  position: relative; /* Ensure header is positioned */
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 1100; /* Ensure logo is above nav */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 1100; /* Ensure button is above nav */
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <NavButton onClick={() => setIsOpen(isOpen => !isOpen)}>
            <BarsIcon />
          </NavButton>
          <motion.nav
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor: "#222",
              padding: "70px 20px 20px",
              zIndex: 1050,
              display: isOpen ? "block" : "none"
            }}
          >
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            {/* <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </motion.nav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
