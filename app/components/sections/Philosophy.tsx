import TextReveal from "../TextReveal";

const Philosophy = () => {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="w-full transition-colors duration-300">
        <TextReveal
          type="words"
          className="font-light text-zinc-600 dark:text-zinc-400 text-2xl md:text-4xl"
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
