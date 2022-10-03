import React,{useRef,useState} from "react";
import PropTypes from 'prop-types';
import '../../styles/DropFileInput.css';
import { ImageConfig } from "../../configuration/ImageConfig";
import uploadImage from '../../assets/cloud-upload.png'

const DropFileInput = (props) => {

    const [fileList, setFileList] = useState([]);
    const onFileDrop = (e)=>{
        let formData = new FormData();
        const newFile = e.target.files[0];
        if (newFile.name.slice(-3).toLowerCase() ==='jpg' && newFile.size <= 50000){
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                const image = new Image();
                image.src = String(this.result);
                formData.append('imagefile',this.result)
                image.addEventListener('load', function () {
                    fileValidate(this.width, this.height, newFile);
                    handleUploadFile(newFile, formData);
                });
            }, false);
                    
            reader.readAsDataURL(newFile);
        }else{
            alert('NOT PASS!\nPlease make sure that your file is following:\n1.) .jpg form\n2.) file size is not larger than 50KB\n3.) file dimension is up to 200x200 pixel')
        }
            
 
    }

    const handleUploadFile = (file,formData)=>{
        formData.append('imagepath',String(file.name));
        formData.append('imagefile',file)
        console.log(file)
        fetch('http://localhost:8080/upload', {
                'method':'POST',
                'body': formData
            }).then((data)=>data.json()).then((json)=>{
                console.log(20)
                console.log(json)
            }).catch((err)=>{
                console.log(err)
            })
    }

    const fileValidate = (width, height, newFile)=>{
        if (newFile.name.slice(-3).toLowerCase() ==='jpg' && newFile.size <= 50000 && width<=200 && height<=200){
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
            // alert('Your file(s) uploaded successfully');

        }
        else{
            alert('NOT PASS!\nfile dimension is up to 200x200 pixel')

        }
    }

    const fileSizeChecker = (file)=>{
        console.log(file)
        if(file.name.slice(-3).toLowerCase() ==='jpg' && file.size <= 50000){
            fileRemove(file); 
            alert('Upload successfully');
        }else{
            alert('NOT PASS!\nPlease make sure that your file is following:\n1.) .jpg form\n2.) file size is not larger than 50KB')
        }
    }

    const fileRemove = (f)=>{
        const updatedList = [...fileList]
        updatedList.splice(fileList.indexOf(f), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    

    const wrapperRef = useRef(null)
    const onDragEnter = ()=>{
        wrapperRef.current.classList.add('dragover')
    }
    const onDragLeave = ()=>{
        wrapperRef.current.classList.remove('dragover')
    }
    const onDrop = ()=>{
        wrapperRef.current.classList.remove('dragover')
    }

    return (
        <>
            <div ref={wrapperRef} className='drop-file-input' onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                <div className='drop-file-input__label'>
                    <img src={uploadImage} alt=""/>
                    <p>
                        Drag & Drop your files here
                    </p>
                    <input type="file" value="" onChange={onFileDrop}/>
                </div>
            </div>
        {
            fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">
                        Ready to upload
                    </p>
                    {
                        fileList.map((item, index)=>(
                        <div key={index} className="drop-file-preview__item">
                            <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}  alt=""/>
                            <div className="drop-file-preview__item_info">
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span className="drop-file-preview__item_del" onClick={()=>{
                                fileRemove(item)
                            }}>
                                X
                            </span>
                            <button className='submit-button'  onClick={()=>{fileSizeChecker(item)}} >submit</button>
                        </div>
                            
                        ))
                        
                    }

                </div>
            ) : null 
        }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange:PropTypes.func
}

export default DropFileInput;