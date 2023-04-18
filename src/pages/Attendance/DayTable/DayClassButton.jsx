import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";

const ClassButton = ({ everyClass }) => {

    const firstClass = everyClass?.[0].id.toString();
    const { classroomId = firstClass } = useParams();

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedButton, setSelectedButton] = useState(classroomId);

    useEffect(() => {
        setSelectedButton(classroomId);
    }, [classroomId]);

    const loadClassroom = (id) => {
        setSelectedButton(id);
        queryClient.invalidateQueries(["getDayAttendance"]);
        navigate(`/dayAttendance/${id}`);
    };



    return (
        <StyledClassButtonGroup>
            {everyClass?.map((classroom) => (
                <Button.ClassButton
                    key={classroom.id}
                    selected={classroom.name}
                    isSelected={selectedButton === classroom.id.toString()}
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

