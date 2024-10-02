import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "Fitness Tracker App",
    content: "Track your Fitness ",
    destination: "/",
    buttonLabel: "Try now!",
  };

  return (
    <>
      <Banner data={data} />
      {/* <FeaturedProducts /> */}
      {/* <Highlights /> */}
    </>
  );
}
