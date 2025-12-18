const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center px-6 md:px-12 h-screen"
    >
      {/* Background Blob - Single distinct entity */}
      <div className="z-0 absolute inset-0 flex justify-center items-center w-full h-full overflow-hidden pointer-events-none">
        <div className="bg-blue-500/50 dark:bg-blue-600/40 opacity-100 blur-[50px] md:blur-[80px] rounded-full w-[300px] md:w-[400px] h-[300px] md:h-[400px] transition-colors duration-300 moving-blob"></div>
      </div>

      <div className="z-10 relative flex flex-col justify-center pb-20 h-full">
        {/* Main Heading */}
        <h1 className="mb-8 font-bold text-black dark:text-white text-6xl md:text-8xl lg:text-9xl leading-[1.05] tracking-tighter">
          <div className="py-2 overflow-hidden">
            <span className="inline-block font-serif text-[#0a192f] dark:text-white italic hero-text">
              Billy Bautista
            </span>
          </div>
          <div className="py-1 overflow-hidden">
            <span className="inline-block font-medium text-zinc-600 dark:text-zinc-400 text-4xl md:text-5xl lg:text-6xl tracking-tight hero-text">
              Software Engineer
            </span>
          </div>
        </h1>

        {/* Description */}
        <div className="max-w-2xl font-light text-zinc-600 dark:text-zinc-400 text-lg md:text-xl lg:text-2xl leading-relaxed hero-sub">
          <p>
            I m a software engineer with a passion for building web applications
            that are fast, efficient, and user-friendly.
          </p>
        </div>
      </div>

      {/* Custom Mouse Scroll Indicator - Monochrome */}
    </section>
  );
};
export default Hero;
