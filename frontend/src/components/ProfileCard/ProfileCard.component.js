import { Icon } from "@iconify/react"
import { Container, Username, ProfilePictureDiv, ProfilePictureInput, ProfilePictureLabel } from "./ProfileCard.styled";
import ReactImageFallback from "react-image-fallback";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { handleProfilePictureChange } from "./ProfileCard.bl";
import {useSelector} from 'react-redux';

export const ProfileCard = ({user}) => {
    const { username, _id } = user;
    const defaultImage = <Icon icon="bx:bx-user" style={{"fontSize": "3rem"}}></Icon>;
    const params = useParams();
    const profilePictureRef = useRef(null);
    const connectedUser = useSelector(state => state.user);
    
    return(<Container>
        <ProfilePictureDiv>
        <ReactImageFallback
                src={`http://localhost:9000/profilePicture/user/${user._id}`}
                fallbackImage={defaultImage}
                style={{width: '3rem', height: '3rem', alignSelf: 'center', objectFit: 'cover', 'borderRadius': '4px'}}
            />
        {connectedUser && connectedUser._id === params.id && 
        <>
        <ProfilePictureLabel htmlFor="profile-picture-input" title="Update profile picture">
            <Icon icon="carbon:image-search-alt" style={{color: "white", fontSize: "1.2rem"}} />
        </ProfilePictureLabel>
        <ProfilePictureInput type="file" accept="image/*" id="profile-picture-input" ref={profilePictureRef} onChange={(e) => handleProfilePictureChange(profilePictureRef)}/>
        </>
        }
        </ProfilePictureDiv>
        
        <Username style={{marginLeft: "1rem"}}>{username}</Username>
    </Container>)
}