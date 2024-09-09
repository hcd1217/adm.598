import { matchSorter } from "match-sorter";

export function fuzzySearchMultipleWords(
  rows: Record<string, unknown>[], // array of data [{a: "a", b: "b"}, {a: "c", b: "d"}]
  keys: string[], // keys to search ["a", "b"]
  filterValue: string[],
) {
  if (!filterValue || !filterValue.length) {
    return rows;
  }
  const terms = filterValue;
  if (!terms) {
    return rows;
  }
  // reduceRight will mean sorting is done by score for the _first_ entered word.
  const validSearchTerms = terms.filter(
    (term) => term && term.toString().trim(),
  );
  return validSearchTerms.reduceRight(
    // threshold: matchSorter.rankings.ACRONYM
    (results, term) => matchSorter(results, term, { keys, threshold: matchSorter.rankings.EQUAL }),
    rows,
  );
}
