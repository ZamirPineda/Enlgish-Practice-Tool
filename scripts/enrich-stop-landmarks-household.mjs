import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();

const TARGETS = [
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "landmarks.ts",
    ),
    kind: "landmark",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "daily_household.ts",
    ),
    kind: "household",
  },
];

const cleanLine = (value = "") => value.trim();
const stripTerminalPunctuation = (value = "") =>
  cleanLine(value).replace(/[.!?]+$/, "");
const lowerFirst = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toLowerCase() + cleaned.slice(1);
};
const toSentenceCase = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};
const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const preserveLeadCaps = (value = "") =>
  /^(US\b|UK\b|UAE\b|WWI\b|WWII\b|NYC\b|LA\b|Mt\.\b|St\.\b|Hong Kong\b|New Orleans\b|Big Ben\b|Route 66\b)/i.test(
    cleanLine(value),
  );
const maybeLowerFirst = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return preserveLeadCaps(cleaned) ? cleaned : lowerFirst(cleaned);
};
const articleFor = (value = "", preferred = "a") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return preferred;
  if (preferred === "the") return "the";
  return /^[aeiou]/i.test(cleaned) ? "an" : "a";
};
const articleize = (value = "", preferred = "a") => {
  const cleaned = stripTerminalPunctuation(value);
  if (!cleaned) return "";
  if (/^(a|an|the)\b/i.test(cleaned)) return cleaned;
  return `${articleFor(cleaned, preferred)} ${maybeLowerFirst(cleaned)}`;
};
const stripPrefix = (value = "", prefixes = []) => {
  const cleaned = stripTerminalPunctuation(value);
  for (const prefix of prefixes) {
    if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) {
      return cleanLine(cleaned.slice(prefix.length));
    }
  }
  return cleaned;
};
const isVerbClause = (value = "") =>
  /^(honors|connects|controls|houses|measures|contains|includes|marks|commemorates|features|offers|shows|overlooks|guards|protects|crosses|spans|descends|flows|begins|ends|stands|sits|lies|looks|served|serves|was|were|is|are|built|carved|designed|formed|buried|named|called)\b/i.test(
    cleanLine(value),
  );

const canonicalizeLandmarkBody = (value = "") =>
  stripTerminalPunctuation(value)
    .replace(/^known as known as /i, "known as ")
    .replace(/^known as famous for /i, "famous for ")
    .replace(/^known as an one of /i, "one of ")
    .replace(/^that is an one of /i, "that is one of ")
    .replace(/^known as (?:an?|the) known as /i, "known as ")
    .replace(/^known as (?:an?|the) often called /i, "often called ")
    .replace(/^often called (?:an?|the) often called /i, "often called ")
    .replace(/^symbol of /i, "known as the symbol of ")
    .replace(/^heart of /i, "known as the heart of ")
    .replace(/^gateway to /i, "known as the gateway to ")
    .replace(/^home of /i, "known as the home of ")
    .replace(/^site of /i, "known as the site of ")
    .replace(/^seat of /i, "known as the seat of ")
    .replace(/^birthplace of /i, "known as the birthplace of ")
    .replace(/^residence of /i, "known as the residence of ")
    .replace(/^center of /i, "known as the center of ")
    .replace(/^centre of /i, "known as the centre of ")
    .replace(/^where /i, "that ")
    .trim();

const buildLandmarkPredicate = (value = "") => {
  const cleaned = canonicalizeLandmarkBody(value);
  if (!cleaned) return "";

  if (
    /^(iron lady|rose city|lungs of the earth|happiest place on earth|crossroads of the world|smoke that thunders|white heron castle|city of the gods|temple of dawn|freedom tower|yellow mountains)\b/i.test(
      cleaned,
    )
  ) {
    return `often called ${articleize(cleaned, "the")}`;
  }

  if (/^[A-Z][A-Za-z.' -]+['’]s /i.test(cleaned)) {
    return `known as ${cleaned}`;
  }

  if (/^(known for|famous for|often called|known as)\b/i.test(cleaned)) {
    return lowerFirst(cleaned);
  }

  if (
    /^(one of|third|second|first|last|only|largest|highest|lowest|oldest|youngest|best)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, "the")}`;
  }

  if (/^(kiss|visit|climb|walk|cross)\b/i.test(cleaned)) {
    return `that people ${lowerFirst(cleaned)}`;
  }

  if (
    /^(designed|carved|buried|formed|built|rebuilt|guarded|painted)\b/i.test(
      cleaned,
    )
  ) {
    return `that was ${lowerFirst(cleaned)}`;
  }

  if (isVerbClause(cleaned) || /^that\b/i.test(cleaned)) {
    return cleaned.startsWith("that ")
      ? lowerFirst(cleaned)
      : `that ${lowerFirst(cleaned)}`;
  }

  if (
    /^(temples|biodomes|heads|waters|islands|collections|courts|roads|tombs|gardens|canals|lakes|ruins|cliffs|windmills|monkeys|gates|flowers|churches|bridges)\b/i.test(
      cleaned,
    )
  ) {
    return `known for ${lowerFirst(cleaned)}`;
  }

  if (
    /^(largest|highest|lowest|oldest|youngest|first|last|only|best|main|major|historic|historical|ancient|modern|iconic|sacred|royal|former|famous|grand|geothermal|tropical|active|medieval|gothic|roman|maya|maya city|shinto|hindu|islamic|wooden|marble|art deco|plain of|group of|world heritage|three massive|flat topped|flat-topped|colorful|scenic|floating|emerald|turquoise|prehistory|prehistoric|massive|largest plain|largest religious|largest buddhist|highest peak|highest waterfall|lowest point)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, /^(largest|highest|lowest|oldest|youngest|first|last|only|best|main|major)/i.test(cleaned) ? "the" : "a")}`;
  }

  if (/^(the |bean)\b/i.test(cleaned)) {
    return `often called ${articleize(cleaned, "the")}`;
  }

  return `that is ${articleize(cleaned)}`;
};

const buildLandmarkDefinition = ({ country, definition }) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";
  const body = canonicalizeLandmarkBody(
    stripPrefix(cleaned, [`A landmark in ${country} `, "A landmark "]),
  );
  return `A landmark in ${country} ${buildLandmarkPredicate(body)}.`;
};

const buildLandmarkExamSentence = ({ country, definition }) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";
  const body = canonicalizeLandmarkBody(
    stripPrefix(cleaned, [`A landmark in ${country} `, "A landmark "]),
  );
  const predicate = buildLandmarkPredicate(body);
  return `While traveling in ${country}, look for the landmark ${predicate}.`;
};

const HOUSEHOLD_DEFINITION_OVERRIDES = new Map(
  Object.entries({
    "clock to wake you up": "A clock that rings to wake you up at a set time.",
    "comfortable chair with supports":
      "A large, comfortable chair with side supports for your arms.",
    "connector for plugs":
      "A connector that helps one plug fit a socket or another device.",
    "metal sheet for cooking":
      "A thin metal sheet used to wrap food or help cook it.",
    "dish for ash": "A small dish where cigarette ash is dropped.",
    "book for photos": "A book used to store and display photos.",
    "cleaning liquid for wounds":
      "A liquid used to clean wounds and help prevent infection.",
    "device to clean air": "A device used to clean the air in a room.",
    "sound booster": "A device used to make sound louder through speakers.",
    "signal receiver": "A part that receives a radio or television signal.",
    "paintings or decor":
      "Paintings or decorative objects displayed around the home.",
    "pain relief pill": "A pill taken to reduce pain.",
    "spray bottle": "A bottle that sprays liquid in small drops.",
    "tool for piercing": "A pointed tool used to make a small hole.",
    "inflatable mattress": "A mattress filled with air for temporary sleeping.",
    "bowl for water": "A bowl-shaped container used to hold water.",
    "woven container":
      "A container made from woven material for carrying or storing things.",
    "tub for bathing": "A large bathroom tub used for bathing.",
    "furniture for sleep": "A piece of furniture used for sleeping.",
    "trash container": "A container where rubbish is thrown away.",
    "warm bed cover": "A thick cover used to keep a bed warm.",
    "shelf for books": "A shelf or unit used to hold books.",
    "deep dish": "A deep round container used for serving or eating food.",
    "pail with handle":
      "A deep container with a handle for carrying water or other things.",
    "light source": "The part of a lamp or fixture that gives light.",
    "power source": "An item that stores or supplies electrical power.",
    "liquid container": "A container used to hold liquids.",
    "storage container": "A container used to store things neatly.",
    "cleaning or hair tool":
      "A brush used either for cleaning or for grooming hair.",
    "rug for bathroom": "A small rug placed on the bathroom floor.",
    "robe for after bath": "A robe worn after bathing or showering.",
    "long seat": "A long seat that can fit more than one person.",
    "decorative bed cover":
      "A cover placed over a bed for warmth or decoration.",
    "storage furniture":
      "Furniture used to store clothes, dishes, or other home items.",
    "math device": "A small device used for calculations.",
    "date chart": "A chart that shows the days, weeks, and months of the year.",
    "wax light": "A wax stick with a wick that gives light when lit.",
    "floor fabric": "A large piece of fabric used to cover part of a floor.",
    "baking dish": "A dish used to bake food in the oven.",
    "overhead cooler": "A fan fixed to the ceiling to move air around a room.",
    seat: "A piece of furniture used for one person to sit on.",
    sofa: "A long, soft seat for several people to sit and relax on.",
    couch: "A long, soft seat for several people to sit and relax on.",
    toy: "An object used for play, usually by a child at home.",
    fabric: "A soft material made from woven or knitted fibers.",
    pattern: "A repeated arrangement of lines, shapes, or colors.",
    card: "A small printed or written piece used to share information or a message.",
    bill: "A document that shows money owed for something.",
    basin: "A bowl-shaped container or fixture used to hold water.",
    bath: "A bathroom fixture or washing setup used to clean the body.",
    cushion: "A soft padded item used to support the head, back, or body.",
    dish: "A shallow container used for serving or eating food.",
    jug: "A container with a handle used to hold and pour liquids.",
    phone: "An electronic device used to make calls and communicate.",
    television: "An electronic screen used to watch programs, films, or news.",
    tv: "An electronic screen used to watch programs, films, or news.",
    tablet:
      "A handheld touchscreen device used for apps, reading, or browsing.",
    image: "A picture shown on paper or on a screen.",
    art: "A picture or decorative work displayed in the home.",
    cleaner: "A substance or tool used to remove dirt or germs.",
    cosmetics: "Products used on the face or body for beauty or care.",
    gown: "A loose piece of clothing worn around the house or after washing.",
    coat: "An outer layer of clothing worn for warmth or protection.",
    mat: "A small piece of material placed on a surface for protection or comfort.",
    tool: "An object used by hand to do a practical job.",
    holder: "An item made to keep something in place or upright.",
    container: "An object used to hold, carry, or store something.",
    fastener: "A small item used to close, lock, or hold things together.",
    instrument: "A musical device played to create sound.",
    security: "A lock or protective item used to keep something safe.",
    screen: "A flat surface that shows images or information.",
    pen: "A writing tool that uses ink.",
    chart: "A sheet that shows information, directions, or data visually.",
    reflector: "A smooth surface that shows back light or an image.",
    greenery: "A plant or group of leaves kept for decoration.",
    supplement: "A vitamin or nutrient product taken to support health.",
    coupon: "A printed or digital slip that gives a discount or credit.",
    antiqueptic: "A substance used to clean wounds and kill germs.",
    antiseptic: "A substance used to clean wounds and kill germs.",
    wc: "A bathroom fixture used for going to the toilet.",
    trinket: "A small decorative object kept more for display than use.",
    purse: "A small bag used to carry personal items.",
    notebook: "A book with blank or lined pages for writing notes.",
    pamphlet: "A small printed booklet with short information.",
    periodical: "A magazine or publication that comes out regularly.",
  }),
);

const HOUSEHOLD_HINT_OVERRIDES = new Map(
  Object.entries({
    "alarm clock": "It sits near the bed and rings when it is time to wake up.",
    aquarium: "Fish swim inside it while bubbles rise through the water.",
    "air conditioner": "On a hot day, you switch it on to cool the room.",
    "air freshener":
      "After cooking or cleaning, you use it to make the room smell better.",
    apron:
      "You tie it around your waist before cooking to protect your clothes.",
    ashtray: "A smoker leaves ash in it instead of dropping it on a table.",
    "answering machine":
      "If nobody picks up the phone, it records the caller's message.",
    antenna: "It helps a radio or television pick up a signal.",
    airbed: "You fill it with air before guests sleep on it.",
    bathtub: "You fill it with water before taking a bath.",
    bed: "You lie down on it at night to sleep.",
    blender: "You use it to mix fruit or ingredients into a smooth liquid.",
    broom: "You sweep dust across the floor with it.",
    bulb: "You screw it into a lamp so the room can light up.",
    "coffee maker":
      "In the morning, it brews coffee while the kitchen starts to smell warm and bitter.",
    comb: "You pull it through your hair to untangle it.",
    couch: "You sink into it when you want to relax in the living room.",
    desk: "You sit at it to work, write, or study.",
    dishwasher:
      "After dinner, you load dirty plates into it and let it wash them.",
    doormat: "People wipe their shoes on it before entering the house.",
    drawer: "You pull it out to reach whatever is stored inside.",
    dryer: "Wet clothes go into it so they come out warm and dry.",
    "egg timer": "You watch or listen to it so you do not overcook the eggs.",
    extinguisher:
      "You grab it when a small fire starts and needs to be put out.",
    fan: "When the air feels hot and still, it moves a cool breeze around the room.",
    flashlight: "When the lights go out, you use it to see in the dark.",
    fork: "You hold it in your hand while eating food from a plate.",
    freezer: "You keep ice cream or frozen food inside it so it stays hard.",
    fridge: "Milk, vegetables, and leftovers stay cold inside it.",
    hanger: "You use it to hang clothes neatly in a closet.",
    headphones:
      "You wear them over your ears to listen without bothering others.",
    heater: "When the weather gets cold, it makes the room warmer.",
    iron: "You press hot metal over clothes to remove wrinkles.",
    kettle: "You fill it with water and heat it until it boils.",
    key: "You put it in a lock and turn it to open or close something.",
    knife: "You use it to cut food or open packages.",
    lamp: "You switch it on when you need light beside a bed or table.",
    laptop: "You open it to work, browse, or study on a portable screen.",
    lighter: "A small flame appears when you use it to start a fire.",
    lock: "You close it to keep a door, box, or drawer secure.",
    mailbox: "Letters stay inside it until someone comes to collect them.",
    microwave: "You put food inside it to heat it quickly.",
    mirror: "You look into it to check your face or clothes.",
    mop: "You drag it across the wet floor to clean it.",
    mug: "You hold it by the handle when drinking something hot.",
    napkin: "You use it to wipe your mouth or hands while eating.",
    notebook: "You open it when you want to write down notes or ideas.",
    oven: "You put food inside it to bake or roast it.",
    "paper towel":
      "You tear off a sheet when something spills and needs to be wiped up.",
    peeler: "You slide it over vegetables or fruit to remove the skin.",
    pen: "You use it to write notes, names, or quick reminders.",
    pencil: "You write with it when you may need to erase later.",
    perfume: "You spray it on yourself or in the air for a pleasant smell.",
    phone: "It rings when someone is calling you.",
    pillow: "You rest your head on it while sleeping.",
    plate: "You put food on it before eating.",
    plug: "You push it into the socket to connect something to electricity.",
    radio: "You turn it on to hear music, news, or voices.",
    rag: "You wipe dirt, dust, or spills with it.",
    razor: "You use it to shave hair from the skin.",
    refrigerator: "Food stays cold inside it so it lasts longer.",
    remote: "You press its buttons from across the room to control a device.",
    "rice cooker": "You add rice and water, then let it cook by itself.",
    "robot vacuum": "It moves around the floor on its own, picking up dust.",
    rug: "It lies on the floor to add comfort or decoration.",
    scissors: "You open and close its blades to cut paper or fabric.",
    shampoo: "You rub it into wet hair to wash it.",
    shower: "Water falls from it while you wash your body.",
    sink: "You turn on the tap above it to wash dishes or hands.",
    soap: "You rub it with water to clean your skin or surfaces.",
    sofa: "You sit back on it to relax with more than one person.",
    speaker: "Sound comes out of it when music or audio is playing.",
    sponge: "It soaks up water while you scrub dishes or surfaces.",
    spoon: "You use it to scoop soup, cereal, or sauce.",
    table: "You gather around it to eat, work, or place things on top.",
    tablet: "You tap the screen with your fingers to read, watch, or browse.",
    teapot: "You pour hot tea from it into cups.",
    telephone: "It rings when someone calls, and you speak through it.",
    television: "You sit in front of it to watch shows, films, or news.",
    tissue: "You pull one out to wipe your nose, face, or a small spill.",
    toaster: "Bread pops up from it after being heated.",
    toilet: "You use it in the bathroom when you need to go.",
    toothbrush: "You move it across your teeth to clean them.",
    toothpaste: "You squeeze it onto the toothbrush before brushing.",
    towel: "You dry your hands, face, or body with it.",
    umbrella: "You open it over your head to stay dry in the rain.",
    vacuum: "It sucks dust and dirt from the floor.",
    vase: "You place flowers in it for decoration.",
    wallet: "You keep cash and cards inside it.",
    wardrobe: "You open it to store or choose clothes.",
    "washing machine": "Dirty clothes go into it and come out washed.",
    watch: "You look at it to check the time on your wrist.",
    webcam: "It lets other people see you during a video call.",
    whisk: "You move it quickly through eggs or batter to mix in air.",
    window: "You look through it or open it to let in light and air.",
    "wine glass": "You hold it by the stem while drinking wine.",
    wrench: "You grip and turn it to tighten or loosen a nut or bolt.",
    zipper: "You pull it up or down to open or close a piece of fabric.",
  }),
);

const purposeFromModifier = (value = "") => {
  const cleaned = normalizeText(value);

  const direct = new Map(
    Object.entries({
      cooling: "cool the air in a room",
      scent: "add fragrance to the air",
      signal: "receive or send a signal",
      sound: "make sound louder",
      voice: "record or play voice messages",
      mixing: "mix ingredients together",
      cooking: "cook or prepare food",
      baking: "bake food in the oven",
      sweeping: "sweep dirt from the floor",
      cleaning: "clean surfaces or wounds",
      dusting: "remove dust from surfaces",
      shaving: "remove hair",
      draining: "drain water from food or dishes",
      chopping: "cut food safely",
      power: "extend or provide electrical power",
      watering: "water plants",
      measuring: "measure an amount or length",
      writing: "write words or notes",
      heating: "make something warmer",
      heated: "keep something warm",
      portable: "carry light from place to place",
      decorative: "decorate a room or bed",
      listening: "listen to audio privately",
      hanging: "hang things up",
      protective: "protect clothes or hands",
      fast: "heat food quickly",
      dental: "clean between teeth",
      medical: "give basic medical care",
      ironing: "support clothes while ironing",
      kitchen: "help with cooking or food preparation",
      gaming: "play video games",
      storage: "store household items",
      laundry: "hold or carry dirty clothes",
      air: "move or clean the air",
      exercise: "support exercise on the floor",
      knitting: "knit or sew with thread",
    }),
  );

  return direct.get(cleaned) || "";
};

const expandHouseholdDefinition = ({ word, definition }) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";

  const baseDefinition = stripTerminalPunctuation(
    cleaned
      .replace(/^A household item similar to /i, "")
      .replace(/^A household item that /i, "")
      .replace(/^A household item used for /i, "")
      .replace(/^A household item used to /i, "used to ")
      .replace(/^A household item used in everyday home life$/i, "")
      .replace(/^A household item /i, "")
      .replace(/^A household device used to /i, "used to ")
      .replace(/^A household device used for /i, "used for ")
      .replace(/^A household device /i, "")
      .replace(/^A household appliance used to /i, "used to ")
      .replace(/^A household appliance /i, "")
      .replace(
        /^A household (tool|container|cover|cloth|mat|table|basket|box|chair|seat|rug|quilt|mattress|bottle|lamp|light|holder|rack|stand|board|plate|thread|pill|spray|receiver|booster) used for /i,
        "used for ",
      )
      .replace(
        /^A household (tool|container|cover|cloth|mat|table|basket|box|chair|seat|rug|quilt|mattress|bottle|lamp|light|holder|rack|stand|board|plate|thread|pill|spray|receiver|booster) used to /i,
        "used to ",
      )
      .replace(/^A household /i, ""),
  );

  const normalizedWord = normalizeText(word);
  const normalizedDefinition = normalizeText(baseDefinition || cleaned);

  const override = HOUSEHOLD_DEFINITION_OVERRIDES.get(normalizedDefinition);
  if (override) return override;

  if (/^used to\b/i.test(baseDefinition)) {
    return `A household item ${lowerFirst(baseDefinition)}.`;
  }

  if (
    /^(records|opens|brews|washes|dries|removes|times|blocks|attracts|holds|stores|plays|boils|cracks|trims|smooths|sharpens|cuts|mixes|grinds|grates|filters|extends|lights|warms|protects|cools|covers|carries|pours|connects|receives|amplifies|measures|lifts)\b/i.test(
      baseDefinition,
    )
  ) {
    return `A household item that ${lowerFirst(baseDefinition)}.`;
  }

  const wordMakerMatch = word.match(/^(.+?) maker$/i);
  if (wordMakerMatch) {
    return `A household appliance used to make ${lowerFirst(wordMakerMatch[1])}.`;
  }

  const wordHolderMatch = word.match(
    /^(.+?) (holder|rack|stand|box|basket|bucket|tray|case|block)$/i,
  );
  if (wordHolderMatch) {
    return `A household ${wordHolderMatch[2].toLowerCase()} used to hold or store ${lowerFirst(wordHolderMatch[1])}.`;
  }

  const wordClothMatch = word.match(/^(.+?) (cloth|towel|glove|mat|cover)$/i);
  if (wordClothMatch) {
    return `A household ${wordClothMatch[2].toLowerCase()} used for ${lowerFirst(wordClothMatch[1])}.`;
  }

  const wordToolMatch = word.match(
    /^(.+?) (brush|knife|opener|peeler|sharpener|player|lamp|glass|cup|bottle|jar|fan|board)$/i,
  );
  if (wordToolMatch) {
    const head = wordToolMatch[2].toLowerCase();
    if (head === "brush")
      return `A household brush used for ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "knife")
      return `A household knife used for ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "opener")
      return `A household tool used to open ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "peeler")
      return `A household tool used to peel ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "sharpener")
      return `A household tool used to sharpen ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "player")
      return `A household device used to play ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "lamp")
      return `A household lamp that gives light for ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "glass")
      return `A glass used for drinking ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "cup")
      return `A cup used to hold ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "bottle")
      return `A bottle used to hold ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "jar")
      return `A jar used to hold ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "fan")
      return `A household fan used for ${lowerFirst(wordToolMatch[1])}.`;
    if (head === "board")
      return `A household board used for ${lowerFirst(wordToolMatch[1])}.`;
  }

  const phraseToMatch = baseDefinition.match(/^(.+?) to (.+)$/i);
  if (phraseToMatch) {
    const [, thing, purpose] = phraseToMatch;
    if (
      /^(clock|device|tool|machine|appliance|bottle|spray|cloth|board|table|chair|mattress)$/i.test(
        thing,
      )
    ) {
      return `A ${thing.toLowerCase()} used to ${lowerFirst(purpose)}.`;
    }
    return `A household item used to ${lowerFirst(purpose)}.`;
  }

  const phraseForMatch = baseDefinition.match(/^(.+?) for (.+)$/i);
  if (phraseForMatch) {
    const [, thing, purpose] = phraseForMatch;
    if (
      /^(chair|cloth|dish|sheet|book|rack|rug|robe|stand|tank|tool|connector|spray|bowl|cover|container|box|holder|mattress|pill|receiver|basket|blanket|board|lamp|glass|glove|bucket|cushion|furniture|sack|tub|shelf)$/i.test(
        thing,
      )
    ) {
      return `A ${thing.toLowerCase()} used for ${lowerFirst(purpose)}.`;
    }
    return `A household item used for ${lowerFirst(purpose)}.`;
  }

  const phraseWithMatch = baseDefinition.match(/^(.+?) with (.+)$/i);
  if (phraseWithMatch) {
    return `A household item that is ${articleize(baseDefinition)}.`;
  }

  const phraseOrMatch = baseDefinition.match(/^(.+?) or (.+)$/i);
  if (phraseOrMatch) {
    return `A household item used as ${articleize(phraseOrMatch[1])} or ${articleize(phraseOrMatch[2])}.`;
  }

  const twoWordMatch = baseDefinition.match(/^([A-Za-z-]+) ([A-Za-z-]+)$/);
  if (twoWordMatch) {
    const [, modifier, head] = twoWordMatch;
    const purpose = purposeFromModifier(modifier);
    if (/^(device|machine|appliance)$/i.test(head)) {
      return purpose
        ? `A household ${head.toLowerCase()} used to ${purpose}.`
        : `A household ${head.toLowerCase()} used in everyday home life.`;
    }
    if (/^(tool|board|plate|thread|pill|spray|receiver|booster)$/i.test(head)) {
      return purpose
        ? `A household ${head.toLowerCase()} used to ${purpose}.`
        : `A household ${head.toLowerCase()} used in everyday home life.`;
    }
    if (
      /^(container|holder|cover|cloth|mat|table|basket|box|chair|seat|rug|quilt|mattress|bottle|lamp|light|sofa|gown)$/i.test(
        head,
      )
    ) {
      return purpose
        ? `A household ${head.toLowerCase()} used for ${purpose}.`
        : `A household ${head.toLowerCase()} used in everyday home life.`;
    }
  }

  if (!baseDefinition || normalizedWord === normalizedDefinition) {
    return `A household item used in everyday home life.`;
  }

  return `A household item similar to ${articleize(baseDefinition)}.`;
};

const buildHouseholdExamSentence = ({ word, definition }) => {
  const wordOverride = HOUSEHOLD_HINT_OVERRIDES.get(normalizeText(word));
  if (wordOverride) return wordOverride;

  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";

  const toUse = cleaned
    .replace(/^A household item /i, "")
    .replace(/^A household /i, "")
    .replace(/^A /i, "");

  const useToMatch = cleaned.match(/\bused to ([^.]+)$/i);
  if (useToMatch) {
    return `At home, you reach for it when you need to ${lowerFirst(useToMatch[1])}.`;
  }

  const useForMatch = cleaned.match(/\bused for ([^.]+)$/i);
  if (useForMatch) {
    const purpose = lowerFirst(useForMatch[1]);
    if (
      /^(photos|books|clothes|dishes|hands|hair|water|plants|mail|food|ash|ice|tea|coffee|wine|toothbrush|toothpaste|shoes|keys|flowers|rice|eggs|notes|paper|dust|air)$/i.test(
        purpose,
      )
    ) {
      return `At home, you use it with ${purpose}.`;
    }
    return `At home, you reach for it when you need something for ${purpose}.`;
  }

  const thatMatch = cleaned.match(/\bthat ([^.]+)$/i);
  if (thatMatch) {
    return `At home, this is the item that ${lowerFirst(thatMatch[1])}.`;
  }

  if (/similar to\b/i.test(cleaned)) {
    return `At home, you would recognize it by the kind of everyday object it is.`;
  }

  return `At home, you use this item as ${articleize(lowerFirst(toUse))}.`;
};

const getPropertyName = (name) => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return null;
};

const getStringValue = (node) => {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return undefined;
};

const getIndent = (sourceText, pos) => {
  const lineStart = sourceText.lastIndexOf("\n", pos - 1) + 1;
  const lineText = sourceText.slice(lineStart, pos);
  return lineText.match(/^\s*/)?.[0] || "";
};

for (const target of TARGETS) {
  const sourceText = fs.readFileSync(target.file, "utf8");
  const sourceFile = ts.createSourceFile(
    target.file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const replacements = [];

  const visit = (node) => {
    if (
      !ts.isObjectLiteralExpression(node) ||
      !node.parent ||
      !ts.isArrayLiteralExpression(node.parent)
    ) {
      ts.forEachChild(node, visit);
      return;
    }

    let word;
    let country;
    let definition;
    let definitionNode;
    let examSentence;
    let examSentenceNode;
    let hasExamSentence = false;

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = getPropertyName(property.name);
      if (!name) continue;

      if (name === "word") word = getStringValue(property.initializer);
      if (name === "country") country = getStringValue(property.initializer);
      if (name === "definition") {
        definition = getStringValue(property.initializer);
        definitionNode = property.initializer;
      }
      if (name === "examSentence") {
        examSentence = getStringValue(property.initializer);
        examSentenceNode = property.initializer;
        hasExamSentence = true;
      }
    }

    if (!word || !definition || !definitionNode) {
      ts.forEachChild(node, visit);
      return;
    }

    let nextDefinition = definition;
    let nextExamSentence = examSentence;

    if (target.kind === "landmark") {
      nextDefinition = buildLandmarkDefinition({ country, definition });
      nextExamSentence = buildLandmarkExamSentence({
        country,
        definition: nextDefinition || definition,
      });
    } else {
      nextDefinition = expandHouseholdDefinition({ word, definition });
      nextExamSentence = buildHouseholdExamSentence({
        word,
        definition: nextDefinition || definition,
      });
    }

    if (nextDefinition && nextDefinition !== definition) {
      replacements.push({
        start: definitionNode.getStart(sourceFile),
        end: definitionNode.getEnd(),
        text: JSON.stringify(nextDefinition),
      });
    }

    if (
      hasExamSentence &&
      examSentenceNode &&
      nextExamSentence &&
      nextExamSentence !== examSentence
    ) {
      replacements.push({
        start: examSentenceNode.getStart(sourceFile),
        end: examSentenceNode.getEnd(),
        text: JSON.stringify(nextExamSentence),
      });
    } else if (!hasExamSentence && nextExamSentence) {
      const objectIndent = getIndent(sourceText, node.getStart(sourceFile));
      const propertyIndent = `${objectIndent}  `;
      const lastProperty = node.properties[node.properties.length - 1];
      const needsComma =
        lastProperty &&
        !sourceText.slice(lastProperty.end, node.end - 1).includes(",");
      replacements.push({
        start: node.end - 1,
        end: node.end - 1,
        text: `${needsComma ? "," : ""}\n${propertyIndent}examSentence: ${JSON.stringify(nextExamSentence)},\n${objectIndent}`,
      });
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (replacements.length === 0) {
    console.log(`No changes needed in ${path.relative(ROOT, target.file)}`);
    continue;
  }

  let nextText = sourceText;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    nextText =
      nextText.slice(0, replacement.start) +
      replacement.text +
      nextText.slice(replacement.end);
  }

  fs.writeFileSync(target.file, nextText, "utf8");
  console.log(
    `Updated ${replacements.length} entries in ${path.relative(ROOT, target.file)}`,
  );
}
