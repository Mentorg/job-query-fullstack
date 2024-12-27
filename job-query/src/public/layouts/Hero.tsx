import Navigation from "../components/Navigation";
import SearchJobForm from "../components/SearchJobForm";

function Hero() {
  return (
    <header className="hero h-[75dvh] border-b border-b-slate-100 md:h-[50dvh] landscape:h-[100dvh] lg:landscape:h-[75dvh] 2xl:landscape:h-[50dvh]">
      <Navigation />
      <div className="h-full pt-[4.5rem]">
        <div className="flex h-full flex-col items-center justify-center px-2">
          <p className="text-base font-medium text-slate-600 lg:text-lg">
            Empowering Your Career Growth
          </p>
          <h1 className="my-4 flex flex-col text-center text-3xl font-medium text-primary md:text-4xl lg:text-5xl xl:leading-[4rem]">
            Discover Exceptional{" "}
            <span className="text-black">
              Remote Job Opportunities & Talent
            </span>
          </h1>
          <p className="my-4 text-center text-base text-slate-600 lg:text-lg">
            Explore jobs in Technology, Marketing, Finance, and more
          </p>
          <SearchJobForm />
        </div>
      </div>
    </header>
  );
}

export default Hero;
