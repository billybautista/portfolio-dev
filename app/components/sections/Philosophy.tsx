"use client";
import { useTranslation } from "react-i18next";
import TextReveal from "../TextReveal";

const Philosophy = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding py-32">
      <div className="mx-auto max-w-4xl">
        <span className="section-label mb-6 block text-center">
          {t("philosophy.label", "Philosophy")}
        </span>
        <TextReveal
          type="words"
          className="text-center text-2xl font-medium leading-relaxed text-foreground-muted md:text-3xl lg:text-4xl"
        >
          {t(
            "philosophy.description",
            "From crafting fluid animations to architecting scalable databases, I build end-to-end solutions designed to make an impact. Every line of code, every interaction, every decision engineered to deliver results that matter."
          )}
        </TextReveal>
      </div>
    </section>
  );
};

export default Philosophy;
