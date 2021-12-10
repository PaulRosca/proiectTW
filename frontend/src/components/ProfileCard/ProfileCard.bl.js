import axios from "axios";

export const handleProfilePictureChange = async (profilePictureRef) => {
    const file = profilePictureRef.current.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('profilePicture', file);
    try{
    const res = await axios.post("http://localhost:9000/profilePicture/", formData, {withCredentials: true, 'Content-Type': 'multipart/form-data'});
    console.log(res);   
    }
    catch (err){
        console.log(err);
    }
}