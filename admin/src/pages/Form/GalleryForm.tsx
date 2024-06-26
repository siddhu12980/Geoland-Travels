import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";

const GalleryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location?.state?.image;
  const [formData, setFormData] = useState({
    title: image?.title || "",
    img: image?.img || "",
  });
  const [img, setImg] = useState(null as File | null);
  const [dataSaved, setDataSaved] = useState(false);
  const currentUser = useRecoilValue(currUser);

  const handleSubmit = async () => {
    console.log("Submission started");
    if (img) {
      const storageRef = ref(storage, "some-child/" + img.name);
      try {
        await uploadBytes(storageRef, img);

        const downloadURL = await getDownloadURL(storageRef);

        if (image?.id) {
          const galleryRef = doc(db, "gallery", image?.id);
          await setDoc(galleryRef, {
            title: formData?.title,
            img: downloadURL,
            date: serverTimestamp(),
          });
          console.log("updated successfully");
          navigate("/gallery");
        } else {
          const galleryRef = collection(db, "gallery");

          const docRef = await addDoc(galleryRef, {
            title: formData?.title,
            img: downloadURL,
            date: serverTimestamp(),
          });
          console.log(docRef.id);
          setFormData({
            title: "",
            img: "",
          });
        }
        setDataSaved(true);

        setTimeout(() => setDataSaved(false), 3000);
      } catch (error: any) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }

    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: formData?.title,
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Gallery",
      user: currentUser?.name,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
    console.log("file is selected");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="FAQ's" />
      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/gallery"> Go to Gallery</NavLink>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {dataSaved && (
            <div className="w-full h-[60px] bg-[#06905E]  mb-2 flex items-center justify-center rounded-lg">
              Data Uploaded Successfully !!
            </div>
          )}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  value={formData?.title}
                  name="title"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Title Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach Image
                </label>

                <input
                  onChange={handleFileChange}
                  type="file"
                  className={` w-full rounded-lg border-[1.5px]    border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:border-form-strokedark  dark:bg-form-input   dark:text-white`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-40  items-center justify-evenly">
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 tracking-wide text-white font-bold py-2 px-9 rounded opacity-80  shadow-1"
                >
                  <span className="tracking-wider px-3">Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GalleryForm;
