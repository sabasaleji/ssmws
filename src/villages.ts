// Single source of truth for the villages SSMWS serves across Sabarkantha.
// Reuse this anywhere a village list is needed (coverage map, form dropdowns)
// so the data never drifts out of sync.

export interface Village {
  id: string;
  en: string;
  gu: string;
}

export const VILLAGES: Village[] = [
  { id: 'Kesarpura', en: 'Kesarpura', gu: 'કેશરપુરા' },
  { id: 'Bolundra',  en: 'Bolundra',  gu: 'બોલુન્દ્રા' },
  { id: 'Virpur',    en: 'Virpur',    gu: 'વીરપુર' },
  { id: 'Nurpura',   en: 'Nurpura',   gu: 'નુરપુરા' },
  { id: 'Parabda',   en: 'Parabda',   gu: 'પરબડા' },
  { id: 'Ilol',      en: 'Ilol',      gu: 'ઈલોલ' },
  { id: 'Katwad',    en: 'Katwad',    gu: 'કાટવાડ' },
  { id: 'Satnagar',  en: 'Satnagar',  gu: 'સતનગર' },
  { id: 'Nawalpur',  en: 'Nawalpur',  gu: 'નવલપુર' },
  { id: 'Tajpuri',   en: 'Tajpuri',   gu: 'તાજપુરી' },
  { id: 'Mangadh',   en: 'Mangadh',   gu: 'માનગઢ' },
  { id: 'Gadha',     en: 'Gadha',     gu: 'ગઢા' },
  { id: 'Tejpura',   en: 'Tejpura',   gu: 'તેજપુરા' },
  { id: 'Lalpur',    en: 'Lalpur',    gu: 'લાલપુર' },
  { id: 'Panpur',    en: 'Panpur',    gu: 'પાણપુર' },
  { id: 'Kanai',     en: 'Kanai',     gu: 'કનાઈ' },
];
