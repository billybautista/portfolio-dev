import TextReveal from "../TextReveal";

const About = () => {
  return (
    <div>
      <section
        id="about"
        className="flex items-center px-6 md:px-12 py-20 min-h-[50vh]"
      >
        <div className="w-full">
          <p className="mb-8 font-mono text-zinc-500 text-sm uppercase tracking-widest">
            About Me
          </p>
          <TextReveal
            type="words"
            className="font-normal text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight"
          >
            I am a full-stack developer with 4 years of experience building
            robust web applications. I specialize in the JavaScript ecosystem,
            leveraging Node.js and TypeScript to create scalable backends, and
            React with Next.js for highly interactive frontends.
          </TextReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
