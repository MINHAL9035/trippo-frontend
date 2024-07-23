import NavBar from "@/components/User/NavBar";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const HomeScreen = () => {
  return (
    <>
      <NavBar />
      <div className="h-screen flex mt-28 justify-center">
        <div>
          <GradualSpacing
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-[-0.1em] sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
            text="From dreams to destination"
          />
          <GradualSpacing
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-[-0.1em] sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
            text="Create unforgettable Memories"
          />
          <GradualSpacing
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-[-0.1em] sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
            text="Plan effortlessly!"
          />
        </div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </>
  );
};

export default HomeScreen;
