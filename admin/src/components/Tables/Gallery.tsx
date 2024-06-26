import { NavLink, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { MdDelete } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { currUser } from "../../pages/store";

interface ImageData {
  title: string;
  date: string;
  img: string;
  id: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const navigate = useNavigate();
  const [dataDeleted, setDataDeleted] = useState(false);
  const currentUser = useRecoilValue(currUser);

  useEffect(() => {
    const gotImages: ImageData[] = [];
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date;
        let dateObject = "";

        if (date instanceof Timestamp) {
          dateObject = date.toDate().toString().slice(0, 21);
          console.log("Date:", dateObject);
        } else {
          console.error("Invalid or missing date field:", date);
        }

        const f: ImageData = {
          title: doc?.data()?.title,
          date: dateObject,
          img: doc?.data()?.img,
          id: doc?.id,
        };
        gotImages.push(f);
      });
      setImages(gotImages);
    };

    fetchDocuments();
  }, []);

  const handleClick = async (id: string) => {
    const galleryRef = doc(db, "gallery", id);

    await deleteDoc(galleryRef);
    console.log("Deleted successfully");
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    setDataDeleted(true);
    setTimeout(() => {
      setDataDeleted(false);
    }, 3000);
    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
      title: "Gallery image deleted",
      role: currentUser?.role,
      date: serverTimestamp(),
      item: "Gallery",
      user: currentUser?.name,
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery" />

      <div className="flex justify-end py-2 ">
        <button className="bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
          <NavLink to="/forms/gallery-form"> Add New Image</NavLink>
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {dataDeleted && (
            <div className="w-full mx-auto h-[60px] opacity-70 bg-red-400 text-white  mb-2 flex items-center justify-center rounded-lg">
              Data Deleted Successfully !!
            </div>
          )}
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date & Time
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Update
                </th>
                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {image?.title}
                    </h5>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{image?.date}</p>
                  </td>
                  <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <button
                      onClick={() =>
                        navigate("/forms/gallery-form", {
                          state: { image: image },
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex justify-center items-center space-x-3.5">
                      <MdDelete
                        className="text-2xl text-red-400 cursor-pointer"
                        onClick={() => handleClick(image?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Gallery;
