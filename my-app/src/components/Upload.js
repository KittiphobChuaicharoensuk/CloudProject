import "../styles/Upload.css"
import DropFileInput from "./function/DropFileInput";
import { useNavigate } from "react-router-dom";

export default function ClientUpload(){

    const navigate = useNavigate();
    const onFileChange = (files) =>{
        console.log(files)

    }

    return (
        <div className="box">
            <h2 className="header">
               <button className="back" onClick={()=>{navigate('/')}}>back</button><br/>
               Files upload
            </h2>
            <DropFileInput onFileChange={(files)=>{
                onFileChange(files)}}/>
        </div>
    );
}