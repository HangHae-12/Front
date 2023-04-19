import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";

const ClassButton = ({ everyClass }) => {
    const firstClass = everyClass?.[0]?.id?.toString();
    const { id = firstClass } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const loadClassroom = (id) => {
        navigate(`/monthAttendance/${id}`, () => {
            queryClient.invalidateQueries(["getMonthAttendance"]);
        });
    };

    return (
        <StyledClassButtonGroup>
            {everyClass?.map((classroom) => (
                <Button.ClassButton
                    key={classroom.id}
                    selected={classroom.name}
                    isSelected={id === classroom.id.toString()}
                    onClick={() => loadClassroom(classroom.id.toString())}
                />
            ))}
        </StyledClassButtonGroup>
    );
};

export default ClassButton;

const StyledClassButtonGroup = styled.div`
  padding-bottom: 10px;
`;
