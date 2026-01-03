import TextReveal from "../TextReveal";

const philosophy = `
    From crafting fluid animations to architecting scalable databases, I
    build end-to-end solutions designed to make an impact. Every line of
    code, every interaction, every decision engineered to deliver
    results that matter.
`;

const Philosophy = () => {
  return (
    <section className="section-padding py-32">
      <div className="mx-auto max-w-4xl">
        <span className="section-label mb-6 block text-center">Philosophy</span>
        <TextReveal
          type="words"
          className="text-center text-2xl font-medium leading-relaxed text-foreground-muted md:text-3xl lg:text-4xl"
        >
          {philosophy}
        </TextReveal>
      </div>
    </section>
  );
};

export default Philosophy;
