export const APP = {
  name: "Code Roaster",
  version: "v2.0",
  edition: "Desi Edition",
  tagline: "Paste your code. Pick your roast. Get humbled. Get the fix.",
  eyebrow: "CODE BOL RAHA HAI · मला वाचवा! 🔥",
} as const;

export const AI = {
  model: "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Halka 🌶️",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Tikha 🌶️🌶️",
    description: "Pointed and witty. Calls out every mistake directly.",
  },
  {
    id: "savage",
    label: "Zanzanit 🔥🌶️💥",
    description: "Maximum burn. Brutally honest, Marathi/Hinglish style.",
  },
] as const;

export const PERSONAS = [
  { id: "standup", label: "Stand-up Roaster 🎙️" },
  { id: "techlead", label: "Tech Lead Chacha 👴" },
  { id: "intern", label: "Sarcastic Intern 🧢" },
  { id: "architect", label: "Kothrud Senior Architect ☕" },
] as const;

export const LANGUAGES = [
  { id: "python",     label: "Python",     extension: "py"   },
  { id: "javascript", label: "JavaScript", extension: "js"   },
  { id: "typescript", label: "TypeScript", extension: "ts"   },
  { id: "java",       label: "Java",       extension: "java" },
  { id: "c",          label: "C",          extension: "c"    },
  { id: "cpp",        label: "C++",        extension: "cpp"  },
  { id: "go",         label: "Go",         extension: "go"   },
  { id: "rust",       label: "Rust",       extension: "rs"   },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "sharp",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const ROTATING_LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai... ☕",
  "Bhau, roast tayyar ho raha hai... 🔥",
  "Sharma ji ke bete se comparison chal raha hai... 📊",
  "Evaluating computational sins and architectural purity... 💀",
  "Panchavati Express se bhi late hai tumhara loop... 🚂",
] as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_devfest_swag(attendee_list, tshirt_stock):
    # Nashik DevFest 2026: Critical swag allocation logic
    allocated = {}
    for i in range(0, len(attendee_list) + 1):  # Bug: Off-by-one error
        dev = attendee_list[i]
        if tshirt_stock == None:
            raise Exception("Arey devaa! Stock is None!")
        
        if dev.get("has_ticket") == True:
            allocated[dev["name"]] = tshirt_stock.pop()
        else:
            # Silent pass, what could go wrong?
            pass

    return allocated

attendees = [{"name": "Aarav", "has_ticket": True}]
stock = ["XL", "L"]
print(calculate_devfest_swag(attendees, stock))
`,
  errorMessage: `Traceback (most recent call last):
  File "solution.py", line 5, in calculate_devfest_swag
    dev = attendee_list[i]
IndexError: list index out of range`,
} as const;
