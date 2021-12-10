import { Icon } from "@iconify/react"
import { Container, Username, ProfilePictureDiv, ProfilePictureInput, ProfilePictureLabel, ProfilePictureInputDiv, UploadPhotoButton } from "./ProfileCard.styled";
import ReactImageFallback from "react-image-fallback";
import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { handleProfilePictureChange } from "./ProfileCard.bl";
import {useSelector} from 'react-redux';

export const ProfileCard = ({user}) => {
    const { username } = user;
    const defaultImage = <Icon icon="bx:bx-user" style={{"fontSize": "3rem"}}></Icon>;
    const params = useParams();
    const profilePictureRef = useRef(null);
    const connectedUser = useSelector(state => state.user);
    const [file, setFile] = useState(null);

    return(<Container>
        <ProfilePictureDiv>
        <ReactImageFallback
                src={`http://localhost:9000/profilePicture/user/${params.id}`}
                fallbackImage={defaultImage}
                style={{width: '3rem', height: '3rem', alignSelf: 'center', objectFit: 'cover', 'borderRadius': '4px'}}
            />
        <Username>{username}</Username>
        {connectedUser && connectedUser._id === params.id && 
        <div>
        <ProfilePictureInputDiv>
        {!file && <ProfilePictureLabel htmlFor="profile-picture-input" title="Update profile picture">
            <Icon icon="carbon:image-search-alt" style={{color: "white", fontSize: "1.2rem", alignSelf: "center"}} />
        </ProfilePictureLabel>}
        <ProfilePictureInput type="file" accept="image/*" id="profile-picture-input" ref={profilePictureRef} onChange={(e) => {setFile(profilePictureRef.current.files[0])}}/>
        {file && <span>{file.name}</span>}
        {file && <Icon icon= "carbon:close" style={{fontSize: "1.2rem", cursor: "pointer"}} onClick={(e) => {profilePictureRef.current.value = null; setFile(null)}}/>}
        </ProfilePictureInputDiv>

        {file && <UploadPhotoButton onClick={(e) => handleProfilePictureChange(profilePictureRef).then(res => {profilePictureRef.current.value = null; setFile(null); window.location.reload()})}>Upload</UploadPhotoButton>}
        
        </div>
        
        }
        </ProfilePictureDiv>
    </Container>)
}