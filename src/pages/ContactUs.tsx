import { heroBg } from "../assets";
import Navbar from "../components/Navbar";
import { styles } from "../styles";
import { useState, useRef } from "react";

import { SectionWrapper } from "../hoc";

import ReachOut from "../components/ReachOut";
import WhyTour from "../components/WhyTour";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import EarthCanvas from "../components/canvas/Earth";
import { slideIn } from "../utils/motion";
import { motion } from "framer-motion";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    branch: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <>
      <Navbar isHome={true} />
      <div className="h-[480px] w-full relative ">
        <img src={heroBg} alt="bg" className="w-full h-full object-cover" />
        <p
          className={`${styles.primaryBgColor} px-3 py-2 text-white absolute bottom-0 left-5 rounded-t-lg`}
        >
          Connect with us
        </p>
      </div>

      <div className=" flex justify-between p-8 w-[70%] mx-auto">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-[60%] mt-12 flex flex-col gap-3"
        >
          <div className="flex gap-3">
            <label className="flex flex-col">
              <span className=" font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary border border-slate-200  text-white rounded-lg outline-none  font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className=" font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary border border-slate-200  text-white rounded-lg outline-none  font-medium"
              />
            </label>
          </div>
          <label className="flex flex-col">
            <span className=" font-medium mb-4">Select Branch</span>
            <select
              className="p-2 border border-slate-200 cursor-pointer rounded-md shadow-sm shadow-slate-300 mb-2 placeholder:text-[10px] sm:placeholder:text-[12px]"
              onChange={handleChange}
              value={form.branch}
            >
              <option value="">Select branch</option>
              <option value="Nepal">Nepal</option>
              <option value="UAE">UAE</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className=" font-medium mb-4">Your subject</span>
            <input
              type="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's your subject?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary border border-slate-200  text-white rounded-lg outline-none  font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className=" font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="py-4 px-6 placeholder:text-secondary  rounded-lg outline-none border border-slate-200 font-medium"
            />
          </label>

          {/* Submit button */}
          <button
            type="submit"
            className={`${styles.primaryBgColor} py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary text-white`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <div className="w-[30%] h-[80%]  my-auto p-4 rounded-3xl justify-around flex flex-col items-center gap-3">
          {/* EarthCanvas section */}

          <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="">
            <EarthCanvas />
          </motion.div>

          <div className="w-full h-[40%]  justify-between items-center  gap-3 flex flex-col">
            <p className="tet-[13px]">Follow us on</p>
            <div className="flex w-full h-[50%] justify-center gap-6">
              <FaFacebook className="text-blue-600 text-3xl cursor-pointer" />
              <FaWhatsapp className="text-green-600 text-3xl cursor-pointer" />
              <FaInstagram className="text-pink-500 text-3xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <WhyTour />
      <ReachOut />
      <Gallery />
      <Footer isContact={false} />
    </>
  );
};
export default SectionWrapper(ContactUs);