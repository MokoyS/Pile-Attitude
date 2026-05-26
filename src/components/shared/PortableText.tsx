import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-pile-dark font-inter leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-cormorant text-3xl italic text-pile-dark">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-cormorant text-2xl italic text-pile-dark">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-pile-violet pl-6 italic text-pile-muted my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-pile-dark">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-pile-dark">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="font-inter">{children}</li>,
    number: ({ children }) => <li className="font-inter">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-pile-violet underline hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
