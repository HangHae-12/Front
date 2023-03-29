import { Outlet, useMatch, Link } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const teacherMatch = useMatch(`/signup/teacher`);
  const parentMatch = useMatch(`/signup/parent`);

  return (
    <>
      <h1>Signup</h1>
      <Tabs>
        <Tab isActive={!!parentMatch}>
          <Link to="parent">parent</Link>
        </Tab>
        <Tab isActive={!!teacherMatch}>
          <Link to="teacher">teacher</Link>
        </Tab>
      </Tabs>
      <Outlet />
    </>
  );
};
export default Signup;

const Tabs = styled.div`
  width: 300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  padding: 7px 0px;
  border-radius: 10px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.color.primary : theme.color.black};
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;
