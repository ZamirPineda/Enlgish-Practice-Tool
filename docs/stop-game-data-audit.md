# Stop Game Data Audit

Date: 2026-03-08

## Goal

Measure how much STOP data is actually useful for Vault cards, especially for:

- `translation`
- `definition`
- `example`
- `examSentence`
- `context`
- scene-level clue quality

## Command

```bash
pnpm audit:stop-data
```

This runs:

```bash
node scripts/analyze-stop-game-data.mjs
```

## Global Snapshot

Based on `32,061` STOP items:

- `translation`: `100.0%`
- `definition`: `28.3%`
- `strong definition`: `18.6%`
- `example`: `6.3%`
- `examSentence`: `16.3%`
- `context`: `0.0%`
- `scene clue` (`example` or `examSentence` or `context`): `22.6%`
- `vault ready` (`translation + strong definition + scene clue`): `15.3%`

## Completed Improvements

The first pass improved the three fastest high-impact files:

- [emphasis.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/emphasis.ts)
- [connectors.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/connectors.ts)
- [collocations.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/collocations.ts)

Result:

- `Emphasis`: `100.0%` strong definitions, `100.0%` Vault-ready
- `Connectors`: `98.2%` strong definitions, `98.2%` Vault-ready
- `Collocations`: `100.0%` strong definitions, `100.0%` Vault-ready

The second pass improved the next two high-value sources:

- [history.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/history.ts)
- [academic_ielts.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/academic_ielts.ts)

Result:

- `Historical Figures`: `99.8%` strong definitions, `100.0%` clue, `99.8%` Vault-ready
- `IELTS Trends`: `100.0%` strong definitions, `93.0%` Vault-ready

The third pass improved the geography sources:

- [cities.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/cities.ts)
- [capitals.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/capitals.ts)
- [countries.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/countries.ts)

Result:

- `Cities`: `100.0%` strong definitions, `100.0%` clue, `100.0%` Vault-ready
- `Capitals`: `100.0%` strong definitions, `100.0%` clue, `100.0%` Vault-ready
- `Countries`: `100.0%` strong definitions, `100.0%` clue, `100.0%` Vault-ready

All enrichment scripts used in these passes are now idempotent, so rerunning them does not keep inflating or duplicating the data.

## Main Conclusion

The main Vault bottleneck is not missing translations.

The real problems are:

1. Most categories still have no definition at all.
2. Even when a definition exists, many categories still have no scene clue.
3. `grammar_verbs` remains a special-case category because many entries only contain irregular forms, not real lexical meaning.

## Priority Attack Order

### 1. Quick wins already completed

- [emphasis.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/emphasis.ts)
- [connectors.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/connectors.ts)
- [collocations.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/collocations.ts)
- [academic_ielts.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/academic_ielts.ts)
- [history.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/history.ts)
- [cities.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/cities.ts)
- [capitals.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/capitals.ts)
- [countries.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/countries.ts)

### 2. Highest-value next step

- [grammar_verbs.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/grammar_verbs.ts)
- [landmarks.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/landmarks.ts)
- [daily_household.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/daily_household.ts)

Why these three:

- `grammar_verbs.ts` still has `43.4%` definitions and `34.2%` strong definitions, but `0%` clue and too many rows without real meaning data.
- `landmarks.ts` still has `47.1%` strong definitions but `0%` clue, so it is a clean clue-generation target.
- `daily_household.ts` is now showing up directly in the weak-definition sample set, so it is a good quality-cleanup target for definitions that already exist.

Important nuance:

- `grammar_verbs.ts` is not just a clue problem.
- Many rows only have `translation` or irregular forms like `Past: Began • Part: Begun`, so a useful Vault improvement there needs actual lexical meaning plus example sentences.

### 3. Structural backlog: large files with zero definition and zero clue

- [vocabulary_challenge.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/vocabulary_challenge.ts)
- [opposites.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/opposites.ts)
- [flora_and_geology.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/flora_and_geology.ts)
- [daily_occupations.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/daily_occupations.ts)
- [specialized_mythology.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/specialized_mythology.ts)
- [media_movies.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/media_movies.ts)
- [animals.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/animals.ts)
- [media_songs.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/media_songs.ts)
- [lifestyle_food_and_drinks.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/lifestyle_food_and_drinks.ts)

## Recommended Standard For A Vault-Friendly STOP Item

Minimal target:

- `translation`
- `definition`
- one scene clue: `example` or `examSentence` or `context`

Better target:

- `translation`
- `definition` that is not circular and not just a one-word synonym
- `example` or `examSentence`
- optional `transformation` or `synonyms`

## Examples Of Weak vs Better Data

Weak:

- `translation: "Amenazadoramente"`
- `definition: "Threateningly."`
- `examSentence: "Approached menacingly."`

Better:

- `translation: "Amenazadoramente"`
- `definition: "In a way that makes people feel danger or harm may come next."`
- `examSentence: "The dog moved toward us menacingly, baring its teeth."`

Weak:

- `translation: "Desertificación"`
- no definition
- no clue

Better:

- `translation: "Desertificación"`
- `definition: "The process in which fertile land becomes dry and starts turning into desert."`
- `examSentence: "Years of drought and poor farming caused desertification in the region."`

## Best Reference Files

These files are currently the closest to a Vault-friendly structure:

- [false_friends.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/false_friends.ts)
- [modal_verbs.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/modal_verbs.ts)
- [phrasal_verbs.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/phrasal_verbs.ts)
- [idioms.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/idioms.ts)
- [sounds_and_noise.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/definitions/sounds_and_noise.ts)

## Suggested Next Execution Step

Start with [grammar_verbs.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/grammar_verbs.ts). After that, attack [landmarks.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/landmarks.ts) for clue generation and [daily_household.ts](/C:/Users/zamir/Documents/Cdoc/Documents/github/Enlgish-Practice-Tool/src/features/data/stop_categories/daily_household.ts) for definition quality cleanup.

Reason:

- `grammar_verbs.ts` is still the clearest high-impact gap for Vault because it mixes missing meaning data with zero clue coverage.
- `landmarks.ts` is a clean clue-generation target that should improve Vault-ready coverage quickly.
- `daily_household.ts` is now the clearest definition-quality target among files that already contain definitions.
