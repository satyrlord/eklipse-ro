import { readFile } from "node:fs/promises";
import { parse } from "parse5";

export const html = await readFile(new URL("../../index.html", import.meta.url), "utf8");
export const document = parse(html);
export const htaccess = await readFile(new URL("../../public/.htaccess", import.meta.url), "utf8");
export const notFoundHtml = await readFile(new URL("../../public/404.html", import.meta.url), "utf8");
export const notFoundDocument = parse(notFoundHtml);

export function elements(node, name) {
  const matches = node.nodeName === name ? [node] : [];
  return matches.concat((node.childNodes ?? []).flatMap((child) => elements(child, name)));
}

export function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

export function hasClass(node, name) {
  return (attribute(node, "class") ?? "").split(/\s+/).includes(name);
}

export function textContent(node) {
  if (node.nodeName === "#text") {
    return node.value;
  }

  return (node.childNodes ?? []).map((child) => textContent(child)).join("");
}
