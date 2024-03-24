import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AutoComplete, Button, Checkbox, DatePicker, Select, Steps, theme } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";


const CreateProject = () => {
    const navigate = useNavigate();
    const [formCreateProject, setFormCretaeProject] = useState({
        name: "",
        projectIdType: "",
        projectImage: "",
        designerId: "",
        designerDate: "",
        constructionDate: "",
        userCode: "",
        designerName: "",
        catalog: "",
        categoriesAdd: "",
        description: "",
        projectTypeNew: ""
    });

    const [listCategory, setListCategory] = useState([]);

    const [titleStep, setTitleStep] = useState("Create new Project")


    const [checkNewProject, setCheckNewProject] = useState(false);

    const onChangeCheckBox = (e) => {
        const dataOld = { ...formCreateProject }
        if (e.target.checked) {
            dataOld.projectIdType = "";
        } else {
            dataOld.projectTypeNew = "";
        }
        setFormCretaeProject(dataOld);
        setCheckNewProject(e.target.checked);
    };

    console.log(formCreateProject)

    const onChangeSelect = (data, name) => {
        const dataNew = {
            ...formCreateProject,
            [name]: data,
        };
        console.log("dataNew == ", dataNew);
        setFormCretaeProject(dataNew);
    };


    const onChangeValueInput = (data, name) => {
        const dataOle = {
            ...formCreateProject,
            [name]: data,
        };
        setFormCretaeProject(dataOle)
    };

    const onChangeDate = (value, name) => {
        const dataOle = {
            ...formCreateProject,
            [name]: value,
        };
        setFormCretaeProject(dataOle)
    };


    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the file input click when the button is clicked
        fileInputRef.current.click();
    };

    const handleCVChange = (event) => {
        const filesList = event.target.files;
        for (let i = 0; i < filesList.length; i++) {
            console.log(`file${i + 1}`, filesList[i]);
        }

        const listDataOle = [...listCategory];
        listDataOle[isActive].images = event.target.files;
        setListCategory(listDataOle);
    };


    const [listProjectType, setListProjectType] = useState([])

    useEffect(() => {
        async function getAll() {
            try {
                const dataRes = await instance.get("/get_project_type");
                const dataList = dataRes.data.data.listProjectType;
                const dataSet = [];
                for (let index = 0; index < dataList.length; index++) {
                    const objectPush = {
                        value: dataList[index]._id,
                        label: dataList[index].nameProjectType
                    }
                    dataSet.push(objectPush);
                }
                setListProjectType(dataSet);
                if (dataSet.length < 1) {
                    setCheckNewProject(true)
                }

            } catch (error) {
                if (error.response.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                } else if (error.response.status === 401) {
                    return toast.error(error.response.data.message)
                }
                else if (error.response.status === 403) {
                    return toast.error(error.response.data.message)
                } else {
                    return toast.error("Server error")
                }

            }

        }

        getAll()
    }, [])

    const checkCode = async () => {
        const dataCheck = {
            userCode: formCreateProject.userCode
        }
        const dataRes = await instance.post("/check_design", dataCheck);
        const dataFind = dataRes.data.data.data;
        if (!dataFind?.fullName) {
            return toast.error("Khong ton tai design code")
        } else {
            const dataOle = {
                ...formCreateProject,
                "designerName": dataFind.fullName,
                "designerId": dataFind._id
            };
            setFormCretaeProject(dataOle)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        fileInputRef.current.value = "";

        if (file) {
            const dataOle = {
                ...formCreateProject,
                "projectImage": file,
            };
            setFormCretaeProject(dataOle)
        }


    };

    const addCategorys = () => {

        const cateName = formCreateProject.categoriesAdd
        if (cateName.length < 1) {
            return toast.error("Vui long nhap categories")
        }
        const dataOle = [...listCategory];
        dataOle.push({
            categoriesName: cateName,
            images: [],
        })
        setListCategory(dataOle)
    }

    const DeleteIconCategor = (vt) => {
        const dataOle = [...listCategory];
        const dataFilter = dataOle.filter((e, index) => index != vt);
        setListCategory(dataFilter)
    }


    const [isActive, setIsActive] = useState(0)

    const isActiveUpload = (index) => {
        setIsActive(index)
    }

    const handleButtonClickClearImage = () => {
        const dataOle = [...listCategory];
        dataOle[isActive].images = []
        setListCategory(dataOle)
    }

    const uploadDataCreateProject = async () => {
        // upload images
        let dataResIdType = ""
        try {
            if (formCreateProject.projectTypeNew.length > 0) {
                const data = {
                    nameProjectType: formCreateProject.projectTypeNew
                }
                dataResIdType = await instance.post("/post_project_type", data);
            }
            let listCategoriesCustom = [];
            for (let i = 0; i < listCategory.length; i++) {
                console.log(3333333, listCategory[i].images)
                let imagesList = listCategory[i].images;
                let formDataFile = new FormData();
                let dataImage = []
                for (let y = 0; y < imagesList?.length; y++) {
                    formDataFile.append('files', imagesList[y]);
                }

                const res = await instance.post("/upload--multi-file", formDataFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                let imagesRes = res.data.fileNames;
                for (let k = 0; k < imagesRes?.length; k++) {
                    dataImage.push(imagesRes[k]?.filename)
                }


                console.log(dataImage)

                listCategoriesCustom.push({
                    categoriesName: listCategory[i].categoriesName,
                    images: dataImage
                })
            }


            let formDataFileOne = new FormData();
            formDataFileOne.append('file', formCreateProject.projectImage);
            const resOneFile = await instance.post("/upload-file", formDataFileOne, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            let listData = {}
            if (formCreateProject.projectTypeNew.length > 0) {
                listData = {
                    ...formCreateProject,
                    listCategory: listCategoriesCustom,
                    projectImage: resOneFile.data.filename,
                    projectIdType: dataResIdType.data.data.id
                }
            } else {
                listData = {
                    ...formCreateProject,
                    listCategory: listCategoriesCustom,
                    projectImage: resOneFile.data.filename,
                }
            }

            await instance.post("/create_project", listData);
            toast.success("Tao thanh cong")
            // return navigate('/project-list')
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                console.log(error.response)
                return toast.error(error.response.data.message)
            } else if (error.response.status === 403) {
                return toast.error(error.response.data.message)
            } else {
                return toast.error("Server error")
            }
        }

    }

    const steps = [
        {
            title: "",
            content: (
                <div
                    className="flex items-center justify-center m-auto"
                    style={{ width: 600 }}
                >
                    <div className="py-10">
                        <div className="flex items-center ">
                            <AutoComplete
                                style={{ width: 250, height: 35, marginRight: 100 }}
                                onChange={(data) => onChangeValueInput(data, "name")}
                                value={formCreateProject.name}
                                placeholder="Project Name"
                                name="name"
                            />

                            <div className="flex">
                                <button className="button-upload-images"
                                    onClick={handleButtonClick}>Chọn file</button>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {formCreateProject.projectImage && <p className="flex justify-center items-center pl-5">{formCreateProject.projectImage.name}</p>}
                            </div>
                        </div>

                        <div className="flex mt-10">
                            <Checkbox onChange={onChangeCheckBox} checked={checkNewProject}>
                                Thêm mới Project Type
                            </Checkbox>
                        </div>

                        <div className="cunstom_project_type" style={{ marginTop: 30 }}>
                            <div className="flex items-center justify-center">
                                <Select
                                    name="projectType"
                                    value={formCreateProject.projectIdType}
                                    style={{ width: 250, marginRight: 100 }}
                                    onChange={(data) => onChangeSelect(data, "projectIdType")}
                                    options={listProjectType}
                                    disabled={checkNewProject}
                                />

                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(data) => onChangeValueInput(data, "projectTypeNew")}
                                    name="projectTypeNew"
                                    value={formCreateProject.projectTypeNew}
                                    placeholder="Project Type New"
                                    disabled={!checkNewProject}
                                />
                            </div>
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <DatePicker
                                onChange={(data) => onChangeDate(data, "designerDate")}

                                value={formCreateProject.designerDate}
                                placeholder="Design date"
                            />
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <DatePicker
                                onChange={(data) => onChangeDate(data, "constructionDate")}
                                value={formCreateProject.constructionDate}
                                placeholder="Construction date"
                            />
                        </div>

                        <div className="flex" style={{ marginTop: 30 }}>
                            <AutoComplete
                                style={{ width: 250, height: 35, marginRight: 100 }}
                                onChange={(data) => onChangeValueInput(data, "userCode")}
                                value={formCreateProject.userCode}
                                placeholder="Design by "
                            />
                            <div>
                                <button
                                    className="button-upload-images"
                                    onClick={checkCode}
                                >
                                    Check
                                </button>
                            </div>
                        </div>

                        <div className="customByCode" style={{ marginTop: 30 }}>
                            {(formCreateProject.designerName.length < 1 || formCreateProject.userCode.length < 1) ? <p className="text-red-600">Khong tim thay design code</p> : <p className="text-2xl font-bold">  Designer: {formCreateProject.designerName}</p>}

                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex m-auto">
                    <div className="m-auto">
                        <div
                            style={{ height: 50 }}
                            className="text-4xl  mb-10 mt-7 text-black font-bold"
                        >
                            {" "}
                            Categories​{" "}
                        </div>
                        <div className="flex">
                            <div className="block_left_category">
                                <div className="h-96 overflow-auto">
                                    {
                                        listCategory.map((e, vt) => {
                                            return (
                                                <div className="flex">
                                                    <div className={isActive === vt ? "item_categorys cursor-pointer" : "item_categorysNo cursor-pointer"} onClick={() => isActiveUpload(vt)}>
                                                        {e.categoriesName}
                                                    </div>
                                                    <div className="ml-5 mt-2">
                                                        <DeleteIcon
                                                            onClick={() => DeleteIconCategor(vt)}
                                                            className="cursor-pointer"
                                                            sx={{ color: "#683737" }}
                                                        ></DeleteIcon> </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex">
                                    <AutoComplete
                                        style={{ width: 300, height: 35, paddingRight: 50 }}
                                        onChange={(value) => onChangeValueInput(value, "categoriesAdd")}
                                        name="categoriesAdd"
                                        value={formCreateProject.categoriesAdd}
                                        placeholder="Thêm Categories​"
                                    />
                                </div>
                                <div className="flex">
                                    <AddCircleIcon className="cursor-pointer mt-4" onClick={addCategorys} />
                                </div>
                            </div>

                            <div className="block_right_category pl-10 pb-16">
                                <div className="pb-10">
                                    {
                                        listCategory.length > 0 && <button
                                            className="button-upload-images add-images"
                                            onClick={handleButtonClick}
                                        >
                                            Add Images
                                        </button>
                                    }

                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleCVChange}
                                        multiple
                                    />
                                </div>

                                <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                                    {listCategory[isActive]?.images?.length > 0 &&
                                        [...listCategory[isActive].images].map((image, imageIndex) => {

                                            return (
                                                <ImageListItem key={`${isActive}-${imageIndex}`}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        style={{ width: 200, height: 200, padding: 5 }}
                                                        loading="lazy"
                                                        alt={`Image ${imageIndex}`}
                                                    />
                                                </ImageListItem>
                                            )
                                        })}
                                </ImageList>

                                <button className="button-upload-images" onClick={handleButtonClickClearImage}>Clear All Images</button>

                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex justify-center p-10">
                    <div>
                        <div className="flex justify-center items-center">
                            <div className="pr-5">
                                Add Catalogue (Link)
                            </div>
                            <div>
                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(value) => onChangeValueInput(value, "catalog")}
                                    name="catalog"
                                    value={formCreateProject.catalog}
                                    placeholder="Thêm Link Categories​"
                                />
                            </div>

                        </div>

                        <div className="flex justify-center items-center mt-10 pl-15">
                            <div className="pr-5">
                                Phản hồi
                            </div>
                            <div>
                                <AutoComplete
                                    style={{ width: 300, height: 35, paddingRight: 50 }}
                                    onChange={(value) => onChangeValueInput(value, "description")}
                                    name="description"
                                    value={formCreateProject.description}
                                    placeholder="Phản hồi"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            ),
        },
        {
            title: "",
            content: (
                <div className="flex m-auto">
                    <div className="m-auto">
                        <div>
                            <p style={{ height: 50 }}
                                className="text-4xl  mb-10 mt-7 text-black font-bold">{formCreateProject.name}</p>
                            <div className="flex">
                                <div className="block_left_category">

                                    <div className="h-96 overflow-auto">
                                        {
                                            listCategory.map((e, vt) => {
                                                return (
                                                    <div className="flex">
                                                        <div className={isActive === vt ? "item_categorys cursor-pointer" : "item_categorysNo cursor-pointer"} onClick={() => isActiveUpload(vt)}>
                                                            {e.categoriesName}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="text-black "> Design date : </div>
                                        <div className="text-black ">  {dayjs(formCreateProject.designerDate).format('YYYY/DD/MM')}   </div>

                                    </div>
                                    <div className="flex justify-between mt-10">
                                        <div className="text-black ">  Construction date : </div>
                                        <div className="text-black ">   {dayjs(formCreateProject.constructionDate).format('YYYY/DD/MM')}</div>
                                    </div>

                                </div>

                                <div className="block_right_category pl-10 pb-16">
                                    <div className="pb-10">
                                        <a
                                            className="button-upload-images"
                                            href={formCreateProject.catalog}
                                            target="_blank"
                                        >
                                            Catalog
                                        </a>

                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleCVChange}
                                            multiple
                                        />
                                    </div>

                                    <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                                        {listCategory[isActive]?.images?.length > 0 &&
                                            [...listCategory[isActive].images].map((image, imageIndex) => {

                                                return (
                                                    <ImageListItem key={`${isActive}-${imageIndex}`}>
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            style={{ width: 200, height: 200, padding: 5 }}
                                                            loading="lazy"
                                                            alt={`Image ${imageIndex}`}
                                                        />
                                                    </ImageListItem>
                                                )
                                            })}
                                    </ImageList>

                                </div>
                            </div>
                        </div>

                        <div className="text-2xl  mb-10 mt-7 text-black font-bold"> Design by  {formCreateProject.designerName} </div>

                    </div>
                </div>
            ),
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = async () => {

        let check = current + 1
        if (check === 1) {
            setTitleStep("Add Category")
            const dataCheck = {
                userCode: formCreateProject.userCode
            }
            const dataRes = await instance.post("/check_design", dataCheck);
            const dataFind = dataRes.data.data.data;
            if (!dataFind?.fullName) {
                return toast.error("Khong ton tai design ")
            } else {
                const dataOle = {
                    ...formCreateProject,
                    "designerName": dataFind.fullName,
                    "designerId": dataFind._id
                };
                setFormCretaeProject(dataOle)
            }
            if (dataFind?.fullName < 1) {
                return toast.error("Khong ton tai design")
            }

            if (formCreateProject.projectIdType.length < 1) {
                if (formCreateProject.projectTypeNew.length < 1) {
                    return toast.error("Project Type chưa có")
                }
            }

            if (formCreateProject.projectTypeNew.length < 1) {
                if (formCreateProject.projectIdType.length < 1) {
                    return toast.error("Project Type chưa có")
                }
            }


        } else if (check === 2) {
            setTitleStep("Add catalogue")
        } else if (check === 3) {
            setTitleStep("Last confirm update")
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        let check = current - 1;

        setCurrent(current - 1);
        if (check === 1) {
            setTitleStep("Add Category")
        } else if (check === 2) {
            setTitleStep("Add catalogue")
        } else if (check === 0) {
            setTitleStep("Create new Project")
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle = {
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className="px-56">
            <ToastContainer />
            <div className="flex text-4xl  mt-5 text-black font-bold items-center justify-center mb-10">
                {titleStep}
            </div>
            <Steps current={current} items={items} className="custom_step" />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{ marginTop: 24, marginBottom: 30 }}
                className="custom-button-step"
            >
                {current < steps.length - 1 && (
                    <Button onClick={() => next()} className="buttonNext">
                        Next
                    </Button>
                )}

                {current === steps.length - 1 && (
                    <Button
                        className="buttonNext"

                        onClick={uploadDataCreateProject}
                    >
                        Confirm
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Back
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateProject;
