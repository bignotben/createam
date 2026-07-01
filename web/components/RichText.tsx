import type { ReactNode } from "react";

type LexicalNode = {
  type: string;
  tag?: string;
  text?: string;
  format?: number | string;
  children?: LexicalNode[];
  fields?: { url?: string; newTab?: boolean };
};

type LexicalRoot = {
  root?: { children?: LexicalNode[] };
};

const TEXT_FORMAT = {
  bold: 1,
  italic: 2,
  strikethrough: 4,
  underline: 8,
  code: 16,
};

function renderText(node: LexicalNode, key: number): ReactNode {
  const format = typeof node.format === "number" ? node.format : 0;
  let content: ReactNode = node.text ?? "";
  if (format & TEXT_FORMAT.code) content = <code key={key}>{content}</code>;
  if (format & TEXT_FORMAT.bold) content = <strong>{content}</strong>;
  if (format & TEXT_FORMAT.italic) content = <em>{content}</em>;
  if (format & TEXT_FORMAT.underline) content = <u>{content}</u>;
  if (format & TEXT_FORMAT.strikethrough) content = <s>{content}</s>;
  return <span key={key}>{content}</span>;
}

function renderChildren(children: LexicalNode[] | undefined): ReactNode {
  if (!children) return null;
  return children.map((child, i) => renderNode(child, i));
}

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node, key);
    case "linebreak":
      return <br key={key} />;
    case "paragraph":
      return (
        <p key={key} className="text-[19px] leading-[1.65] text-ink-soft">
          {renderChildren(node.children)}
        </p>
      );
    case "heading": {
      const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag
          key={key}
          className="mt-10 mb-4 font-semibold tracking-[-0.02em] text-ink first:mt-0"
        >
          {renderChildren(node.children)}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote
          key={key}
          className="my-8 border-l-2 border-accent pl-6 text-xl italic text-ink-soft"
        >
          {renderChildren(node.children)}
        </blockquote>
      );
    case "list": {
      const ListTag = node.tag === "ol" ? "ol" : "ul";
      return (
        <ListTag key={key} className="my-4 list-outside pl-6 text-[19px] leading-[1.65] text-ink-soft">
          {renderChildren(node.children)}
        </ListTag>
      );
    }
    case "listitem":
      return (
        <li key={key} className="mb-2">
          {renderChildren(node.children)}
        </li>
      );
    case "link":
      return (
        <a
          key={key}
          href={node.fields?.url ?? "#"}
          target={node.fields?.newTab ? "_blank" : undefined}
          rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
          className="text-ink underline decoration-accent underline-offset-2"
        >
          {renderChildren(node.children)}
        </a>
      );
    default:
      return renderChildren(node.children);
  }
}

export function RichText({ content, className }: { content: unknown; className?: string }) {
  const root = (content as LexicalRoot | undefined)?.root;
  if (!root?.children?.length) return null;
  return <div className={className}>{renderChildren(root.children)}</div>;
}

function collectText(nodes: LexicalNode[] | undefined, out: string[]) {
  if (!nodes) return;
  for (const node of nodes) {
    if (node.type === "text" && node.text) out.push(node.text);
    if (node.children) collectText(node.children, out);
  }
}

export function extractPlainText(content: unknown): string {
  const root = (content as LexicalRoot | undefined)?.root;
  const out: string[] = [];
  collectText(root?.children, out);
  return out.join(" ");
}
