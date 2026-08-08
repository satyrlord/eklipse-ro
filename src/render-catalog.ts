import { archiveReleaseLedger, archiveReleaseMarkup, currentReleaseLedger, currentReleaseMarkup } from "./release-catalog.ts";
import type { ArchiveReleaseLedgerEntry, ArchiveReleaseMarkup, CurrentReleaseLedgerEntry, CurrentReleaseMarkup } from "./release-catalog.ts";

const CURRENT_BEGIN = "<!-- release-sequence:begin -->";
const CURRENT_END = "<!-- release-sequence:end -->";
const ARCHIVE_BEGIN = "<!-- archive-track:begin -->";
const ARCHIVE_END = "<!-- archive-track:end -->";

function playerSource(release: CurrentReleaseLedgerEntry): string {
  return `https://bandcamp.com/EmbeddedPlayer/album=${release.playerId}/size=large/bgcol=080706/linkcol=ff6748/tracklist=false/artwork=none/transparent=true/`;
}

function renderCurrentRelease(release: CurrentReleaseLedgerEntry, markup: CurrentReleaseMarkup): string {
  return `          <article class="release-spread release-spread--${markup.slug}">
            <div class="release-visual">
              <a href="${release.href}" aria-label="${release.title} on Bandcamp">
                <img src="/assets/covers/${markup.cover}" alt="${markup.coverAlt ?? `${release.title} cover`}" width="${markup.coverWidth}" height="${markup.coverHeight}" decoding="async" loading="lazy" />
              </a>
            </div>
            <div class="release-copy">
              <time datetime="${release.datetime}">${markup.dateLabel}</time>
              <h3>${markup.heading}</h3>
              ${markup.description ? `${markup.description}\n              ` : ""}<iframe class="bandcamp-player" title="${release.title} by eklipse — Bandcamp album player" src="${playerSource(release)}" seamless loading="lazy"></iframe>
              <a class="release-link" href="${release.href}">Open album on Bandcamp <svg class="outbound-icon" aria-hidden="true"><use href="#arrow-out"></use></svg></a>
            </div>
          </article>`;
}

function renderArchiveRelease(release: ArchiveReleaseLedgerEntry, markup: ArchiveReleaseMarkup): string {
  return `          <article class="afterimage-release">
            <a href="${release.href}">
              <img src="/assets/covers/${markup.cover}" alt="${release.title} cover" width="${markup.coverWidth}" height="${markup.coverHeight}" decoding="async" loading="lazy" />
              <span><strong>${markup.heading}</strong><small class="archive-subtitle">${release.label}</small></span>
            </a>
          </article>`;
}

function renderReleaseSequence(): string {
  const articles = currentReleaseLedger.map((release) => {
    const markup = currentReleaseMarkup[release.title];
    if (!markup) {
      throw new Error(`Missing current-release markup for ${release.title}`);
    }
    return renderCurrentRelease(release, markup);
  });
  return `${CURRENT_BEGIN}\n${articles.join("\n\n")}\n          ${CURRENT_END}`;
}

function renderArchiveTrack(): string {
  const articles = archiveReleaseLedger.map((release) => {
    const markup = archiveReleaseMarkup[release.title];
    if (!markup) {
      throw new Error(`Missing archive-release markup for ${release.title}`);
    }
    return renderArchiveRelease(release, markup);
  });
  return `${ARCHIVE_BEGIN}\n${articles.join("\n")}\n          ${ARCHIVE_END}`;
}

function replaceRegion(source: string, begin: string, end: string, replacement: string, label: string): string {
  const beginIndex = source.indexOf(begin);
  const endIndex = source.indexOf(end);
  if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
    throw new Error(`index.html must contain one ${label} marker pair`);
  }
  return `${source.slice(0, beginIndex)}${replacement}${source.slice(endIndex + end.length)}`;
}

export function renderCatalog(source: string): string {
  const withSequence = replaceRegion(source, CURRENT_BEGIN, CURRENT_END, renderReleaseSequence(), "release-sequence");
  return replaceRegion(withSequence, ARCHIVE_BEGIN, ARCHIVE_END, renderArchiveTrack(), "archive-track");
}
