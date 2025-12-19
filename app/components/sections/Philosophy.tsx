import TextReveal from "../TextReveal";

const Philosophy = () => {
  return (
    <section className="section-padding py-32">
      <div className="mx-auto max-w-4xl">
        <span className="section-label mb-6 block text-center">Philosophy</span>
        <TextReveal
          type="words"
          className="text-center text-2xl font-medium leading-relaxed text-foreground-muted md:text-3xl lg:text-4xl"
        >
          Every pixel matters. From the database schema in PostgreSQL to the
          animation frame in GSAP, I ensure every layer of the application is
          optimized for performance and experience.
        </TextReveal>
      </div>
    </section>
  );
};

export default Philosophy;
