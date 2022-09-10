import { useState } from "react";
import axios from "axios";


const UploadImages = () => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const upload = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        setLoading(true)
        const res = await axios.post("https://api.cloudinary.com/v1_1/insolita/image/upload", data)
        const file = await res.data;
        console.log(file)
        setImage(file.secure_url)
        console.log(file.secure_url)
        setLoading(false)
    };

    return (

        <form style={{margin:"30px"}}>
            <input type="file"
                placeholder="sube tu imagen"
                name="file"
                onChange={upload} />
            { loading
                ? <h4>Tu imagen se está cargando</h4>
                : <div><img src={image} style={{ width: "10%" }} alt="img not found" /></div>
            }
        </form>
    )
};
export default UploadImages;