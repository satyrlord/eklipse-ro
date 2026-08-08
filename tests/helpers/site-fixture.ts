import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { renderCatalog } from "../../src/render-catalog.ts";

const template = await readFile(new URL("../../index.html", import.meta.url), "utf8");
export const html = renderCatalog(template);
export const document = new JSDOM(html).window.document;
export const cpanel = await readFile(new URL("../../.cpanel.yml", import.meta.url), "utf8");
export const htaccess = await readFile(new URL("../../public/.htaccess", import.meta.url), "utf8");
export const notFoundHtml = await readFile(new URL("../../public/404.html", import.meta.url), "utf8");
export const notFoundDocument = new JSDOM(notFoundHtml).window.document;

export function elements(node: Element | Document, name: string): Element[] {
  const matches = node.nodeName.toLowerCase() === name ? [node] : [];
  return matches.concat([...node.children].flatMap((child) => elements(child, name))) as Element[];
}

export function attribute(node: Element, name: string): string | undefined {
  return node.getAttribute(name) ?? undefined;
}

export function hasClass(node: Element, name: string): boolean {
  return node.classList.contains(name);
}

export function textContent(node: Element): string {
  return node.textContent ?? "";
}
