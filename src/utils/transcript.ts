const devanagariVowels: Record<string, string> = {
  '\u0905': 'a', '\u0906': 'aa', '\u0907': 'i', '\u0908': 'ee', '\u0909': 'u',
  '\u090A': 'oo', '\u090B': 'ri', '\u090F': 'e', '\u0910': 'ai',
  '\u0913': 'o', '\u0914': 'au'
};

const devanagariMatras: Record<string, string> = {
  '\u093E': 'aa', '\u093F': 'i', '\u0940': 'ee', '\u0941': 'u', '\u0942': 'oo',
  '\u0943': 'ri', '\u0947': 'e', '\u0948': 'ai', '\u094B': 'o', '\u094C': 'au'
};

const devanagariConsonants: Record<string, string> = {
  '\u0915': 'k', '\u0916': 'kh', '\u0917': 'g', '\u0918': 'gh', '\u0919': 'ng',
  '\u091A': 'ch', '\u091B': 'chh', '\u091C': 'j', '\u091D': 'jh', '\u091E': 'ny',
  '\u091F': 't', '\u0920': 'th', '\u0921': 'd', '\u0922': 'dh', '\u0923': 'n',
  '\u0924': 't', '\u0925': 'th', '\u0926': 'd', '\u0927': 'dh', '\u0928': 'n',
  '\u092A': 'p', '\u092B': 'ph', '\u092C': 'b', '\u092D': 'bh', '\u092E': 'm',
  '\u092F': 'y', '\u0930': 'r', '\u0932': 'l', '\u0935': 'v', '\u0936': 'sh',
  '\u0937': 'sh', '\u0938': 's', '\u0939': 'h', '\u095C': 'r', '\u095D': 'rh',
  '\u0958': 'q', '\u0959': 'kh', '\u095A': 'gh', '\u095B': 'z', '\u095E': 'f'
};

const romanUrduWords: Record<string, string> = {
  '\u092E\u0947\u0930\u093E': 'mera',
  '\u092E\u0947\u0930\u0940': 'meri',
  '\u092E\u0947\u0930\u0947': 'mere',
  '\u0928\u093E\u092E': 'naam',
  '\u0939\u0948': 'hai',
  '\u0939\u0948\u0902': 'hain',
  '\u0915\u094D\u092F\u093E': 'kya',
  '\u092E\u0941\u091D\u0947': 'mujhe',
  '\u0906\u092A': 'aap',
  '\u0906\u092A\u0915\u093E': 'aapka',
  '\u0905\u091A\u094D\u091B\u093E': 'acha',
  '\u0915\u0947': 'ke',
  '\u0915\u0940': 'ki',
  '\u0915\u093F\u0938': 'kis',
  '\u0924\u0930\u0939': 'tarah',
  '\u092C\u093E\u0930\u0947': 'baare',
  '\u092E\u0947\u0902': 'mein',
  '\u092C\u0924\u093E\u090F\u0902\u0917\u0947': 'batayenge',
  '\u091C\u093E\u0924\u0940': 'jati',
  '\u0915\u0930': 'kar',
  '\u0915\u0930\u0928\u093E': 'karna',
  '\u0915\u0930\u0928\u0940': 'karni',
  '\u0938\u0915\u0924\u0947': 'sakte',
  '\u0938\u0915\u0924\u0940': 'sakti',
  '\u091A\u093E\u0939\u093F\u090F': 'chahiye',
  '\u092B\u094B\u0928': 'phone',
  '\u0928\u0902\u092C\u0930': 'number',
  '\u0908\u092E\u0947\u0932': 'email',
  '\u0928\u0940\u091A\u0947': 'neeche',
  '\u092D\u0930\u0947\u0902': 'bharen',
  '\u0932\u093F\u0916\u0947\u0902': 'likhen',
  '\u092E\u094B\u0939\u092E\u094D\u092E\u0926': 'muhammad',
  '\u092E\u0941\u0939\u092E\u094D\u092E\u0926': 'muhammad',
  '\u0916\u0941\u0930\u094D\u0930\u092E': 'khurram'
};

const transliterateDevanagariWord = (word: string) => {
  if (romanUrduWords[word]) return romanUrduWords[word];

  let output = '';
  for (let index = 0; index < word.length; index++) {
    const char = word[index];
    const next = word[index + 1];

    if (devanagariVowels[char]) {
      output += devanagariVowels[char];
      continue;
    }

    if (devanagariConsonants[char]) {
      output += devanagariConsonants[char];
      if (next === '\u094D') {
        index++;
      } else if (devanagariMatras[next]) {
        output += devanagariMatras[next];
        index++;
      } else {
        output += 'a';
      }
      continue;
    }

    if (char === '\u0902' || char === '\u0901') {
      output += 'n';
      continue;
    }

    if (char === '\u0903') {
      output += 'h';
      continue;
    }

    if (char === '\u093C') continue;
    output += devanagariMatras[char] ?? char;
  }

  return output
    .replace(/aa\b/g, 'a')
    .replace(/([a-z]{4,})a\b/g, '$1');
};

export const formatTranscriptText = (text: string) => {
  return String(text || '')
    .replace(/\[(?:happy|sad|excited|angry|neutral|surprised|confused|concerned|cheerful|calm|serious|playful|sympathetic|enthusiastic|disappointed|grateful|apologetic|confident|hesitant|curious|amused|relieved|frustrated|empathetic|warm|professional|urgent|gentle|assertive|thoughtful|hopeful|supportive|welcoming|reassuring)\]/gi, '')
    .replace(/[\u0900-\u097F]+/g, word => transliterateDevanagariWord(word))
    .replace(/\s+/g, ' ')
    .trim();
};
