import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { renderCatalog } from "../../src/render-catalog.mjs";

const template = await readFile(new URL("../../index.html", import.meta.url), "utf8");
export const html = renderCatalog(template);
export const document = new JSDOM(html).window.document;
export const cpanel = await readFile(new URL("../../.cpanel.yml", import.meta.url), "utf8");
export const htaccess = await readFile(new URL("../../public/.htaccess", import.meta.url), "utf8");
export const notFoundHtml = await readFile(new URL("../../public/404.html", import.meta.url), "utf8");
export const notFoundDocument = new JSDOM(notFoundHtml).window.document;

export function elements(node, name) {
  const matches = node.nodeName.toLowerCase() === name ? [node] : [];
  return matches.concat([...node.children].flatMap((child) => elements(child, name)));
}

export function attribute(node, name) {
  return node.getAttribute?.(name) ?? undefined;
}

export function hasClass(node, name) {
  return node.classList?.contains(name) ?? false;
}

export function textContent(node) {
  return node.textContent ?? "";
}
