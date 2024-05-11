import { AiOutlineSearch } from "react-icons/ai";
import { heroBg } from "../assets";
import { styles } from "../styles";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { TourData, toursData } from "../store";
import { useRecoilValue } from "recoil";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchResult, setSearchResult] = useState<TourData[]>([]);
  const tours = useRecoilValue(toursData);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    if (searchQuery.trim() !== "") {
      const searchResults = tours.filter((t: TourData) =>
        t?.tourTitle?.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      setSearchResult(searchResults);
    }
    setClicked(true);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== "") {
      const searchResults = tours.filter((t: TourData) =>
        t?.tourTitle.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      setSearchResult(searchResults);
      console.log(searchResult);
    }
    setClicked(true);
  };

  return (
    <div
      className="h-[580px] w-full relative mt-14"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-full h-full z-10 absolute  opacity-10" />
      <div className="w-full h-full absolute z-20 flex items-center justify-center flex-col ">
        <div className="w-full h-[50%] flex items-center justify-center flex-col gap-3">
          <p className="w-[45%] text-center text-[45px] text-white font-semibold">
            Choose a Destination For Your Next Adventure?
          </p>
          <p className="text-[14px] font-light text-white tracking-wider">
            From local escapes to far-flung adventures
          </p>
          <div className="w-[30%] items-center justify-around h-[20%] rounded-full bg-white flex">
            <IoLocationOutline className="text-3xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-[70%] px-2 py-2  focus:outline-none rounded-md placeholder:text-[13px]"
              placeholder="Search destination"
            />
            <div
              onClick={handleSearchButtonClick}
              className={`${styles.primaryBgColor} rounded-full flex items-center justify-center w-[40px] cursor-pointer h-[40px]`}
            >
              <AiOutlineSearch className="text-white text-2xl" />
            </div>
          </div>
          {clicked &&
            (searchResult?.length > 0 ? (
              <div
                ref={boxRef}
                className="w-[30%] rounded-b-md absolute z-50  right-[35%] top-[61%] h-auto"
              >
                {searchResult?.map((s, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full  cursor-pointer h-auto p-3 bg-slate-200 border-b border-slate-300 flex items-center justify-center ${
                        i === searchResult?.length - 1 ? "rounded-b-lg" : ""
                      }`}
                    >
                      <p
                        onClick={() =>
                          navigate("/destination", { state: { tour: s } })
                        }
                      >
                        {s?.tourTitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                ref={boxRef}
                className="w-[30%] bg-slate-200 absolute z-50  flex items-center justify-center  h-[50px] right-[35%] top-[61%] rounded-b-lg"
              >
                "No results found"
              </div>
            ))}
        </div>
        <div className="w-[60%] h-[20%] flex items-end justify-between">
          {["Nature", "Adventure", "Culture", "Food", "City", "Cruise"].map(
            (e, i) => {
              return (
                <button
                  key={i}
                  onClick={() =>
                    navigate("/destination", {
                      state: { key: "category", value: e },
                    })
                  }
                  className="text-white bg-opacity-10 hover:bg-opacity-40 bg-slate-100 rounded-full w-[100px] py-2"
                >
                  {e}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
export default Hero;
