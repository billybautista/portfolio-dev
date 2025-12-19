import TextReveal from "../TextReveal";

const About = () => {
  return (
    <section
      id="about"
      className="section-padding flex items-center py-32 min-h-[60vh]"
    >
      <div className="w-full max-w-5xl">
        <span className="section-label mb-6 block">About Me</span>
        <TextReveal
          type="words"
          className="font-display text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl"
        >
          I am a full-stack developer with 4 years of experience building
          robust web applications. I specialize in the JavaScript ecosystem,
          leveraging Node.js and TypeScript to create scalable backends, and
          React with Next.js for highly interactive frontends.
        </TextReveal>
      </div>
    </section>
  );
};

export default About;
