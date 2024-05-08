import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TravelDate from "../components/TravelDate";
import Calendar from "../components/Calendar";
import { destinations_details } from "../constants";
import { tour_types } from "../constants";
import { styles } from "../styles";

const Destinations = () => {
  const [showpick, setshowpick] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <Navbar isHome={false} />

      <div className={` ${styles.padding} ${styles.sectionHeadText} mt-14`}>
        Explore all things to do in #Destination
      </div>

      <div className="flex pl-4">
        <div className=" w-[20%] h-[25%] border   rounded-t-lg mt-[8%]">
          <div
            className={`${styles.padding} w-full h-[20%] text-[13px] flex flex-col gap-2 rounded-t-lg bg-[rgb(6,144,94)] text-white`}
          >
            <p className="text-center">When are You travelling?</p>
            <input
              className=" rounded-lg mx-auto "
              onClick={() => {
                setshowpick(!showpick);
              }}
            />
            {showpick ? (
              <div className="">
                {" "}
                <Calendar />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={`${styles.padding} w-full h-[80%] flex flex-col`}>
            <h6 className="py-5">Tour Type</h6>
            <ul>
              {tour_types.map((item, index) => (
                <li>
                  <div className="flex items-center mb-4">
                    <input
                      key={index}
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100  rounded-lg   focus:outline-none"
                    />
                    <label
                      form="default-checkbox"
                      className="ms-2 text-sm font-medium "
                    >
                      {item}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-[70%] pl-8 pt-6 flex flex-col gap-3">
          <div className="w-full flex items-center text-[10px] text-slate-700 h-[50px] justify-between">
            <p>1362 results</p>
            <p>Sort by: Featured</p>
          </div>
          {destinations_details.map((item, index) => (
            <TravelDate
              key={index}
              img={item.img}
              location={item.location}
              title={item.title}
              rating={item.rating}
              noOfResponse={item.noOfResponse}
              description={item.description}
              note={item.note}
              time={item.time}
              old_price={parseFloat(item.old_price)}
              price={parseFloat(item.price)}
            />
          ))}
          <div className="w-[60%] h-[50px] flex items-center justify-center mx-auto gap-6">
            {[1, 2, 3, 4, 5, "...", 20].map?.((item, index) => {
              return (
                <p
                  key={index}
                  className={`${
                    index === currentIndex ? styles.primaryBgColor : ""
                  } px-2 cursor-pointer rounded-full`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <Footer isContact={false} />
    </div>
  );
};
export default Destinations;