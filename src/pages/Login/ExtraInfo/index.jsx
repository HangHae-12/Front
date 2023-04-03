import { useMatch, Link } from "react-router-dom";
import styled from "styled-components";
import Parent from "./Parent";
import Teacher from "./Teacher";

const Extrainfo = () => {
  const teacherMatch = useMatch(`/extrainfo/teacher`);
  const parentMatch = useMatch(`/extrainfo/parent`);

  return (
    <>
      <h1>Extra Info</h1>
      <Tabs>
        <Tab isActive={!!parentMatch}>
          <Link to="parent">학부모</Link>
        </Tab>
        <Tab isActive={!!teacherMatch}>
          <Link to="teacher">선생님</Link>
        </Tab>
      </Tabs>
      
      {parentMatch && <Parent />}
      {teacherMatch && <Teacher />}
    </>
  );
};
export default Extrainfo;

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
