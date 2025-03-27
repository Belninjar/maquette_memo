// useStoriesLoader.js
import { useEffect, useState } from 'react';

// Ceci détecte tous les fichiers story.txt dans src/assets/** 
const storyFiles = import.meta.glob('/src/assets/**/story.txt', { as: 'raw' });

export default function useStoriesLoader() {
  const [stories, setStories] = useState([]); 

  useEffect(() => {
    async function loadAllStories() {
      const entries = Object.entries(storyFiles); // [ [path, function], [path2, function2], ... ]
      const promises = entries.map(async ([path, importFn]) => {
        const rawText = await importFn();
        // Ex: path = "/src/assets/story1/story.txt"
        // On peut extraire l'ID de l'histoire (story1)
        const match = path.match(/assets\/(.*?)\//);
        const storyId = match ? match[1] : 'unknown';

        // Parser le texte => { cover: "...", image1_text: "...", ... }
        const parsed = parseStoryText(rawText);

        return {
          storyId,
          textData: parsed,
        };
      });

      const result = await Promise.all(promises);
      setStories(result);
    }

    loadAllStories();
  }, []);

  return stories;
}

// parseStoryText: parse le contenu de story.txt
function parseStoryText(rawText) {
  // On split par lignes
  // On cherche "cover:" / "imageX_text:" etc.
  const lines = rawText.split('\n');
  let currentKey = null;
  const data = {};

  lines.forEach(line => {
    const trimmed = line.trim();
    // Si la ligne se termine par ":", c'est un nouveau bloc
    if (trimmed.match(/^(cover|image\d+_text):$/)) {
      currentKey = trimmed.replace(':', ''); // ex: "cover" ou "image1_text"
      data[currentKey] = '';
    } else if (currentKey) {
      // Ajouter la ligne au bloc actuel
      if (data[currentKey].length > 0) {
        data[currentKey] += '\n' + line;
      } else {
        data[currentKey] = line;
      }
    }
  });

  return data;
}
