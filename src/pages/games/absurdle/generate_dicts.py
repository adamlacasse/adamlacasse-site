import os
import json

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    google_path = os.path.join(base_dir, 'google-10000-all.txt')
    output_dir = os.path.join(base_dir, 'dicts')
    os.makedirs(output_dir, exist_ok=True)

    # 1. Load Google 10,000 wordlist
    google_words = set()
    if os.path.exists(google_path):
        with open(google_path, 'r') as f:
            for line in f:
                w = line.strip().upper()
                if w.isalpha():
                    google_words.add(w)
    else:
        print(f"Error: {google_path} not found.")
        return

    # 2. Load system dictionary
    system_words = set()
    system_dict_path = '/usr/share/dict/words'
    if os.path.exists(system_dict_path):
        with open(system_dict_path, 'r') as f:
            for line in f:
                w = line.strip()
                if w and w.isalpha():
                    # Keep if starts lowercase or is a known common word
                    if w[0].islower() or w.upper() in google_words:
                        system_words.add(w.upper())
    else:
        print(f"Warning: {system_dict_path} not found. Fallback to using google words only.")

    # 3. Generate JSON files for lengths 3 to 8
    for L in range(3, 9):
        targets = sorted(list({w for w in google_words if len(w) == L}))
        guesses = sorted(list({w for w in system_words if len(w) == L} | set(targets)))

        # Ensure targets contains only words that are also valid guesses
        targets = [w for w in targets if w in guesses]

        data = {
            "targets": targets,
            "guesses": guesses
        }

        output_path = os.path.join(output_dir, f'dict-{L}.json')
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Generated dict-{L}.json: {len(targets)} targets, {len(guesses)} guesses")

if __name__ == '__main__':
    main()
