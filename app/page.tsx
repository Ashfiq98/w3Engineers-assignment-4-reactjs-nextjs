import Amenities from "./components/Amenities";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import QuestionCard from "./components/QuestionCard";
import Subheader from "./components/Subheader";

export default function Home() {
  return (
    <>
      <Navbar />
      <Subheader />
      <Header />
      <Pagination />
      <Amenities />
      <QuestionCard/>
    </>
  );

}
