// This script generates the verb-dictionary.json file from inline data.
// Run: node scripts/build-verb-dictionary.mjs
import fs from "node:fs";
import path from "node:path";

const D = {};
const a = (w, d, e) => {
  D[w] = [d, e];
};

// ── A ──
a(
  "Arise",
  "To get up or come into being.",
  "Problems may arise if you do not plan ahead.",
);
a(
  "Awake",
  "To stop sleeping or become aware.",
  "I awake every morning at six o'clock.",
);
a(
  "Absorb",
  "To take in or soak up.",
  "A sponge can absorb a large amount of water.",
);
a(
  "Accept",
  "To receive or agree to something.",
  "She was happy to accept the invitation to the party.",
);
a(
  "Accompany",
  "To go somewhere with someone.",
  "Her friend offered to accompany her to the doctor.",
);
a(
  "Achieve",
  "To succeed in reaching a goal.",
  "Hard work helps you achieve your dreams.",
);
a(
  "Acquire",
  "To gain or obtain something.",
  "She managed to acquire a rare painting at the sale.",
);
a(
  "Adapt",
  "To change to fit new conditions.",
  "Animals must adapt to survive in different climates.",
);
a(
  "Adjust",
  "To change slightly to improve.",
  "You may need to adjust the volume on the speaker.",
);
a(
  "Admit",
  "To confess or allow entry.",
  "He was forced to admit that he had made a mistake.",
);
a(
  "Adopt",
  "To take on or legally take as one's own.",
  "They decided to adopt a child from overseas.",
);
a(
  "Advise",
  "To give suggestions or guidance.",
  "The doctor will advise you on the best treatment.",
);
a(
  "Allow",
  "To give permission.",
  "The teacher does not allow phones in the classroom.",
);
a(
  "Analyse",
  "To study something in detail.",
  "Scientists analyse data to find patterns.",
);
a(
  "Announce",
  "To make something known publicly.",
  "The president will announce the new policy today.",
);
a(
  "Apologize",
  "To say sorry for a mistake.",
  "He called to apologize for arriving late.",
);
a(
  "Appear",
  "To come into sight or seem.",
  "Stars appear in the sky when the sun goes down.",
);
a(
  "Apply",
  "To request formally or put into use.",
  "You should apply for the job before Friday.",
);
a(
  "Appreciate",
  "To feel grateful or recognise value.",
  "I really appreciate all the help you have given me.",
);
a(
  "Approach",
  "To come nearer to something.",
  "The train began to approach the station slowly.",
);
a(
  "Approve",
  "To officially agree to something.",
  "The committee will approve the budget next week.",
);
a(
  "Argue",
  "To give reasons or disagree.",
  "The children always argue about which film to watch.",
);
a(
  "Arrange",
  "To plan or put in order.",
  "She will arrange the meeting for next Monday.",
);
a(
  "Arrive",
  "To reach a destination.",
  "The train is expected to arrive at noon.",
);
a(
  "Ask",
  "To put a question to someone.",
  "Do not be afraid to ask for help when you need it.",
);
a(
  "Assess",
  "To judge or evaluate quality.",
  "Teachers assess student progress at the end of each term.",
);
a(
  "Assign",
  "To give a task or duty.",
  "The manager will assign a new project to each team.",
);
a(
  "Assist",
  "To help or support someone.",
  "A nurse will assist the doctor during the operation.",
);
a(
  "Assume",
  "To suppose without proof.",
  "Do not assume everyone speaks English abroad.",
);
a(
  "Attach",
  "To join or fix something to another.",
  "Please attach your photo to the application form.",
);
a(
  "Attempt",
  "To try to do something.",
  "He will attempt to climb the mountain next spring.",
);
a(
  "Attend",
  "To be present or go to.",
  "All students must attend the morning assembly.",
);
a(
  "Attract",
  "To pull towards or interest.",
  "The bright colours attract butterflies to the garden.",
);
a(
  "Avoid",
  "To keep away from something.",
  "You should avoid eating too much sugar.",
);

// ── B ──
a(
  "Be",
  "To exist or to indicate identity.",
  "She wants to be a doctor when she grows up.",
);
a(
  "Bear",
  "To carry or endure something.",
  "She could not bear the pain any longer.",
);
a(
  "Beat",
  "To hit repeatedly or defeat.",
  "Our team managed to beat the champions.",
);
a(
  "Become",
  "To begin to be or grow into.",
  "She studied hard to become a lawyer.",
);
a(
  "Begin",
  "To start doing something.",
  "Classes begin at nine o'clock every morning.",
);
a(
  "Bend",
  "To curve or make something curved.",
  "You need to bend your knees when you lift heavy objects.",
);
a(
  "Bet",
  "To risk money on a result.",
  "I bet five dollars that it would rain today.",
);
a(
  "Bid",
  "To offer a price or say farewell.",
  "She decided to bid on the painting at the auction.",
);
a(
  "Bind",
  "To tie or fasten tightly.",
  "Use string to bind the package before mailing it.",
);
a(
  "Bite",
  "To cut into with teeth.",
  "Be careful, that dog might bite if provoked.",
);
a(
  "Bleed",
  "To lose blood from the body.",
  "The wound continued to bleed for several minutes.",
);
a(
  "Blow",
  "To move air or be moved by wind.",
  "The wind began to blow harder as the storm approached.",
);
a(
  "Break",
  "To separate into pieces or damage.",
  "Be careful not to break the glass on the table.",
);
a(
  "Breed",
  "To produce young or keep animals.",
  "They breed horses on their farm in the countryside.",
);
a(
  "Bring",
  "To carry something to a place.",
  "Please bring your notebook to every class.",
);
a(
  "Broadcast",
  "To send out a signal or programme.",
  "The station will broadcast the match live tonight.",
);
a(
  "Build",
  "To make something by putting parts together.",
  "They plan to build a new library next year.",
);
a(
  "Burn",
  "To be on fire or destroy with heat.",
  "Do not let the toast burn in the oven.",
);
a(
  "Burst",
  "To break open suddenly.",
  "The balloon will burst if you blow too much air into it.",
);
a(
  "Buy",
  "To get something by paying money.",
  "I need to buy some groceries on the way home.",
);
a(
  "Belong",
  "To be the property of.",
  "These keys belong to the person next door.",
);
a(
  "Borrow",
  "To take with permission and return.",
  "Can I borrow your dictionary for the exam?",
);

// ── C ──
a(
  "Cast",
  "To throw or direct something.",
  "The fisherman cast his line into the river.",
);
a(
  "Catch",
  "To grab or capture something moving.",
  "She ran fast enough to catch the bus on time.",
);
a(
  "Choose",
  "To pick one thing from several options.",
  "You can choose any colour you like for your room.",
);
a(
  "Cling",
  "To hold on tightly to something.",
  "The child would cling to her mother in the crowd.",
);
a(
  "Come",
  "To move towards or arrive.",
  "Please come to the meeting at three o'clock.",
);
a(
  "Cost",
  "To have a particular price.",
  "That new jacket will cost about fifty dollars.",
);
a(
  "Creep",
  "To move slowly and quietly.",
  "The cat would creep across the garden silently.",
);
a(
  "Cut",
  "To divide or separate with a sharp tool.",
  "Use the scissors to cut the paper in half.",
);
a(
  "Call",
  "To speak loudly or telephone.",
  "I will call you when I arrive at the airport.",
);
a(
  "Care",
  "To feel concern or look after.",
  "She takes time to care for her elderly neighbour.",
);
a(
  "Carry",
  "To hold and move something.",
  "Please help me carry these heavy boxes upstairs.",
);
a(
  "Cause",
  "To make something happen.",
  "Smoking can cause serious health problems.",
);
a(
  "Celebrate",
  "To mark a happy event.",
  "They celebrate their anniversary with a special dinner.",
);
a(
  "Change",
  "To make or become different.",
  "You can change your password in the settings menu.",
);
a(
  "Check",
  "To examine something for accuracy.",
  "Always check your work before handing it in.",
);
a(
  "Claim",
  "To say something is true or ask for.",
  "Passengers can claim their luggage at the carousel.",
);
a(
  "Clean",
  "To remove dirt from something.",
  "The children help clean the house on weekends.",
);
a(
  "Close",
  "To shut or bring to an end.",
  "The shop will close at nine o'clock tonight.",
);
a(
  "Collect",
  "To gather together.",
  "She likes to collect stamps from different countries.",
);
a(
  "Combine",
  "To join or mix together.",
  "You can combine the two colours to make green.",
);
a(
  "Comment",
  "To make a remark about.",
  "The teacher asked us to comment on the story.",
);
a(
  "Commit",
  "To pledge or carry out.",
  "He promised to commit more time to studying.",
);
a(
  "Communicate",
  "To share information with others.",
  "Good leaders communicate clearly with their team.",
);
a(
  "Compare",
  "To examine for similarities.",
  "Let us compare the prices before we decide.",
);
a(
  "Compete",
  "To try to win against others.",
  "Athletes from around the world compete at the Olympics.",
);
a(
  "Complain",
  "To express dissatisfaction.",
  "Customers often complain about long waiting times.",
);
a(
  "Complete",
  "To finish or make whole.",
  "You have one hour to complete the test.",
);
a(
  "Concentrate",
  "To focus the mind on something.",
  "It is hard to concentrate with all this noise.",
);
a(
  "Concern",
  "To worry or be about something.",
  "The safety of the children should concern every parent.",
);
a(
  "Conclude",
  "To finish or reach a decision.",
  "We can conclude that the experiment was a success.",
);
a(
  "Conduct",
  "To carry out or lead.",
  "The scientist will conduct the experiment tomorrow.",
);
a(
  "Confirm",
  "To make certain or verify.",
  "Please confirm your booking by email.",
);
a(
  "Connect",
  "To join or link together.",
  "This cable will connect your phone to the computer.",
);
a(
  "Consider",
  "To think carefully about.",
  "You should consider all the options before choosing.",
);
a("Consist", "To be made up of.", "The team will consist of five members.");
a(
  "Construct",
  "To build or put together.",
  "The workers will construct the bridge over the river.",
);
a(
  "Consume",
  "To eat, drink, or use up.",
  "People consume a lot of energy during winter months.",
);
a(
  "Contain",
  "To hold or have inside.",
  "The box can contain up to twenty items.",
);
a(
  "Continue",
  "To keep going without stopping.",
  "The rain is expected to continue throughout the day.",
);
a(
  "Contribute",
  "To give or help towards.",
  "Every member should contribute ideas to the project.",
);
a(
  "Control",
  "To direct or have power over.",
  "The pilot can control the plane from the cockpit.",
);
a(
  "Convert",
  "To change from one form to another.",
  "This app can convert dollars to euros quickly.",
);
a(
  "Cook",
  "To prepare food by heating.",
  "I usually cook dinner for my family after work.",
);
a(
  "Copy",
  "To make an identical version.",
  "Please copy the notes from the whiteboard.",
);
a(
  "Count",
  "To find the total number.",
  "Can you count how many chairs are in the room?",
);
a(
  "Cover",
  "To place something over.",
  "Use a cloth to cover the table before dinner.",
);
a(
  "Create",
  "To make or produce something new.",
  "The artist wants to create a mural for the school.",
);
a(
  "Cross",
  "To go from one side to the other.",
  "Look both ways before you cross the road.",
);
a("Cry", "To shed tears or shout.", "The baby started to cry late at night.");

// ── D ──
a(
  "Deal",
  "To handle or distribute something.",
  "The manager will deal with your complaint directly.",
);
a(
  "Dig",
  "To make a hole in the ground.",
  "The dog likes to dig holes in the garden.",
);
a(
  "Dive",
  "To jump head first into water.",
  "He loves to dive into the pool on hot days.",
);
a(
  "Do",
  "To perform or carry out an action.",
  "I need to do my homework before dinner.",
);
a(
  "Draw",
  "To make a picture or pull something.",
  "She likes to draw portraits in her spare time.",
);
a(
  "Dream",
  "To see images while sleeping.",
  "I often dream about travelling to new places.",
);
a(
  "Drink",
  "To take liquid into the mouth.",
  "Remember to drink plenty of water every day.",
);
a(
  "Drive",
  "To operate and control a vehicle.",
  "She learned to drive when she was eighteen.",
);
a(
  "Dwell",
  "To live or reside in a place.",
  "They dwell in a small cottage near the lake.",
);
a(
  "Dance",
  "To move the body to music.",
  "They love to dance at parties and weddings.",
);
a(
  "Decide",
  "To make a choice or judgement.",
  "I need more time to decide which university to attend.",
);
a(
  "Declare",
  "To announce officially.",
  "The mayor will declare the new park open to the public.",
);
a(
  "Decline",
  "To politely refuse or decrease.",
  "She had to decline the invitation due to work.",
);
a(
  "Deliver",
  "To bring something to a place.",
  "The postman will deliver the package this afternoon.",
);
a(
  "Demand",
  "To ask for forcefully.",
  "Workers demand better pay and working conditions.",
);
a(
  "Demonstrate",
  "To show how something works.",
  "The chef will demonstrate how to make the sauce.",
);
a(
  "Deny",
  "To say something is not true.",
  "She tried to deny the accusation but nobody believed her.",
);
a(
  "Depend",
  "To rely on or be determined by.",
  "The results depend on how much you practise.",
);
a(
  "Describe",
  "To say what something is like.",
  "Can you describe what the thief looked like?",
);
a(
  "Design",
  "To plan or create the look of.",
  "She was hired to design the company's new website.",
);
a(
  "Desire",
  "To want something strongly.",
  "Everyone has the desire to live a happy life.",
);
a(
  "Destroy",
  "To damage beyond repair.",
  "The storm could destroy the crops in the fields.",
);
a(
  "Detect",
  "To discover or notice something.",
  "The alarm can detect smoke in the building.",
);
a(
  "Develop",
  "To grow or create over time.",
  "Scientists develop new medicines every year.",
);
a(
  "Devote",
  "To give time or effort to.",
  "She chose to devote her life to helping others.",
);
a("Die", "To stop living.", "Flowers die quickly without enough water.");
a(
  "Disappear",
  "To become impossible to see.",
  "The magician made the rabbit disappear from the hat.",
);
a(
  "Discover",
  "To find something for the first time.",
  "Explorers hope to discover new species in the jungle.",
);
a(
  "Discuss",
  "To talk about a topic.",
  "Let us discuss the plan at the next meeting.",
);
a(
  "Display",
  "To put something where it can be seen.",
  "The museum will display the new collection next month.",
);
a(
  "Distribute",
  "To give out or deliver.",
  "Volunteers distribute food to people in need.",
);
a(
  "Disturb",
  "To interrupt or upset.",
  "Please do not disturb the neighbours late at night.",
);
a(
  "Dominate",
  "To have control or power over.",
  "The tall building will dominate the city skyline.",
);
a(
  "Doubt",
  "To feel uncertain about.",
  "I doubt he will arrive on time in this weather.",
);
a(
  "Drop",
  "To let fall or decrease.",
  "Be careful not to drop the fragile vase.",
);

// ── E ──
a(
  "Eat",
  "To put food in the mouth and swallow.",
  "We usually eat dinner together as a family.",
);
a(
  "Earn",
  "To receive money for work.",
  "She works hard to earn enough to support her family.",
);
a(
  "Emerge",
  "To come out or appear.",
  "A butterfly will emerge from its cocoon in spring.",
);
a(
  "Enable",
  "To make possible or provide means.",
  "This app will enable you to track your fitness goals.",
);
a(
  "Encounter",
  "To meet or come across.",
  "You may encounter wild animals on the nature trail.",
);
a(
  "Encourage",
  "To give support or confidence.",
  "Good teachers encourage their students to try new things.",
);
a(
  "Engage",
  "To take part in or attract.",
  "Games can engage students in learning more effectively.",
);
a(
  "Enjoy",
  "To take pleasure in something.",
  "We enjoy spending time together as a family.",
);
a(
  "Ensure",
  "To make certain something happens.",
  "Please double-check to ensure all doors are locked.",
);
a(
  "Enter",
  "To go into or start.",
  "You must enter the building through the main door.",
);
a(
  "Escape",
  "To get free from a place.",
  "The cat managed to escape through the open window.",
);
a(
  "Establish",
  "To set up or create.",
  "They plan to establish a new branch in the city.",
);
a(
  "Estimate",
  "To make a rough calculation.",
  "Can you estimate how long the journey will take?",
);
a(
  "Elaborate",
  "To add more detail.",
  "The speaker asked us to elaborate on our ideas.",
);
a(
  "Emphasize",
  "To give special importance to.",
  "The teacher tried to emphasize the key points of the lesson.",
);
a(
  "Enhance",
  "To improve the quality of.",
  "Adding music can enhance the atmosphere of a film.",
);
a(
  "Evaluate",
  "To judge the quality or value.",
  "Experts evaluate the safety of the building every year.",
);
a(
  "Examine",
  "To look at closely or test.",
  "The doctor will examine the patient this afternoon.",
);
a(
  "Expand",
  "To become or make larger.",
  "The company plans to expand into new markets.",
);
a(
  "Expire",
  "To come to an end or die.",
  "Your passport will expire at the end of the year.",
);
a(
  "Expose",
  "To uncover or reveal to.",
  "Do not expose your skin to the sun for too long.",
);

// ── F ──
a(
  "Fall",
  "To move downward quickly.",
  "Be careful on the ice or you might fall down.",
);
a(
  "Feed",
  "To give food to a person or animal.",
  "She gets up early to feed the chickens.",
);
a(
  "Feel",
  "To experience an emotion or sensation.",
  "I feel happy when the sun is shining.",
);
a(
  "Fight",
  "To struggle or battle against someone.",
  "The two boxers will fight for the title tonight.",
);
a(
  "Find",
  "To discover or locate something.",
  "I hope to find my lost keys soon.",
);
a(
  "Flee",
  "To run away from danger.",
  "The villagers had to flee before the flood arrived.",
);
a(
  "Fling",
  "To throw something with force.",
  "He would fling his coat on the chair after work.",
);
a(
  "Fly",
  "To move through the air.",
  "Birds fly south when the weather gets cold.",
);
a(
  "Forbear",
  "To hold back or refrain.",
  "Please forbear from interrupting the speaker.",
);
a(
  "Forbid",
  "To order someone not to do something.",
  "The rules forbid running in the hallways.",
);
a(
  "Forget",
  "To be unable to remember.",
  "Do not forget to lock the door when you leave.",
);
a(
  "Forgive",
  "To stop feeling angry about a wrong.",
  "It takes courage to forgive someone who hurt you.",
);
a(
  "Forsake",
  "To abandon or give up.",
  "She would never forsake her family in times of need.",
);
a(
  "Freeze",
  "To become ice or very cold.",
  "Water will freeze when the temperature drops below zero.",
);
a(
  "Face",
  "To confront or be opposite.",
  "We must face the problem and find a solution.",
);
a(
  "Fail",
  "To not succeed in doing.",
  "If you do not study, you may fail the exam.",
);
a(
  "Fasten",
  "To close or attach securely.",
  "Please fasten your seatbelt during take-off and landing.",
);
a(
  "Fill",
  "To make full of something.",
  "Fill the glass with water and drink slowly.",
);
a(
  "Finish",
  "To bring to an end.",
  "I need to finish this report before the deadline.",
);
a(
  "Fix",
  "To repair or make correct.",
  "The technician can fix your computer by tomorrow.",
);
a(
  "Follow",
  "To go behind or obey.",
  "Please follow the signs to find the exit.",
);
a(
  "Force",
  "To make someone do something.",
  "You cannot force a child to eat food they dislike.",
);
a(
  "Facilitate",
  "To make a process easier.",
  "Good software can facilitate teamwork across departments.",
);
a(
  "Feature",
  "To include as an important part.",
  "The magazine will feature an interview with the actor.",
);
a(
  "Focus",
  "To give full attention to.",
  "Try to focus on one task at a time for best results.",
);
a(
  "Formulate",
  "To create or prepare carefully.",
  "The team will formulate a plan for the project.",
);
a(
  "Function",
  "To work or operate properly.",
  "The machine does not function without batteries.",
);

// ── G ──
a(
  "Gainsay",
  "To deny or contradict a statement.",
  "Nobody could gainsay the evidence presented in court.",
);
a(
  "Get",
  "To receive or obtain something.",
  "I need to get a new phone because mine is broken.",
);
a(
  "Gild",
  "To cover with a thin layer of gold.",
  "The craftsman will gild the picture frame for the museum.",
);
a(
  "Gird",
  "To fasten or prepare for action.",
  "The knight would gird his sword before going into battle.",
);
a(
  "Give",
  "To hand something to someone.",
  "Please give this letter to your teacher.",
);
a(
  "Go",
  "To move from one place to another.",
  "Let us go to the park after lunch.",
);
a(
  "Grind",
  "To crush into very small pieces.",
  "You need to grind the coffee beans before brewing.",
);
a(
  "Grow",
  "To become larger or develop.",
  "The plants grow faster in warm weather.",
);
a(
  "Gain",
  "To get more of something.",
  "Regular exercise helps you gain strength and energy.",
);
a(
  "Gather",
  "To bring together in one place.",
  "Let us gather all the information before the meeting.",
);
a(
  "Grab",
  "To take hold of quickly.",
  "She had to grab her bag and run for the bus.",
);
a(
  "Guess",
  "To give an answer without knowing.",
  "Can you guess how old the building is?",
);
a(
  "Guide",
  "To show the way or direct.",
  "A map can guide you through the nature reserve.",
);
a(
  "Generate",
  "To produce or create.",
  "Wind turbines generate electricity without pollution.",
);
a(
  "Grant",
  "To agree to give or allow.",
  "The government may grant permission for the new road.",
);
a(
  "Guarantee",
  "To promise something will happen.",
  "We guarantee delivery within two business days.",
);

// ── H ──
a(
  "Hang",
  "To fix something from above.",
  "Please hang your coat on the hook by the door.",
);
a(
  "Have",
  "To possess or own something.",
  "I have two sisters and one brother.",
);
a(
  "Hear",
  "To perceive sound through the ears.",
  "I could hear music coming from the next room.",
);
a(
  "Heave",
  "To lift or throw with great effort.",
  "The sailors had to heave the anchor onto the deck.",
);
a(
  "Hew",
  "To chop or cut with an axe.",
  "The woodcutter would hew logs for the fireplace.",
);
a(
  "Hide",
  "To put out of sight or conceal.",
  "The children like to hide behind the sofa during games.",
);
a(
  "Hit",
  "To strike or come into contact with.",
  "He managed to hit the target on his first try.",
);
a(
  "Hold",
  "To keep something in your hands.",
  "Please hold the door open for the next person.",
);
a("Hurt", "To cause pain or injury.", "Falling off a bike can really hurt.");
a(
  "Help",
  "To make it easier for someone.",
  "Can you help me move these chairs to the hall?",
);
a(
  "Happen",
  "To take place or occur.",
  "Strange things happen when the moon is full.",
);
a(
  "Hate",
  "To strongly dislike something.",
  "I hate waiting in long queues at the supermarket.",
);
a(
  "Hope",
  "To want something to happen.",
  "I hope the weather is nice for our picnic tomorrow.",
);
a(
  "Hurry",
  "To move or do quickly.",
  "We need to hurry or we will miss the train.",
);
a(
  "Handle",
  "To deal with or manage.",
  "She can handle difficult situations very calmly.",
);
a(
  "Hesitate",
  "To pause before doing something.",
  "Do not hesitate to call if you need any help.",
);
a(
  "Highlight",
  "To draw attention to something.",
  "Use a marker to highlight the most important sentences.",
);

// ── I ──
a(
  "Input",
  "To enter data into a system.",
  "You need to input your password to access the account.",
);
a(
  "Inlay",
  "To set pieces into a surface.",
  "The artist will inlay pieces of shell into the wooden box.",
);
a(
  "Imagine",
  "To form a picture in the mind.",
  "Can you imagine living on another planet?",
);
a(
  "Ignore",
  "To pay no attention to.",
  "You should not ignore warning signs on the road.",
);
a(
  "Invite",
  "To ask someone to come.",
  "We want to invite all our friends to the wedding.",
);
a(
  "Identify",
  "To recognise or name correctly.",
  "The witness was able to identify the suspect.",
);
a(
  "Improve",
  "To make or become better.",
  "Reading every day will improve your vocabulary.",
);
a(
  "Include",
  "To make part of a group.",
  "The price does not include breakfast at the hotel.",
);
a(
  "Increase",
  "To make or become greater.",
  "The company plans to increase production next year.",
);
a(
  "Indicate",
  "To point out or show.",
  "The red light will indicate when the oven is hot.",
);
a(
  "Influence",
  "To have an effect on.",
  "Music can influence your mood throughout the day.",
);
a(
  "Inform",
  "To tell or give information.",
  "Please inform the office if you cannot attend.",
);
a("Insist", "To demand firmly.", "She will insist on checking every detail.");
a(
  "Install",
  "To set up for use.",
  "The technician will install the new software today.",
);
a(
  "Intend",
  "To plan or mean to do.",
  "I intend to finish the course by the end of the month.",
);
a(
  "Introduce",
  "To present someone or something.",
  "Let me introduce you to my new colleague.",
);
a(
  "Invest",
  "To put money into for profit.",
  "She decided to invest in property when prices were low.",
);
a(
  "Involve",
  "To include as a necessary part.",
  "The project will involve working with a large team.",
);
a(
  "Illustrate",
  "To explain with pictures or examples.",
  "The diagram helps to illustrate the main concept.",
);
a(
  "Implement",
  "To put a plan into action.",
  "The school will implement the new rules next term.",
);
a(
  "Imply",
  "To suggest without stating directly.",
  "His silence seemed to imply that he agreed.",
);
a(
  "Incorporate",
  "To include as part of something.",
  "The design will incorporate traditional and modern styles.",
);
a(
  "Initiate",
  "To start or begin a process.",
  "The company will initiate a review of its policies.",
);
a(
  "Inspect",
  "To look at closely and carefully.",
  "Officials inspect the factory twice a year for safety.",
);
a(
  "Integrate",
  "To combine into a unified whole.",
  "The school aims to integrate technology into every class.",
);
a(
  "Interpret",
  "To explain the meaning of.",
  "It is not always easy to interpret foreign poetry.",
);
a(
  "Investigate",
  "To examine carefully to find facts.",
  "Police will investigate the cause of the accident.",
);
a(
  "Isolate",
  "To set apart from others.",
  "Scientists isolate the virus to study it safely.",
);

// ── J ──
a(
  "Jump",
  "To push off the ground with feet.",
  "The children jump rope in the playground.",
);
a(
  "Jog",
  "To run at a slow steady pace.",
  "She likes to jog around the lake every morning.",
);
a(
  "Join",
  "To become a member or connect.",
  "Would you like to join our club this year?",
);
a(
  "Judge",
  "To form an opinion or decide.",
  "Do not judge people based on first impressions.",
);
a(
  "Justify",
  "To show good reason for.",
  "You need to justify your answer with evidence.",
);

// ── K ──
a(
  "Keep",
  "To continue to have or hold.",
  "You should keep your promises to your friends.",
);
a(
  "Kneel",
  "To go down on one or both knees.",
  "The gardener had to kneel on the ground to plant seeds.",
);
a(
  "Knit",
  "To make fabric using yarn and needles.",
  "My grandmother likes to knit scarves in winter.",
);
a(
  "Know",
  "To have information or be aware.",
  "I know the answer to that question.",
);
a(
  "Kick",
  "To strike with the foot.",
  "He can kick the football over forty metres.",
);
a(
  "Kiss",
  "To touch with the lips.",
  "She leaned over to kiss the baby on the cheek.",
);
a(
  "Kill",
  "To cause the death of.",
  "Frost can kill young plants in the garden.",
);
a(
  "Knock",
  "To strike a surface to make noise.",
  "Please knock on the door before entering.",
);

// ── L ──
a(
  "Lade",
  "To load cargo onto a ship.",
  "The workers lade the ship with heavy crates of goods.",
);
a(
  "Lay",
  "To put something down flat.",
  "Please lay the books on the table carefully.",
);
a(
  "Lead",
  "To show the way or be in charge.",
  "She was chosen to lead the team this season.",
);
a(
  "Lean",
  "To rest against something for support.",
  "He likes to lean against the wall while waiting.",
);
a(
  "Leap",
  "To jump a long distance.",
  "The cat can leap over the garden fence easily.",
);
a(
  "Learn",
  "To gain knowledge or skill.",
  "Children learn new words every single day.",
);
a(
  "Leave",
  "To go away from a place.",
  "We need to leave the house by seven o'clock.",
);
a(
  "Lend",
  "To give something temporarily.",
  "Could you lend me your pen for a moment?",
);
a(
  "Let",
  "To allow or permit something.",
  "Please let the children play in the garden.",
);
a(
  "Lie",
  "To be in a flat position.",
  "I like to lie on the beach and listen to the waves.",
);
a(
  "Light",
  "To make something start burning.",
  "She used a match to light the candle on the table.",
);
a("Lose", "To no longer have something.", "Try not to lose your keys again.");
a(
  "Love",
  "To feel deep affection for.",
  "She will always love her family no matter what.",
);
a(
  "Look",
  "To direct the eyes at.",
  "Look at the beautiful sunset over the mountain.",
);
a(
  "Lack",
  "To not have enough of.",
  "Many schools lack the resources for modern equipment.",
);
a(
  "Land",
  "To arrive on the ground.",
  "The plane will land in about twenty minutes.",
);
a("Last", "To continue for a time.", "The concert will last about two hours.");
a(
  "Laugh",
  "To make sounds showing amusement.",
  "His funny stories always make everyone laugh.",
);
a(
  "Lift",
  "To raise to a higher position.",
  "Can you help me lift this heavy suitcase?",
);
a(
  "Like",
  "To find pleasant or enjoyable.",
  "I like reading books in my free time.",
);
a(
  "Listen",
  "To give attention to sound.",
  "Please listen carefully to the instructions.",
);
a(
  "Live",
  "To be alive or reside.",
  "They live in a small apartment near the city centre.",
);
a(
  "Load",
  "To put things into or onto.",
  "We need to load the groceries into the car.",
);
a(
  "Lock",
  "To secure with a key.",
  "Always lock the door when you leave the house.",
);
a(
  "Launch",
  "To start or send off.",
  "The company will launch a new product next month.",
);
a(
  "Limit",
  "To set a maximum on.",
  "The diet plan helps to limit sugar intake.",
);
a(
  "Link",
  "To make a connection between.",
  "The new railway will link the two cities.",
);
a(
  "Locate",
  "To find the position of.",
  "Can you locate the nearest petrol station on the map?",
);

// ── M ──
a(
  "Make",
  "To create or produce something.",
  "Let us make a cake for the birthday party.",
);
a(
  "Mean",
  "To intend or have a meaning.",
  "What does this word mean in English?",
);
a(
  "Meet",
  "To come together or see someone.",
  "We arranged to meet outside the cinema at seven.",
);
a(
  "Melt",
  "To change from solid to liquid.",
  "The ice cream will melt if you leave it in the sun.",
);
a(
  "Mislay",
  "To lose something temporarily.",
  "I always mislay my glasses around the house.",
);
a(
  "Mislead",
  "To give a wrong idea or impression.",
  "The false advertisement was designed to mislead buyers.",
);
a(
  "Misspell",
  "To spell a word incorrectly.",
  "Many students misspell the word 'necessary'.",
);
a(
  "Mistake",
  "To identify wrongly or misunderstand.",
  "It is easy to mistake salt for sugar in the kitchen.",
);
a(
  "Misunderstand",
  "To fail to understand correctly.",
  "People often misunderstand what I am trying to say.",
);
a(
  "Mow",
  "To cut grass with a machine.",
  "He has to mow the lawn every weekend in summer.",
);
a(
  "Move",
  "To change position or location.",
  "We plan to move to a bigger house next year.",
);
a(
  "Maintain",
  "To keep in good condition.",
  "It is important to maintain your car regularly.",
);
a(
  "Manage",
  "To be in charge of or cope.",
  "She will manage the department while the boss is away.",
);
a(
  "Mark",
  "To make a visible sign on.",
  "Use a pen to mark the correct answers.",
);
a(
  "Match",
  "To be equal to or go with.",
  "The shoes match the colour of her dress perfectly.",
);
a(
  "Matter",
  "To be important.",
  "It does not matter if you make a mistake while learning.",
);
a(
  "Measure",
  "To find the size or amount of.",
  "Use a ruler to measure the length of the table.",
);
a(
  "Mention",
  "To speak about briefly.",
  "Did she mention what time the event starts?",
);
a(
  "Mind",
  "To feel bothered by or take care.",
  "Do you mind if I open the window?",
);
a(
  "Miss",
  "To fail to catch or feel sad about.",
  "I really miss my friends from school.",
);
a("Mix", "To combine together.", "Mix the flour and sugar before adding eggs.");
a(
  "Monitor",
  "To watch and check progress.",
  "Nurses monitor the patient's heart rate closely.",
);
a(
  "Motivate",
  "To give someone a reason to act.",
  "A good coach can motivate the team to play better.",
);

// ── N ──
a(
  "Need",
  "To require or must have.",
  "Plants need sunlight and water to grow.",
);
a(
  "Note",
  "To pay attention to or write down.",
  "Please note the change of date for the meeting.",
);
a(
  "Notice",
  "To become aware of something.",
  "Did you notice the new painting in the hallway?",
);
a(
  "Name",
  "To give a title or identify.",
  "They decided to name the baby after her grandmother.",
);
a(
  "Negotiate",
  "To discuss to reach an agreement.",
  "The two sides will negotiate the terms of the deal.",
);
a(
  "Neglect",
  "To fail to care for properly.",
  "You should never neglect your health.",
);
a(
  "Notify",
  "To officially inform someone.",
  "The school will notify parents if classes are cancelled.",
);
a(
  "Nourish",
  "To provide food for growth.",
  "A balanced diet can nourish both body and mind.",
);
a(
  "Nurse",
  "To care for a sick person.",
  "She stayed home to nurse her child back to health.",
);
a(
  "Navigate",
  "To find a way through.",
  "GPS helps drivers navigate unfamiliar roads safely.",
);

// ── O ──
a(
  "Open",
  "To make no longer closed.",
  "Please open the window to let some fresh air in.",
);
a(
  "Own",
  "To have as one's property.",
  "Do you own a car or do you use public transport?",
);
a(
  "Order",
  "To ask for goods or arrange.",
  "We can order food online and have it delivered.",
);
a(
  "Offer",
  "To present for acceptance.",
  "He decided to offer his seat to the elderly woman.",
);
a(
  "Organize",
  "To arrange or plan carefully.",
  "She likes to organize her desk at the start of each day.",
);
a(
  "Observe",
  "To watch carefully.",
  "Scientists observe animal behaviour in the wild.",
);
a(
  "Owe",
  "To be required to pay.",
  "I owe my friend ten dollars for lunch yesterday.",
);
a(
  "Obtain",
  "To get or acquire.",
  "You need to obtain a visa before travelling there.",
);
a(
  "Occupy",
  "To fill or take up space.",
  "The new office will occupy the entire third floor.",
);
a(
  "Occur",
  "To happen or take place.",
  "Accidents often occur at busy intersections.",
);
a(
  "Offend",
  "To cause someone to feel upset.",
  "I did not mean to offend you with my comment.",
);
a(
  "Operate",
  "To control or run a machine.",
  "Only trained staff may operate the heavy machinery.",
);
a(
  "Oppose",
  "To disagree with or resist.",
  "Many citizens oppose the plan to build a motorway.",
);
a(
  "Outbid",
  "To offer more money than another.",
  "She managed to outbid everyone at the auction.",
);
a(
  "Outdo",
  "To do better than someone else.",
  "He always tries to outdo his classmates in tests.",
);
a(
  "Outfight",
  "To fight better than an opponent.",
  "The smaller boxer managed to outfight his rival.",
);
a(
  "Outgo",
  "To go beyond or surpass.",
  "Expenses should not outgo the monthly budget.",
);
a(
  "Outgrow",
  "To grow too large for something.",
  "Children outgrow their shoes very quickly.",
);
a(
  "Outrun",
  "To run faster than someone.",
  "The rabbit can easily outrun the tortoise.",
);
a(
  "Outsell",
  "To sell more than a competitor.",
  "That novel continues to outsell all others this year.",
);
a(
  "Outshine",
  "To be much better than others.",
  "Her talent allowed her to outshine every other player.",
);
a(
  "Overbear",
  "To dominate or press down on.",
  "A good leader should not overbear the team members.",
);
a(
  "Overcast",
  "To cover with clouds.",
  "Dark clouds overcast the sky before the storm.",
);
a(
  "Overcome",
  "To succeed in dealing with a problem.",
  "She worked hard to overcome her fear of heights.",
);
a(
  "Overdo",
  "To do something too much.",
  "Be careful not to overdo the exercise on your first day.",
);
a(
  "Overdraw",
  "To take more money than available.",
  "You will be charged a fee if you overdraw your account.",
);
a(
  "Overeat",
  "To eat more than needed.",
  "It is easy to overeat at a buffet restaurant.",
);
a(
  "Overfly",
  "To fly over a place.",
  "The plane will overfly the mountains on its way south.",
);
a(
  "Overhang",
  "To extend out over something below.",
  "The large tree branches overhang the narrow path.",
);
a(
  "Overhear",
  "To hear a conversation by accident.",
  "I did not mean to overhear their private conversation.",
);
a(
  "Overlay",
  "To cover the surface of something.",
  "They overlay the floor with beautiful wooden tiles.",
);
a(
  "Overpay",
  "To pay more than the correct amount.",
  "The company tends to overpay for raw materials.",
);
a(
  "Overrun",
  "To spread over in large numbers.",
  "Weeds can overrun a garden if left unattended.",
);
a(
  "Oversee",
  "To watch over and manage work.",
  "Her job is to oversee the entire production process.",
);
a(
  "Oversell",
  "To sell more than what is available.",
  "Airlines sometimes oversell seats on popular flights.",
);
a(
  "Overshoot",
  "To go past the intended point.",
  "The car went too fast and began to overshoot the exit.",
);
a(
  "Oversleep",
  "To sleep longer than planned.",
  "I set two alarms so I do not oversleep again.",
);
a(
  "Overspread",
  "To spread over a wide area.",
  "Fog began to overspread the valley at dawn.",
);
a(
  "Overtake",
  "To pass a moving vehicle or person.",
  "The fast car tried to overtake the lorry on the motorway.",
);
a(
  "Overthrow",
  "To remove a ruler from power.",
  "The rebels plotted to overthrow the government.",
);
a(
  "Overwork",
  "To work too hard or too much.",
  "Doctors warn that you should not overwork yourself.",
);

// ── P ──
a(
  "Partake",
  "To take part in an activity.",
  "Everyone is welcome to partake in the celebration.",
);
a(
  "Pay",
  "To give money for goods or services.",
  "You can pay with cash or card at the counter.",
);
a(
  "Plead",
  "To make an emotional request.",
  "The mother had to plead with the child to eat vegetables.",
);
a(
  "Preset",
  "To set controls in advance.",
  "You can preset the oven temperature before cooking.",
);
a(
  "Proofread",
  "To read text and correct errors.",
  "Always proofread your essay before you submit it.",
);
a(
  "Prove",
  "To show that something is true.",
  "The experiment was designed to prove the theory correct.",
);
a(
  "Put",
  "To move something to a position.",
  "Please put your bags under the seat in front of you.",
);
a(
  "Play",
  "To take part in a game.",
  "The children play football after school every day.",
);
a(
  "Paint",
  "To apply colour to a surface.",
  "We plan to paint the living room walls blue.",
);
a(
  "Plan",
  "To decide on and arrange.",
  "Let us plan a trip to the beach for next weekend.",
);
a("Push", "To press against to move.", "Push the button to start the machine.");
a("Pull", "To draw towards yourself.", "Pull the handle to open the drawer.");
a(
  "Pack",
  "To fill a bag or case.",
  "Remember to pack warm clothes for the mountain trip.",
);
a(
  "Park",
  "To leave a vehicle in a place.",
  "You can park your car behind the building.",
);
a(
  "Pass",
  "To go past or succeed.",
  "The bus will pass the school on its way downtown.",
);
a(
  "Perform",
  "To do or carry out an action.",
  "The band will perform at the festival on Saturday.",
);
a(
  "Phone",
  "To call someone on the telephone.",
  "I will phone you as soon as I get the results.",
);
a(
  "Pick",
  "To choose or gather.",
  "Pick the ripe tomatoes from the garden for dinner.",
);
a(
  "Plant",
  "To put seeds or plants in soil.",
  "We plant new trees every spring in the park.",
);
a(
  "Point",
  "To direct attention with a finger.",
  "She raised her hand to point at the map on the wall.",
);
a(
  "Participate",
  "To take part in an activity.",
  "All students are encouraged to participate in sports.",
);
a(
  "Perceive",
  "To become aware through senses.",
  "Some people perceive colours differently from others.",
);
a(
  "Persuade",
  "To convince someone to do.",
  "He tried to persuade his friend to join the team.",
);
a(
  "Predict",
  "To say what will happen.",
  "Experts predict that temperatures will rise this summer.",
);
a(
  "Preserve",
  "To keep safe or in good condition.",
  "National parks help to preserve wildlife habitats.",
);
a(
  "Proceed",
  "To continue or go forward.",
  "After the break, we will proceed to the next topic.",
);
a(
  "Promote",
  "To help grow or raise in rank.",
  "The company will promote her to senior manager.",
);
a(
  "Propose",
  "To put forward an idea.",
  "I would like to propose a toast to the happy couple.",
);
a(
  "Pursue",
  "To follow or try to achieve.",
  "She decided to pursue a career in medicine.",
);

// ── Q ──
a(
  "Quit",
  "To stop doing something or leave.",
  "She decided to quit her job and go travelling.",
);
a(
  "Question",
  "To ask about or express doubt.",
  "Students often question the reasoning behind the rules.",
);
a(
  "Qualify",
  "To meet requirements or standards.",
  "She had to qualify for the finals before Saturday.",
);
a(
  "Quote",
  "To repeat someone's exact words.",
  "He likes to quote famous philosophers in his speeches.",
);
a(
  "Quarrel",
  "To have an angry disagreement.",
  "Neighbours sometimes quarrel about noise late at night.",
);
a("Queue", "To wait in a line.", "People queue at the bus stop every morning.");
a(
  "Quiet",
  "To make or become silent.",
  "The teacher asked the class to quiet down before starting.",
);

// ── R ──
a(
  "Read",
  "To look at and understand written words.",
  "I like to read a good book before going to sleep.",
);
a(
  "Rebind",
  "To bind again or differently.",
  "The bookbinder will rebind the antique volume carefully.",
);
a(
  "Rebuild",
  "To build something again after damage.",
  "After the earthquake, they had to rebuild the whole city.",
);
a(
  "Recast",
  "To cast or mould again.",
  "The director chose to recast the lead role for the sequel.",
);
a(
  "Redo",
  "To do something again.",
  "She had to redo the assignment because of errors.",
);
a(
  "Rehear",
  "To hear a legal case again.",
  "The court agreed to rehear the appeal next month.",
);
a(
  "Remake",
  "To make something again.",
  "Hollywood tends to remake classic films every decade.",
);
a(
  "Rend",
  "To tear apart violently.",
  "The explosion could rend the metal wall to pieces.",
);
a(
  "Repay",
  "To pay back money owed.",
  "He promised to repay the loan within two years.",
);
a(
  "Reread",
  "To read something again.",
  "I need to reread the chapter to understand the theory.",
);
a(
  "Rerun",
  "To broadcast or run again.",
  "The channel will rerun the popular series next month.",
);
a(
  "Resell",
  "To sell something bought.",
  "Some people resell concert tickets at higher prices.",
);
a(
  "Resend",
  "To send something again.",
  "Please resend the email as I did not receive it.",
);
a(
  "Reset",
  "To set back to the original state.",
  "You may need to reset your password if you forget it.",
);
a(
  "Resit",
  "To take an examination again.",
  "Students who fail can resit the exam in September.",
);
a(
  "Retake",
  "To take again or recapture.",
  "She plans to retake the driving test next month.",
);
a(
  "Retell",
  "To tell a story again.",
  "Children love it when you retell their favourite tales.",
);
a(
  "Rethink",
  "To think again about a plan.",
  "The failure forced them to rethink their strategy.",
);
a(
  "Retread",
  "To put a new tread on a tyre.",
  "The garage can retread old tyres to save money.",
);
a(
  "Rewrite",
  "To write again in a different way.",
  "The editor asked her to rewrite the final chapter.",
);
a(
  "Rid",
  "To make free of something unwanted.",
  "We need to rid the garden of weeds before planting.",
);
a(
  "Ride",
  "To sit on and control a moving thing.",
  "She learned to ride a bicycle when she was five.",
);
a(
  "Ring",
  "To make a bell sound.",
  "The phone will ring when someone calls you.",
);
a(
  "Rise",
  "To move upward or get up.",
  "The sun will rise at six o'clock tomorrow morning.",
);
a(
  "Rive",
  "To split or tear apart.",
  "The lightning can rive a tree trunk in two.",
);
a(
  "Run",
  "To move quickly on foot.",
  "I like to run in the park every morning.",
);
a(
  "Rest",
  "To relax or stop activity.",
  "You should rest for a while after a long walk.",
);
a(
  "Remember",
  "To bring back to mind.",
  "Do you remember the name of our first teacher?",
);
a(
  "Rain",
  "To fall as water drops from clouds.",
  "It always seems to rain on the weekend.",
);
a(
  "Raise",
  "To lift up or increase.",
  "The school will raise funds for a new library.",
);
a(
  "React",
  "To respond to something.",
  "How did she react when she heard the news?",
);
a(
  "Realize",
  "To become fully aware of.",
  "I did not realize how late it was until the alarm went off.",
);
a(
  "Recognize",
  "To know from before.",
  "I could not recognize him after so many years.",
);
a(
  "Recommend",
  "To suggest as good or suitable.",
  "I recommend this restaurant for its excellent pasta.",
);
a(
  "Reflect",
  "To think deeply or show an image.",
  "The lake reflects the mountains on a calm day.",
);
a(
  "Reduce",
  "To make smaller or less.",
  "We should all try to reduce food waste at home.",
);
a(
  "Refer",
  "To mention or direct to.",
  "Please refer to the manual for more information.",
);
a(
  "Refuse",
  "To say no to something.",
  "She had to refuse the offer because of other plans.",
);
a(
  "Register",
  "To officially sign up.",
  "You need to register for the course before it fills up.",
);
a(
  "Regulate",
  "To control by rules.",
  "Laws regulate the speed limit on public roads.",
);
a(
  "Reinforce",
  "To make stronger or more certain.",
  "Practice will reinforce what you have learned today.",
);
a(
  "Reject",
  "To refuse to accept.",
  "They decided to reject the proposed changes.",
);
a(
  "Relate",
  "To make a connection between.",
  "Can you relate this topic to your own experience?",
);
a(
  "Rely",
  "To depend on with confidence.",
  "You can rely on me to finish the job on time.",
);
a(
  "Require",
  "To need or demand.",
  "This recipe will require three eggs and some flour.",
);
a(
  "Resemble",
  "To look or seem like.",
  "The twin sisters resemble each other so closely.",
);
a(
  "Resolve",
  "To find an answer to a problem.",
  "We need to resolve this issue before the deadline.",
);
a(
  "Respond",
  "To reply or answer.",
  "Please respond to the email by the end of the day.",
);
a(
  "Restore",
  "To bring back to original state.",
  "Experts will restore the old painting in the museum.",
);
a(
  "Retain",
  "To keep or continue to hold.",
  "Try to retain the key facts for the exam.",
);
a(
  "Reveal",
  "To make known or show.",
  "The final chapter will reveal the identity of the thief.",
);

// ── S ──
a(
  "Saw",
  "To cut something using a saw.",
  "He used a large saw to cut the wooden plank in half.",
);
a(
  "Say",
  "To speak words out loud.",
  "What did you say? I could not hear you clearly.",
);
a(
  "See",
  "To perceive with the eyes.",
  "Can you see the bird sitting on that branch?",
);
a(
  "Seek",
  "To try to find or obtain something.",
  "Many young people seek better opportunities abroad.",
);
a(
  "Sell",
  "To exchange goods for money.",
  "They sell fresh fruit at the market every Saturday.",
);
a(
  "Send",
  "To cause something to go to a place.",
  "I will send you an email with all the details.",
);
a(
  "Set",
  "To put in a particular position.",
  "Please set the table for dinner tonight.",
);
a(
  "Sew",
  "To join pieces of cloth with a needle.",
  "She can sew a button back on in just a few minutes.",
);
a(
  "Shake",
  "To move quickly back and forth.",
  "Before opening, shake the bottle to mix the contents.",
);
a(
  "Shear",
  "To cut wool from a sheep.",
  "Farmers shear their sheep in late spring each year.",
);
a(
  "Shed",
  "To lose or let fall naturally.",
  "Trees shed their leaves in the autumn season.",
);
a(
  "Shine",
  "To give off or reflect light.",
  "The stars shine brightly on a clear night.",
);
a(
  "Shoe",
  "To fit a horse with metal shoes.",
  "The blacksmith can shoe a horse in under an hour.",
);
a(
  "Shoot",
  "To fire a weapon or take a photo.",
  "The photographer wanted to shoot the sunset over the lake.",
);
a(
  "Show",
  "To let someone see something.",
  "Let me show you how to use the new software.",
);
a(
  "Shrink",
  "To become smaller in size.",
  "Wool clothes can shrink if washed in hot water.",
);
a(
  "Shrive",
  "To hear a confession and give absolution.",
  "The priest would shrive the faithful before the feast.",
);
a(
  "Shut",
  "To close something firmly.",
  "Please shut the window before it starts to rain.",
);
a(
  "Sing",
  "To make music with the voice.",
  "The children love to sing songs in the morning.",
);
a(
  "Sink",
  "To go down below a surface.",
  "Heavy objects will sink to the bottom of the pool.",
);
a(
  "Sit",
  "To rest with weight on the bottom.",
  "Please sit down and make yourself comfortable.",
);
a(
  "Slay",
  "To kill in a violent way.",
  "The hero set out to slay the dragon in the old tale.",
);
a(
  "Sleep",
  "To rest with eyes closed.",
  "Most adults need about eight hours to sleep well.",
);
a(
  "Slide",
  "To move smoothly along a surface.",
  "The children like to slide down the hill on sleds.",
);
a(
  "Sling",
  "To throw or hang loosely.",
  "He would sling his bag over his shoulder every morning.",
);
a(
  "Slink",
  "To move quietly and secretly.",
  "The cat would slink through the garden at night.",
);
a(
  "Slit",
  "To make a long narrow cut.",
  "Use a knife to slit the envelope open carefully.",
);
a(
  "Smell",
  "To sense odour through the nose.",
  "I can smell fresh bread coming from the bakery.",
);
a(
  "Smite",
  "To strike with great force.",
  "The hammer can smite the nail into the wall.",
);
a(
  "Sow",
  "To plant seeds in the ground.",
  "Farmers sow wheat in the fields every autumn.",
);
a("Speak", "To talk or say words.", "She can speak three languages fluently.");
a(
  "Speed",
  "To move or travel very fast.",
  "Emergency vehicles speed through the streets with sirens on.",
);
a(
  "Spell",
  "To name the letters of a word.",
  "Can you spell your surname for me, please?",
);
a(
  "Spend",
  "To use money or time.",
  "How much did you spend on your holiday last year?",
);
a(
  "Spill",
  "To accidentally let liquid fall.",
  "Be careful not to spill the coffee on the keyboard.",
);
a(
  "Spin",
  "To turn around quickly.",
  "The washing machine will spin the clothes to remove water.",
);
a(
  "Spit",
  "To force liquid from the mouth.",
  "It is not polite to spit on the ground in public.",
);
a(
  "Split",
  "To divide into parts.",
  "Let us split the bill equally between us.",
);
a(
  "Spoil",
  "To damage or treat too kindly.",
  "Too much rain can spoil the outdoor event.",
);
a(
  "Spread",
  "To extend over a larger area.",
  "She used a knife to spread butter on the toast.",
);
a(
  "Spring",
  "To jump or move suddenly.",
  "Flowers spring up in the garden every March.",
);
a(
  "Stand",
  "To be on your feet.",
  "Please stand up when the teacher enters the room.",
);
a(
  "Stave",
  "To break a hole in or prevent.",
  "Quick action can stave off a bigger problem later.",
);
a(
  "Steal",
  "To take something without permission.",
  "It is wrong to steal from other people.",
);
a(
  "Stick",
  "To attach or fix in position.",
  "Use glue to stick the photo onto the poster.",
);
a(
  "Sting",
  "To cause a sharp pain.",
  "Bees can sting you if you disturb their hive.",
);
a(
  "Stink",
  "To have a very bad smell.",
  "The rubbish will stink if you leave it out in the heat.",
);
a(
  "Strew",
  "To scatter things over an area.",
  "The wind can strew leaves across the entire garden.",
);
a(
  "Stride",
  "To walk with long steps.",
  "He would stride confidently across the stage.",
);
a(
  "Strike",
  "To hit forcefully or take action.",
  "Lightning can strike the same place more than once.",
);
a(
  "String",
  "To put on a string or thread.",
  "She likes to string beads to make necklaces.",
);
a(
  "Strive",
  "To try very hard to achieve.",
  "Students should strive to do their best in every exam.",
);
a(
  "Sunburn",
  "To get skin damage from the sun.",
  "Fair skin can sunburn in just fifteen minutes.",
);
a(
  "Swear",
  "To promise seriously or use bad words.",
  "I swear to tell the truth in front of the court.",
);
a(
  "Sweat",
  "To release moisture from the skin.",
  "You tend to sweat more during intense exercise.",
);
a(
  "Sweep",
  "To clean a floor with a broom.",
  "Please sweep the kitchen floor after cooking.",
);
a(
  "Swell",
  "To become larger or rounder.",
  "An insect bite can make your skin swell up.",
);
a(
  "Swim",
  "To move through water.",
  "We love to swim in the lake during summer holidays.",
);
a(
  "Swing",
  "To move back and forth.",
  "The children swing on the playground set every afternoon.",
);
a(
  "Smile",
  "To show happiness with the face.",
  "She always has a reason to smile during the day.",
);
a(
  "Save",
  "To keep safe or store.",
  "It is wise to save some money every month.",
);
a(
  "Score",
  "To gain points in a game.",
  "He managed to score two goals in the match.",
);
a(
  "Scream",
  "To cry out loudly.",
  "The fans scream with excitement when their team scores.",
);
a(
  "Search",
  "To look carefully for something.",
  "Police search the area for any clues.",
);
a(
  "Select",
  "To choose carefully.",
  "Please select your preferred date from the list.",
);
a(
  "Serve",
  "To provide food or work for.",
  "The waiter will serve your table in a moment.",
);
a(
  "Share",
  "To give part of to others.",
  "Children learn to share their toys with friends.",
);
a(
  "Shop",
  "To buy things from a store.",
  "We usually shop for groceries on Saturday.",
);
a(
  "Sign",
  "To write your name officially.",
  "Please sign the document at the bottom of the page.",
);
a(
  "Start",
  "To begin doing something.",
  "Classes start at eight thirty in the morning.",
);
a(
  "Stay",
  "To remain in a place.",
  "We decided to stay at the hotel for two nights.",
);
a(
  "Stop",
  "To cease moving or doing.",
  "Stop talking when the teacher enters the room.",
);
a(
  "Study",
  "To learn about a subject.",
  "She needs to study hard for the final exams.",
);
a(
  "Satisfy",
  "To meet needs or make happy.",
  "The meal was big enough to satisfy everyone.",
);
a(
  "Settle",
  "To resolve or make a home.",
  "They plan to settle in the countryside after retiring.",
);
a(
  "Shift",
  "To move or change position.",
  "Public opinion began to shift after the debate.",
);
a(
  "Solve",
  "To find the answer to.",
  "The detective worked all night to solve the mystery.",
);
a(
  "Specify",
  "To state clearly and exactly.",
  "Please specify which size and colour you prefer.",
);
a(
  "Submit",
  "To present for consideration.",
  "Students must submit their essays before Friday.",
);
a(
  "Succeed",
  "To achieve a desired goal.",
  "If you work hard, you will succeed in life.",
);
a(
  "Suggest",
  "To propose an idea.",
  "I suggest we leave early to avoid the traffic.",
);
a(
  "Supply",
  "To provide what is needed.",
  "Farms supply fresh produce to local markets.",
);
a(
  "Support",
  "To hold up or help.",
  "Friends and family support each other in difficult times.",
);
a(
  "Survive",
  "To continue to live.",
  "Only the strongest plants survive the winter frost.",
);
a(
  "Sustain",
  "To keep going or maintain.",
  "Good nutrition helps sustain energy throughout the day.",
);
a(
  "Stimulate",
  "To encourage activity or interest.",
  "Puzzles stimulate the brain and improve memory.",
);
a(
  "Strengthen",
  "To make or become stronger.",
  "Exercise can strengthen your muscles and bones.",
);

// ── T ──
a(
  "Take",
  "To get hold of or carry.",
  "Do not forget to take your umbrella today.",
);
a(
  "Teach",
  "To help someone learn something.",
  "She wants to teach English at a primary school.",
);
a(
  "Tear",
  "To pull apart or rip.",
  "Do not tear the pages out of the library book.",
);
a(
  "Tell",
  "To communicate information to someone.",
  "Can you tell me the time, please?",
);
a(
  "Think",
  "To use the mind to consider.",
  "I need some time to think about your offer.",
);
a(
  "Thrive",
  "To grow or develop well.",
  "Plants thrive when they get enough sunlight and water.",
);
a(
  "Throw",
  "To send through the air.",
  "He can throw the ball over fifty metres easily.",
);
a(
  "Thrust",
  "To push suddenly and hard.",
  "The fencer tried to thrust the sword at the target.",
);
a(
  "Tread",
  "To walk or step on something.",
  "Be careful not to tread on the wet paint.",
);
a(
  "Talk",
  "To speak with someone.",
  "We should sit down and talk about the problem.",
);
a(
  "Try",
  "To make an effort to do.",
  "Always try your best, even when things are hard.",
);
a(
  "Taste",
  "To sense flavour in the mouth.",
  "This soup will taste better with a little salt.",
);
a("Thank", "To express gratitude.", "I want to thank you for all your help.");
a(
  "Touch",
  "To put a hand on something.",
  "Do not touch the wet paint on the wall.",
);
a(
  "Travel",
  "To go on a journey.",
  "Many people travel abroad during the summer holidays.",
);
a(
  "Trust",
  "To believe someone is reliable.",
  "You can trust her to keep your secret safe.",
);
a(
  "Turn",
  "To change direction or rotate.",
  "Turn left at the traffic lights to reach the station.",
);
a(
  "Type",
  "To write using a keyboard.",
  "She can type very fast without looking at the keys.",
);
a(
  "Target",
  "To aim at or select as goal.",
  "The campaign will target young voters in the city.",
);
a(
  "Tend",
  "To be likely to behave in a way.",
  "Prices tend to rise during the holiday season.",
);
a(
  "Threaten",
  "To warn of harm.",
  "Dark clouds threaten rain later this afternoon.",
);
a(
  "Transfer",
  "To move from one place to another.",
  "You can transfer money from your phone.",
);
a(
  "Transform",
  "To change completely.",
  "Technology can transform the way we learn.",
);
a(
  "Treat",
  "To behave towards or give care.",
  "Doctors treat patients with kindness and respect.",
);
a(
  "Tackle",
  "To deal with a difficult problem.",
  "The team needs to tackle the budget issue first.",
);
a(
  "Tolerate",
  "To accept without complaint.",
  "She cannot tolerate loud noise when studying.",
);
a(
  "Trigger",
  "To cause something to start.",
  "Stress can trigger headaches or other health problems.",
);

// ── U ──
a(
  "Unbend",
  "To straighten out or relax.",
  "Try to unbend and relax after a stressful day at work.",
);
a(
  "Unbind",
  "To unfasten or set free.",
  "The rescuers managed to unbind the ropes around his hands.",
);
a(
  "Underbid",
  "To bid lower than a competitor.",
  "The new company tried to underbid all the other firms.",
);
a(
  "Undergo",
  "To experience or endure.",
  "Patients undergo several tests before the operation.",
);
a(
  "Underlie",
  "To be the hidden cause of.",
  "Many factors underlie the rise in housing prices.",
);
a(
  "Underpay",
  "To pay less than what is fair.",
  "It is illegal to underpay workers below minimum wage.",
);
a(
  "Undersell",
  "To sell at a lower price.",
  "Online shops often undersell traditional high street stores.",
);
a(
  "Understand",
  "To grasp the meaning of.",
  "I understand the instructions now, thank you.",
);
a(
  "Undertake",
  "To begin or commit to a task.",
  "She agreed to undertake the research project.",
);
a(
  "Underwrite",
  "To guarantee financial support.",
  "The bank will underwrite the new insurance policy.",
);
a(
  "Undo",
  "To reverse a previous action.",
  "Press this button to undo the last change you made.",
);
a(
  "Undraw",
  "To open curtains by pulling.",
  "She went to undraw the curtains and let in the light.",
);
a(
  "Ungird",
  "To remove a belt or strap.",
  "The soldier would ungird his armour after the march.",
);
a(
  "Unhang",
  "To take down from a hanging position.",
  "We need to unhang the old paintings for cleaning.",
);
a(
  "Unknit",
  "To undo something knitted.",
  "She had to unknit three rows to fix the dropped stitch.",
);
a(
  "Unlearn",
  "To forget or discard learned behaviour.",
  "It is hard to unlearn bad habits once they are formed.",
);
a(
  "Unmake",
  "To destroy what has been made.",
  "The decision could unmake years of careful planning.",
);
a(
  "Unsay",
  "To take back words already spoken.",
  "You cannot unsay hurtful words once they are spoken.",
);
a(
  "Unstick",
  "To free from being stuck.",
  "Heat can help to unstick a label from a glass jar.",
);
a(
  "Unstring",
  "To remove the string from.",
  "The musician had to unstring the guitar for repair.",
);
a(
  "Unweave",
  "To undo woven fabric.",
  "She decided to unweave the cloth and start over.",
);
a(
  "Unwrite",
  "To erase or cancel writing.",
  "You cannot unwrite what has already been published.",
);
a(
  "Uphold",
  "To maintain or support.",
  "Courts uphold the right to free speech in many countries.",
);
a(
  "Upset",
  "To make someone worried or unhappy.",
  "Loud noises can upset young children easily.",
);
a(
  "Use",
  "To do something with a tool or item.",
  "You can use a dictionary to check spelling.",
);
a(
  "Update",
  "To make more recent.",
  "Please update your contact details on the system.",
);
a(
  "Upload",
  "To transfer data to a server.",
  "You can upload photos to the cloud for safe storage.",
);
a(
  "Unite",
  "To join together as one.",
  "Music has the power to unite people from all cultures.",
);
a("Unlock", "To open a lock.", "Use your key to unlock the front door.");
a(
  "Unpack",
  "To take things out of a case.",
  "Let us unpack the suitcases as soon as we arrive.",
);
a(
  "Urge",
  "To strongly advise or push.",
  "Doctors urge people to drink more water daily.",
);
a(
  "Undermine",
  "To weaken or damage secretly.",
  "Gossip can undermine trust between colleagues.",
);
a(
  "Utilize",
  "To make use of something.",
  "We should utilize all available resources wisely.",
);

// ── V ──
a(
  "Visit",
  "To go to see a person or place.",
  "We plan to visit our grandparents this weekend.",
);
a(
  "Value",
  "To consider important or useful.",
  "Teachers value hard work and honest effort.",
);
a(
  "Vanish",
  "To disappear suddenly.",
  "The fog made the buildings vanish from sight.",
);
a(
  "Vary",
  "To differ or change.",
  "Prices vary depending on the season and location.",
);
a(
  "Verify",
  "To check something is true.",
  "Please verify your email address to complete registration.",
);
a(
  "View",
  "To look at or consider.",
  "Millions of people view the video online every day.",
);
a(
  "Vote",
  "To choose by ballot.",
  "Citizens vote in the election every four years.",
);
a(
  "Volunteer",
  "To offer to do without pay.",
  "Many students volunteer at the local hospital.",
);
a(
  "Validate",
  "To confirm as correct.",
  "The system will validate your ticket automatically.",
);
a(
  "Violate",
  "To break a rule or law.",
  "Drivers who violate speed limits receive a fine.",
);
a(
  "Venture",
  "To dare to go or do.",
  "Few people venture into the jungle after dark.",
);

// ── W ──
a(
  "Wake",
  "To stop sleeping.",
  "I usually wake up at seven o'clock on weekdays.",
);
a(
  "Waylay",
  "To stop and attack or delay.",
  "Reporters tried to waylay the celebrity at the airport.",
);
a(
  "Wear",
  "To have clothing on the body.",
  "You should wear a warm coat in cold weather.",
);
a(
  "Weave",
  "To make cloth by crossing threads.",
  "The artisan can weave beautiful rugs by hand.",
);
a(
  "Wed",
  "To marry someone.",
  "They plan to wed in a small ceremony next spring.",
);
a(
  "Weep",
  "To cry tears of sadness.",
  "The sad ending of the film made many people weep.",
);
a(
  "Wet",
  "To make something damp with water.",
  "Wet the cloth before wiping the dusty surface.",
);
a(
  "Win",
  "To be the best in a contest.",
  "Our school team hopes to win the championship this year.",
);
a(
  "Wind",
  "To turn something round and round.",
  "You need to wind the clock every morning.",
);
a(
  "Withdraw",
  "To take money out or move back.",
  "You can withdraw cash from any bank machine.",
);
a(
  "Withhold",
  "To keep back or refuse to give.",
  "The company chose to withhold the results until Friday.",
);
a(
  "Withstand",
  "To resist or endure something.",
  "The building was designed to withstand strong earthquakes.",
);
a(
  "Wring",
  "To squeeze and twist to remove water.",
  "Wring out the wet towel before hanging it up to dry.",
);
a(
  "Write",
  "To put words on paper or a screen.",
  "She likes to write poems in her free time.",
);
a(
  "Wait",
  "To stay until something happens.",
  "Please wait here until the doctor calls your name.",
);
a("Walk", "To move on foot.", "I walk to school every day for exercise.");
a(
  "Want",
  "To desire or wish for.",
  "What do you want for your birthday this year?",
);
a(
  "Warn",
  "To tell about possible danger.",
  "Signs warn swimmers about the strong currents.",
);
a("Wash", "To clean with water.", "Please wash your hands before eating.");
a(
  "Watch",
  "To look at for a period of time.",
  "We love to watch films together on Friday nights.",
);
a(
  "Wave",
  "To move the hand as greeting.",
  "She turned to wave goodbye as the train left.",
);
a(
  "Weigh",
  "To find how heavy something is.",
  "The butcher will weigh the meat before pricing it.",
);
a(
  "Welcome",
  "To greet warmly on arrival.",
  "The host will welcome guests at the entrance.",
);
a(
  "Whisper",
  "To speak very softly.",
  "He leaned over to whisper a secret in her ear.",
);
a(
  "Wish",
  "To want something to be true.",
  "I wish I could speak more languages fluently.",
);
a("Work", "To do a job or activity.", "Most adults work five days a week.");
a(
  "Worry",
  "To feel anxious about something.",
  "Try not to worry about things you cannot control.",
);
a(
  "Wander",
  "To walk without a fixed route.",
  "They like to wander through the old part of the city.",
);
a(
  "Witness",
  "To see an event take place.",
  "Several people witnessed the accident on the highway.",
);

// ── X, Y, Z ──
a(
  "X-ray",
  "To examine using special radiation.",
  "The hospital will X-ray your arm to check for a fracture.",
);
a(
  "Yawn",
  "To open the mouth wide when tired.",
  "Students tend to yawn during long afternoon lectures.",
);
a(
  "Yell",
  "To shout very loudly.",
  "The coach had to yell so the players could hear him.",
);
a(
  "Yield",
  "To give way or produce results.",
  "The experiment should yield interesting results.",
);
a(
  "Zip",
  "To close with a zipper.",
  "Zip up your jacket before going outside in the cold.",
);
a(
  "Zoom",
  "To move quickly or enlarge.",
  "The camera can zoom in on distant objects clearly.",
);

// Write the dictionary
fs.writeFileSync(
  path.join(process.cwd(), "scripts", "verb-dictionary.json"),
  JSON.stringify(D, null, 2),
  "utf8",
);
console.log(
  `Written ${Object.keys(D).length} verb entries to scripts/verb-dictionary.json`,
);
