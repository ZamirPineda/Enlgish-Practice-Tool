import os
import csv
import json

csv_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'csv')
output_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'techDecks.ts')

decks = []

for filename in os.listdir(csv_dir):
    if filename.endswith('.csv'):
        deck_id = filename.replace('.csv', '')
        # Formatear el nombre: 'spring_ai' -> 'Spring Ai', 'modern_arch' -> 'Modern Arch'
        deck_name = ' '.join(word.capitalize() for word in deck_id.split('_'))
        
        cards = []
        filepath = os.path.join(csv_dir, filename)
        
        def read_csv_with_encoding(enc):
            local_cards = []
            with open(filepath, 'r', encoding=enc) as f:
                reader = csv.reader(f)
                for row in reader:
                    if not row: continue
                    # Handle optional header
                    if row[0].lower().strip() == 'prompt':
                        continue
                    if len(row) >= 2:
                        prompt = str(row[0]).strip()
                        answer = str(row[1]).strip()
                        if prompt and answer:
                            local_cards.append({
                                'prompt': prompt,
                                'answer': answer
                            })
            return local_cards

        try:
            cards = read_csv_with_encoding('utf-8-sig')
        except UnicodeDecodeError:
            try:
                cards = read_csv_with_encoding('utf-16')
            except UnicodeDecodeError:
                cards = read_csv_with_encoding('latin-1')

        if cards:
            decks.append({
                'id': deck_id,
                'name': deck_name,
                'cards': cards
            })

ts_content = """export interface TechCard {
  prompt: string;
  answer: string;
}

export interface TechDeck {
  id: string;
  name: string;
  cards: TechCard[];
}

export const techDecks: TechDeck[] = """

ts_content += json.dumps(decks, ensure_ascii=False, indent=2) + ";\n"

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated techDecks.ts with {len(decks)} decks and {sum(len(d['cards']) for d in decks)} total cards.")
