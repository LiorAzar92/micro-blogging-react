import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.nav`
  background: #343A40;
  border-radius: 6px;
  height: 58px;
  width: 1076px;
  padding-left: 36px;
  display: flex;
  justify-content: space-between;
  // padding: 0.5rem calc((100vw - 1000px) / 2);
  
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  opacity: 50%;
  display: flex;
  font-size: 16px;
  // align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
    opacity: 100%;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;