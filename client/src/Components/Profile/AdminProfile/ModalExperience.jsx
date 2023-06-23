import React from "react";
import { useSelector } from "react-redux";
import { CardExperience } from "../../AllExperiencies/CardExperiences";

export const ModalExperience = ({ experienceId }) => {
    const experiences = useSelector((state) => state.allExperiences);
    const exp = experiences?.find(exp => exp.idExperience === experienceId)
    if(exp){
    const { imgExperience, textExperience, firstName, booking, email} = exp
    return (
        <CardExperience 
        imgExperience={imgExperience} 
        textExperience={textExperience}
        firstName={firstName}
        email={email}
        startDate={booking.startDate}
        endDate={booking.endDate}
        bikes={booking.bikes}
        idExperience={experienceId}
        withoutLike={true}
        />
        )
    }
    else{
        return null
    }
}