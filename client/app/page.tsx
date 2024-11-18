import Amenities from "./components/Amenities";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import QuestionCard from "./components/QuestionCard";
import RulesAndInfo from "./components/RulesAndInfo";
import Subheader from "./components/Subheader";
import Test from "./components/Test";

export default function Home() {
  return (
    <>
      <Navbar />
      <Subheader />
      {/* for testing api */}
      <Test/>
      {/* for testing api */}
      <Header />
      <Pagination />
      <Amenities />
      <QuestionCard/>
      <RulesAndInfo/>
      <Footer/>
    </>
  );

}
