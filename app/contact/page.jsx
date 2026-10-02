import { ArrowUpRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Get in touch",
  description:
    "Questions, ideas, collaborations, or just hello: open the conversation with margin.",
};

export default function ContactPage() {
  return (
    <section className="container-site grid gap-14 pb-20 pt-16 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:pb-28 md:pt-24 lg:gap-28">
      <div>
        <p className="eyebrow mb-6">The door is open</p>
        <h1 className="font-display text-[clamp(3.2rem,7vw,6.4rem)] leading-[1.03] tracking-[-0.06em]">
          Let&apos;s make <em className="text-accent">something</em> good.
        </h1>
        <p className="mt-8 max-w-sm text-lg leading-9 text-muted">
          An idea to explore? A thoughtful question? Or just want to say hello?
          There&apos;s always room for a good conversation.
        </p>
        <div className="mt-12 border-t border-line pt-8">
          <p className="eyebrow mb-4">Elsewhere on the internet</p>
          <div className="flex flex-col items-start gap-4 text-sm font-bold">
            {site.email ? (
              <a
                className="inline-flex items-center gap-2 hover:text-accent"
                href={`mailto:${site.email}`}
              >
                <EnvelopeIcon className="h-5 w-5" />
                {site.email}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-muted">
                <EnvelopeIcon className="h-5 w-5" />
                Say hello using the form
              </span>
            )}
            {site.github && (
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                GitHub <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                LinkedIn <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="self-start rounded-[24px] border border-line bg-white p-6 shadow-soft sm:p-9 lg:p-12">
        <div className="mb-9">
          <p className="eyebrow mb-3">Send a note</p>
          <h2 className="font-display text-[38px] leading-tight tracking-tight">
            What&apos;s on your mind?
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Fill in a few details and let the conversation begin.
          </p>
        </div>
        <ContactForm recipient={site.email} />
      </div>
    </section>
  );
}
