import { Benefits } from "../Components/Benefits";
import Faq from "../Components/Faq";
import { Footer } from "../Components/Footer";
import { Hero } from "../Components/Hero";
import { Navbar } from "../Components/Navbar";
import { Testimonials } from "../Components/Testimonials";

function Landing() {
  return (
    <div className="bg-gray-800">
      <Navbar />
      <div className=" mt-16">
        <Hero />
      </div>
      <div className=" pt-24">
        <Benefits />
      </div>
      <div className=" pt-28">
        <Testimonials />
      </div>
      <div className=" pt-28">
        <Faq />
      </div>
      <div className=" pt-24">
        <Footer />
      </div>
    </div>
  );
}
export default Landing;
