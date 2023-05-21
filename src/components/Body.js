import "../scss/body.scss";
import useUsers from "../utils/useUsers";
import Login from "./Login";
const Body = () => {
  const users = useUsers([]);
  return !users ? null : (
    <main>
      <section className="upper-section">
        <section className="banner flex">
          <section className="container flex justify-evenly items-center">
            <section className="w-1/2 search-container">
              <h1 className="banner-heading">
                Quotes and Excerpts from Popular Books and People...
              </h1>
              {/* <div className="search-section">
              <input
                type="text"
                placeholder="So, what are your looking for today?"
                className="search-input text-slate-400 mt-12 text-2xl px-6 py-4"
              />
              <button className="bg-white search-button text-2xl p-4">
                <em className="fa fa-search"></em>
              </button>
            </div> */}
            </section>
            {/* <div className="divider"></div> */}
            <section className="w-1/2">
              <Login></Login>
            </section>
          </section>
        </section>
      </section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>
      <section className="h-96"></section>s
      {users.map((eachUser) => (
        <h1 key={eachUser._id}>{eachUser.name}</h1>
      ))}
    </main>
  );
};

export default Body;
