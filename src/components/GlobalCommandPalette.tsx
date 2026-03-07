import React from "react";
import { Command as CommandMenu } from "cmdk";
import { Search } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type CommandGroup = "General" | "English" | "Math" | "Dev";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  to: string;
  group: CommandGroup;
  skill: "general" | "english" | "math" | "dev";
  tags: string[];
  game?: string;
  deck?: string;
}

interface GlobalCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "home",
    title: "Home",
    subtitle: "Overview and daily status",
    to: "/",
    group: "General",
    skill: "general",
    tags: ["dashboard", "start"],
  },
  {
    id: "daily-loop",
    title: "Daily Loop",
    subtitle: "Start focused daily session",
    to: "/daily-loop?autostart=1",
    group: "General",
    skill: "general",
    tags: ["routine", "focus", "session"],
  },
  {
    id: "stats",
    title: "Stats",
    subtitle: "Progress, streak and metrics",
    to: "/stats",
    group: "General",
    skill: "general",
    tags: ["analytics", "progress", "streak"],
  },
  {
    id: "content-curation",
    title: "Content Curation",
    subtitle: "Review, filter and reorder local batches",
    to: "/content-curation",
    group: "General",
    skill: "general",
    tags: ["ops", "curation", "content", "authoring"],
  },
  {
    id: "profile",
    title: "Profile",
    subtitle: "Avatar and personal settings",
    to: "/profile",
    group: "General",
    skill: "general",
    tags: ["account", "avatar", "settings"],
  },
  {
    id: "settings",
    title: "Settings",
    subtitle: "Preferences and backups",
    to: "/settings",
    group: "General",
    skill: "general",
    tags: ["preferences", "backup", "config"],
  },
  {
    id: "vault",
    title: "Vocabulary Vault",
    subtitle: "Review saved words",
    to: "/vault",
    group: "English",
    skill: "english",
    tags: ["vocabulary", "srs", "review"],
    game: "vault",
  },
  {
    id: "study-deck",
    title: "Study Deck",
    subtitle: "Guided practice deck",
    to: "/study",
    group: "English",
    skill: "english",
    tags: ["deck", "drills"],
    deck: "study_deck",
  },
  {
    id: "personal-scripts",
    title: "Personal Scripts",
    subtitle: "Interview and speaking scripts",
    to: "/personal",
    group: "English",
    skill: "english",
    tags: ["speaking", "interview", "scripts"],
  },
  {
    id: "speed-builder",
    title: "Speed Builder",
    subtitle: "Fast grammar and fluency rounds",
    to: "/speed-builder",
    group: "English",
    skill: "english",
    tags: ["game", "speed", "fluency"],
    game: "speed_builder",
  },
  {
    id: "error-hunter",
    title: "Error Hunter",
    subtitle: "Find and fix sentence mistakes",
    to: "/error-hunter",
    group: "English",
    skill: "english",
    tags: ["game", "grammar", "accuracy"],
    game: "error_hunter",
  },
  {
    id: "paraphrase-duel",
    title: "Paraphrase Duel",
    subtitle: "Practice rephrasing with constraints",
    to: "/paraphrase-duel",
    group: "English",
    skill: "english",
    tags: ["game", "paraphrase", "writing"],
    game: "paraphrase_duel",
  },
  {
    id: "collocation-sprint",
    title: "Collocation Sprint",
    subtitle: "Common collocations under time pressure",
    to: "/collocation-sprint",
    group: "English",
    skill: "english",
    tags: ["game", "collocations", "speed"],
    game: "collocation_sprint",
  },
  {
    id: "taboo-english",
    title: "Taboo English",
    subtitle: "Describe ideas without forbidden words",
    to: "/taboo-english",
    group: "English",
    skill: "english",
    tags: ["game", "speaking", "taboo"],
    game: "taboo_english",
  },
  {
    id: "sentence-transformer",
    title: "Sentence Transformer",
    subtitle: "Transform sentences by patterns",
    to: "/sentence-transformer",
    group: "English",
    skill: "english",
    tags: ["game", "transformations", "grammar"],
    game: "sentence_transformer",
  },
  {
    id: "math-overview",
    title: "Math",
    subtitle: "Math training modules",
    to: "/calculus",
    group: "Math",
    skill: "math",
    tags: ["math", "practice", "speed"],
  },
  {
    id: "math-quiz",
    title: "Math Quiz",
    subtitle: "Timed quiz mode",
    to: "/calculus?tab=game",
    group: "Math",
    skill: "math",
    tags: ["math", "quiz", "game"],
    game: "math_game",
  },
  {
    id: "study-docs",
    title: "Study Docs",
    subtitle: "Browse docs and knowledge files",
    to: "/docs",
    group: "Dev",
    skill: "dev",
    tags: ["docs", "knowledge", "reading"],
  },
  {
    id: "docs-quiz",
    title: "Docs Quiz",
    subtitle: "Quiz mode over docs content",
    to: "/docs?mode=quiz",
    group: "Dev",
    skill: "dev",
    tags: ["docs", "quiz", "game"],
    game: "study_docs_quiz",
  },
  {
    id: "docs-hunt",
    title: "Docs Hunt",
    subtitle: "Search and retrieve answers in docs",
    to: "/docs?mode=game",
    group: "Dev",
    skill: "dev",
    tags: ["docs", "hunt", "game"],
    game: "study_docs_game",
  },
  {
    id: "syntax-builder",
    title: "Syntax Builder",
    subtitle: "Code syntax drills",
    to: "/syntax-builder",
    group: "Dev",
    skill: "dev",
    tags: ["code", "syntax", "game"],
    game: "code_syntax_builder",
  },
  {
    id: "bug-hunter",
    title: "Bug Hunter",
    subtitle: "Find code issues quickly",
    to: "/bug-hunter",
    group: "Dev",
    skill: "dev",
    tags: ["code", "debugging", "game"],
    game: "code_bug_hunter",
  },
  {
    id: "diplomatic-reviewer",
    title: "Diplomatic Reviewer",
    subtitle: "Professional communication practice",
    to: "/diplomatic-reviewer",
    group: "Dev",
    skill: "dev",
    tags: ["communication", "review", "game"],
    game: "diplomatic_reviewer",
  },
  {
    id: "tech-hub",
    title: "Tech Hub",
    subtitle: "All tech decks and games",
    to: "/tech-hub",
    group: "Dev",
    skill: "dev",
    tags: ["tech", "decks", "hub"],
    deck: "tech_decks",
  },
  {
    id: "tech-flashcards",
    title: "Tech Flashcards Decks",
    subtitle: "Open deck selection for flashcards",
    to: "/tech-hub",
    group: "Dev",
    skill: "dev",
    tags: ["deck", "flashcards", "tech"],
    deck: "flashcards",
  },
  {
    id: "tech-trivia",
    title: "Tech Trivia Decks",
    subtitle: "Open deck selection for trivia sprint",
    to: "/tech-hub",
    group: "Dev",
    skill: "dev",
    tags: ["deck", "trivia", "tech"],
    deck: "trivia",
  },
  {
    id: "tech-boss",
    title: "Tech Boss Decks",
    subtitle: "Open deck selection for boss battle",
    to: "/tech-hub",
    group: "Dev",
    skill: "dev",
    tags: ["deck", "boss", "tech"],
    deck: "boss",
  },
];

const GROUP_ORDER: CommandGroup[] = ["General", "English", "Math", "Dev"];

const isTypingIntoField = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
};

const toHashRoute = (to: string) => {
  if (to.startsWith("#")) return to;
  return `#${to.startsWith("/") ? to : `/${to}`}`;
};

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({
  open,
  onOpenChange,
}) => {
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey
      ) {
        if (isTypingIntoField(event.target) && !open) return;
        event.preventDefault();
        onOpenChange(!open);
        return;
      }

      if (event.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const groupedItems = React.useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: COMMAND_ITEMS.filter((item) => item.group === group),
    })).filter((entry) => entry.items.length > 0);
  }, []);

  const shortcutLabel =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
      ? "⌘K"
      : "Ctrl+K";

  return (
    <CommandMenu.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global command palette"
      overlayClassName="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm"
      className="fixed left-1/2 top-[12%] z-[121] w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface-1 shadow-2xl"
    >
      <DialogPrimitive.Title className="sr-only">
        Global command palette
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Search routes by skill, tag, game or deck and navigate quickly.
      </DialogPrimitive.Description>
      <div className="flex items-center gap-2 border-b border-border px-3">
        <Search className="h-4 w-4 shrink-0 text-text-muted" />
        <CommandMenu.Input
          className="h-12 w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          placeholder="Buscar por skill, tag, game o deck..."
          aria-label="Search command"
        />
        <kbd className="rounded border border-border bg-surface-2 px-2 py-1 text-[11px] font-bold text-text-secondary">
          {shortcutLabel}
        </kbd>
      </div>
      <CommandMenu.List className="max-h-[60vh] overflow-y-auto p-2">
        <CommandMenu.Empty className="p-4 text-sm text-text-secondary">
          No se encontraron resultados.
        </CommandMenu.Empty>

        {groupedItems.map(({ group, items }) => (
          <CommandMenu.Group
            key={group}
            heading={group}
            className="mb-2 rounded-lg px-2 py-1 text-xs font-bold text-text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
          >
            {items.map((item) => {
              const keywords = [
                item.skill,
                item.game || "",
                item.deck || "",
                ...item.tags,
              ];

              return (
                <CommandMenu.Item
                  key={item.id}
                  value={`${item.title} ${item.subtitle} ${item.to}`}
                  keywords={keywords}
                  onSelect={() => {
                    onOpenChange(false);
                    if (typeof window !== "undefined") {
                      window.location.hash = toHashRoute(item.to);
                    }
                  }}
                  className="mb-1 flex cursor-pointer items-start justify-between rounded-lg px-3 py-2 text-sm outline-none data-[selected=true]:bg-surface-2 data-[selected=true]:text-text-primary"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-text-primary">{item.title}</p>
                    <p className="truncate text-xs text-text-secondary">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="ml-3 flex shrink-0 items-center gap-1">
                    <span className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold uppercase text-text-muted">
                      {item.skill}
                    </span>
                    {(item.deck || item.game) && (
                      <span className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-text-muted">
                        {item.deck ?? item.game}
                      </span>
                    )}
                  </div>
                </CommandMenu.Item>
              );
            })}
          </CommandMenu.Group>
        ))}
      </CommandMenu.List>
      <div className="border-t border-border px-3 py-2 text-xs text-text-muted">
        Tip: escribe skill (`english`, `math`, `dev`) o tags como `deck`, `quiz`,
        `game`.
      </div>
    </CommandMenu.Dialog>
  );
};
