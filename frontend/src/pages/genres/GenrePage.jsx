import Navbar from "../../components/navbar/Navbar";
import GenreResults from "../../components/GenreResults";

const GenrePage = () => {
  return (
    <div>
      <Navbar />
      <div className="sm:h-[60px]" />
      <GenreResults />
    </div>
  );
};

export default GenrePage;
