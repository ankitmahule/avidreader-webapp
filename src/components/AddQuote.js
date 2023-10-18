import "../scss/addquote.scss";
import ProfilePic from "./ProfilePic";
const AddQuote = () => {
  return (
    <>
      <section className="add-quote flex">
        <ProfilePic />
        <div className="quote-input relative flex-1">
          <textarea
            placeholder="Add your favorite quote, excerpt etc."
            className="quotes-text"
          ></textarea>
          <div className="absolute w-[100%]">
            <ul className="flex justify-between items-center">
              <li>
                <em className="fa fa-image text-xl"></em>
              </li>
              <li>
                <button className="btn btn-small mt-2">Post</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddQuote;
