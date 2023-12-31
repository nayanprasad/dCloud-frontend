"use client"
import React, {Fragment, useEffect, useState} from 'react';
import styles from './favourites.module.css';
import Navbar from "../../components/Navbar/Navbar";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";
import Menu from "@/components/Menu/Menu";
import Modal from "@/components/Preview/preview";

function FavoritesLayout() {

    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const handleFileClick = (file) => {
        setFile(file);
        setModalOpen(true);
    }

    useEffect(() => {
        fetch(`${baseUrl}api/files/favorites`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                    setData(data)
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }, [])

    return (
        <Fragment>
            <Navbar/>
            <div className={styles.container}>
                {modalOpen && <Modal file={file} setOpenModal={setModalOpen} />}
                <div className={styles['main-content']}>
                    <div className={styles['search-bar']}onClick={() => router.push("/search")} >
                        <input className={styles['search-input']} placeholder="Search" disabled={true}/>
                    </div>

                    <div className={styles.favorites}>
                        <p className={styles['favorites-font']}>Favorites</p>
                        <button className={styles.pic}>
                            <img src="mycloud/camera.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Pictures</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.image} files</p>
                            </div>
                        </button>
                        <button className={styles.doc}>
                            <img src="mycloud/documents.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Documents</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.document} files</p>
                            </div>
                        </button>
                        <button className={styles.vid}>
                            <img src="mycloud/video.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Videos</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.video} files</p>
                            </div>
                        </button>
                        <button className={`${styles.aud}`}>
                            <img src="mycloud/audio.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Audio</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.audio} files</p>
                            </div>
                        </button>
                        <button className={`${styles.other}`}>
                            <img src="mycloud/others.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Others</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.other} files</p>
                            </div>
                        </button>
                    </div>

                    <div className={styles.files}>
                        {data?.files?.length > 0
                            ? <p className={styles.sharedfilesfont}>Files</p>
                            : <p className={styles.sharedfilesfont}>No files found</p> }
                        {data?.files?.map((file, index) => (
                            <button key={index} className={styles['files-buttons']} title={file.name}>
                                {file.type === "image" && <img src={file.url} alt="Profile Photo" style={{cursor: "pointer"}}
                                      onClick={() => handleFileClick(file)}/>}
                                {file.type === "video" && <img src="mycloud/video.png" alt="Profile Photo" style={{cursor: "pointer"}}
                                        onClick={() => handleFileClick(file)}/>}
                                {file.type === "audio" && <img src="mycloud/audio.png" alt="Profile Photo" style={{cursor: "pointer"}}
                                        onClick={() => handleFileClick(file)}/>}
                                {file.type === "document" && <img src="mycloud/documents.png" alt="Profile Photo" style={{cursor: "pointer"}}
                                        onClick={() => handleFileClick(file)}/>}
                                {file.type === "other" && <img src="mycloud/others.png" alt="Profile Photo" style={{cursor: "pointer"}}
                                        onClick={() => handleFileClick(file)}/>}
                                <div style={{display: "flex"}}>
                                    <p className={styles.filename}>{file.name.slice(0, 13)}... </p>
                                    <Menu cid={file.cid}
                                          id={file._id}
                                          isFavorite={file.isFavorite}
                                          downloadMenu={true}
                                          shareMenu={true}
                                          deleteMenu={true}
                                          favoriteMenu={true}
                                    />
                                </div>

                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default FavoritesLayout;
