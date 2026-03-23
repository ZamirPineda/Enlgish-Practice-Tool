import React, { useMemo } from "react";
import { Globe2, Landmark, Tags, Volume2 } from "lucide-react";
import SlideOver from "@/components/ui/SlideOver";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CountryMapPreview from "@/components/game/CountryMapPreview";
import { SrsVocabularyItem } from "@/types";
import {
  getCountryReferenceByCapital,
  getCountryReferenceByName,
  getNeighborReferences,
} from "@/lib/geographyReference";

interface VaultItemInspectorProps {
  item: SrsVocabularyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayWord: (word: string) => void;
}

const VaultItemInspector: React.FC<VaultItemInspectorProps> = ({
  item,
  isOpen,
  onClose,
  onPlayWord,
}) => {
  const categoryTags = useMemo(
    () => new Set((item?.tags || []).map((tag) => tag.trim()).filter(Boolean)),
    [item],
  );

  const geographyReference = useMemo(() => {
    if (!item) return null;
    if (categoryTags.has("Countries")) {
      return getCountryReferenceByName(item.word);
    }
    if (categoryTags.has("Capitals")) {
      return getCountryReferenceByCapital(item.word);
    }
    return null;
  }, [item, categoryTags]);

  const neighborReferences = useMemo(
    () =>
      geographyReference
        ? getNeighborReferences(geographyReference.canonicalCountry)
        : [],
    [geographyReference],
  );

  if (!item) return null;

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      title={item.word}
      description={`Detailed vault view for ${item.word}`}
    >
      <div className="space-y-5">
        <div className="rounded-[1.5rem] border border-border bg-surface-2/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-text-muted">
                Vault Entry
              </div>
              <div className="mt-2 text-3xl font-black text-text-primary">
                {item.word}
              </div>
            </div>
            <Button
              onClick={() => onPlayWord(item.word)}
              variant="secondary"
              className="shrink-0"
            >
              <span className="inline-flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Listen
              </span>
            </Button>
          </div>

          {item.partOfSpeech ? (
            <div className="mt-3">
              <Badge className="uppercase">{item.partOfSpeech}</Badge>
            </div>
          ) : null}

          <div className="mt-4 whitespace-pre-line text-sm leading-6 text-text-secondary">
            {item.definition}
          </div>
        </div>

        {geographyReference ? (
          <CountryMapPreview
            reference={geographyReference}
            title={
              categoryTags.has("Capitals")
                ? "Capital Geography"
                : "Country Geography"
            }
            subtitle={
              categoryTags.has("Capitals")
                ? `${item.word} belongs to ${geographyReference.canonicalCountry}`
                : geographyReference.capitalName
                  ? `Capital: ${geographyReference.capitalName}`
                  : undefined
            }
          />
        ) : null}

        {geographyReference ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border bg-surface-2/60 p-4">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                <Globe2 className="h-4 w-4" />
                Geography Notes
              </div>
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                <div>
                  <span className="font-bold text-text-primary">Country:</span>{" "}
                  {geographyReference.canonicalCountry}
                </div>
                {geographyReference.countryTranslation ? (
                  <div>
                    <span className="font-bold text-text-primary">
                      Spanish:
                    </span>{" "}
                    {geographyReference.countryTranslation}
                  </div>
                ) : null}
                {geographyReference.capitalName ? (
                  <div>
                    <span className="font-bold text-text-primary">
                      Capital:
                    </span>{" "}
                    {geographyReference.capitalName}
                  </div>
                ) : null}
                {geographyReference.capitalTranslation ? (
                  <div>
                    <span className="font-bold text-text-primary">
                      Capital ES:
                    </span>{" "}
                    {geographyReference.capitalTranslation}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-surface-2/60 p-4">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                <Landmark className="h-4 w-4" />
                Neighbor Countries
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {neighborReferences.length > 0 ? (
                  neighborReferences.map((neighbor) => (
                    <span
                      key={neighbor.canonicalCountry}
                      className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-medium text-text-primary"
                    >
                      {neighbor.canonicalCountry}
                    </span>
                  ))
                ) : (
                  <div className="text-sm text-text-secondary">
                    No land borders in the shared reference.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {item.example || item.originalContext ? (
          <div className="rounded-[1.5rem] border border-border bg-surface-2/60 p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
              Context
            </div>
            {item.example ? (
              <div className="mt-3 text-sm leading-6 text-text-primary">
                {item.example}
              </div>
            ) : null}
            {item.originalContext ? (
              <div className="mt-3 text-sm leading-6 text-text-secondary">
                {item.originalContext}
              </div>
            ) : null}
          </div>
        ) : null}

        {item.tags && item.tags.length > 0 ? (
          <div className="rounded-[1.5rem] border border-border bg-surface-2/60 p-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
              <Tags className="h-4 w-4" />
              Tags
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SlideOver>
  );
};

export default VaultItemInspector;
