import TextReveal from "../TextReveal";

const aboutText = `
  I am a Full Stack Engineer with 4 years of experience, specializing
  in the JavaScript ecosystem. I build scalable backends with Nest.js
  and TypeScript, modern frontends with React and Next.js, and mobile
  applications using React Native.
`;

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
          {aboutText}
        </TextReveal>
      </div>
    </section>
  );
};

export default About;
