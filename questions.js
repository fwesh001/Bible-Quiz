// Bible Quiz Questions

/*+++++++++++
FIELDS;
1. QUESTION.
2. OPTIONS.
3. CORRECT.
4. REFERENCE.
5. FACT.
6. DIFFICULTY.
+++++++++++++*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
QUESTION    =>   QUESTION OBVIOUSLY.
OPTIONS     =>   LIST OF OPTIONS.
C0RRECT     =>   THE CORRECT ANSWER USING A F0R 0, B FOR 1, C FOR 2, D FOR 3.
REFERENCE   =>   WHERE THE QUESTION IS GOTTEN FROM OR PROVE.
FACT        =>   AMAZING THINGS ABOUT THE QUESTION OR ADDITIONAL INFO.
DIFFICULTY  =>   HOW HARD OR EASY THE QUESTION MAYBE.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const bibleQuestions = [

  /*-----------------------
         NORMAL
  ------------------------*/

  //========================================
  // OLD TESTAMENT NORMAL [HEBREW SCRIPTURE]
  //==============================================

  // Genesis
  {
    question: "Who built the ark of salvation?",
    options: ["Noah", "Moses", "Abraham", "David"],
    correct: 0,
    reference: "Genesis 6:14",
    fact: "Jehovah instructed Noah to build the ark to preserve his family and the animals.",
    category: "OLD TESTAMENT"
  },
  {
    "question": "How many wives did Abraham have?",
    "options": ["1", "2", "3", "4"],
    "correct": 2,
    "reference": "Genesis 16:1; 25:1",
    "fact": "Abraham had three women who bore him children: Sarah, Hagar and Keturah.",
    "category": "OLD TESTAMENT"
},
  {
    question: "Who was the first man created by Jehovah?",
    options: ["Adam", "Seth", "Enoch", "Cain"],
    correct: 0,
    reference: "Genesis 2:7",
    fact: "Jehovah formed Adam from the dust and breathed the breath of life into him.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who was the first woman created by Jehovah?",
    options: ["Eve", "Sarah", "Rebekah", "Leah"],
    correct: 0,
    reference: "Genesis 2:22",
    fact: "Jehovah made Eve from one of Adam's ribs to be his helper.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who was the first murderer in the Bible?",
    options: ["Cain", "Abel", "Lamech", "Esau"],
    correct: 0,
    reference: "Genesis 4:8",
    fact: "Cain killed his brother Abel out of jealousy.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who was the father of Noah?",
    options: ["Enoch", "Seth", "Lamech", "Methuselah"],
    correct: 2,
    reference: "Genesis 5:28",
    fact: "Lamech was Noah's father and a descendant of Adam.",
    category: "OLD TESTAMENT"
  },

  // Exodus
  {
    question: "Who led the Israelites out of Egypt by Jehovah’s power?",
    options: ["Joshua", "Moses", "Aaron", "Joseph"],
    correct: 1,
    reference: "Exodus 3–14",
    fact: "Jehovah raised up Moses to deliver Israel from slavery in Egypt.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What did Moses use to part the Red Sea?",
    options: ["A staff", "A wind", "An angel", "A cloud"],
    correct: 0,
    reference: "Exodus 14:21",
    fact: "Jehovah instructed Moses to stretch out his staff over the sea, and a strong east wind parted the waters.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who was the first high priest of Israel?",
    options: ["Aaron", "Eleazar", "Phinehas", "Ithamar"],
    correct: 0,
    reference: "Exodus 28:1",
    fact: "Jehovah appointed Aaron, Moses' brother, as the first high priest.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What did the Israelites eat in the wilderness?",
    options: ["Manna", "Quail", "Bread", "Fish"],
    correct: 0,
    reference: "Exodus 16:31",
    fact: "Jehovah provided manna from heaven to sustain the Israelites during their journey.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What was the sign of the covenant between Jehovah and Israel?",
    options: ["The rainbow", "The Sabbath", "The Ark", "The altar"],
    correct: 1,
    reference: "Exodus 31:16",
    fact: "Jehovah established the Sabbath as a perpetual covenant sign.",
    category: "OLD TESTAMENT"
  },

  // Leviticus
  {
    question: "Who was the first high priest of Israel?",
    options: ["Aaron", "Eleazar", "Phinehas", "Ithamar"],
    correct: 0,
    reference: "Leviticus 8:1–12",
    fact: "Jehovah consecrated Aaron and his sons as priests to serve at the tabernacle.",
    category: "OLD TESTAMENT"
  },
  
  {
    question: "What did Jehovah require for a sin offering?",
    options: ["A lamb", "A goat", "A bull", "A dove"],
    correct: 2,
    reference: "Leviticus 4:3",
    fact: "Jehovah specified a bull without defect for a sin offering.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What was the penalty for blasphemy?",
    options: ["Exile", "Flogging", "Death", "Restitution"],
    correct: 2,
    reference: "Leviticus 24:16",
    fact: "Blasphemy was considered a capital offense under the Law of Moses.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What was the purpose of the Feast of Tabernacles?",
    options: ["To celebrate the harvest", "To remember the Exodus", "To honor the priesthood", "To atone for sins"],
    correct: 1,
    reference: "Leviticus 23:34–43",
    fact: "The Feast of Tabernacles commemorated the Israelites' dwelling in booths during their journey in the wilderness.",
    category: "OLD TESTAMENT"
  },

  // Numbers
  {
    question: "Who was the leader of the tribe of Judah during the wilderness journey?",
    options: ["Caleb", "Joshua", "Moses", "Aaron"],
    correct: 0,
    reference: "Numbers 2:3",
    fact: "Caleb was the leader of the tribe of Judah and one of the twelve spies sent to Canaan.",
    category: "OLD TESTAMENT"
  },
  {
    question: "How many spies did Moses send to explore Canaan?",
    options: ["10", "12", "14", "20"],
    correct: 1,
    reference: "Numbers 13:1–16",
    fact: "Moses sent twelve spies, one from each tribe, to explore the land of Canaan.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who opposed Moses and Aaron during their leadership?",
    options: ["Korah", "Dathan", "Abiram", "All of the above"],
    correct: 3,
    reference: "Numbers 16:1–35",
    fact: "Korah, Dathan, and Abiram led a rebellion against Moses and Aaron, resulting in their destruction.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What was the punishment for the Israelites' lack of faith at Kadesh-Barnea?",
    options: ["Wandering for 40 years", "Exile", "Death", "Famine"],
    correct: 0,
    reference: "Numbers 14:26–35",
    fact: "Jehovah decreed that the Israelites would wander in the wilderness for 40 years due to their lack of faith.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who succeeded Moses as leader of Israel?",
    options: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    correct: 0,
    reference: "Numbers 27:18–23",
    fact: "Jehovah appointed Joshua to succeed Moses as leader of Israel.",
    category: "OLD TESTAMENT"
  },

  // Deuteronomy
  {
    question: "What is the first commandment in the Ten Commandments?",
    options: ["You shall have no other gods", "Honor your father and mother", "Do not murder", "Do not steal"],
    correct: 0,
    reference: "Deuteronomy 5:7",
    fact: "Jehovah commands exclusive devotion to Him as the only true God.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What was the penalty for adultery under the Law?",
    options: ["Exile", "Flogging", "Death", "Restitution"],
    correct: 2,
    reference: "Deuteronomy 22:22",
    fact: "Adultery was considered a capital offense under the Law of Moses.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What did Moses do when he received the tablets of the Law?",
    options: ["He broke them", "He placed them in the Ark", "He read them aloud", "He built an altar"],
    correct: 0,
    reference: "Deuteronomy 9:17",
    fact: "Moses broke the tablets in anger when he saw the Israelites worshiping the golden calf.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who succeeded Moses as leader of Israel?",
    options: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    correct: 0,
    reference: "Deuteronomy 34:9",
    fact: "Jehovah appointed Joshua to succeed Moses as leader of Israel.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What did Moses command the Israelites to do with the Law?",
    options: ["Keep it", "Teach it", "Meditate on it", "All of the above"],
    correct: 3,
    reference: "Deuteronomy 6:6–7",
    fact: "Moses instructed the Israelites to keep, teach, and meditate on Jehovah's commandments.",
    category: "OLD TESTAMENT"
  },

  // Joshua
  {
    question: "Who led Israel after Moses' death?",
    options: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    correct: 0,
    reference: "Joshua 1:1–2",
    fact: "Jehovah appointed Joshua to lead Israel after Moses' death.",
    category: "OLD TESTAMENT"
  },
  {
    question: "What city did the Israelites conquer first in the Promised Land?",
    options: ["Jericho", "Ai", "Hebron", "Bethel"],
    correct: 0,
    reference: "Joshua 6:20",
    fact: "The walls of Jericho fell after the Israelites marched around them as Jehovah commanded.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who was the faithful spy from the tribe of Judah?",
    options: ["Caleb", "Joshua", "Moses", "Aaron"],
    correct: 0,
    reference: "Joshua 14:6–12",
    fact: "Caleb trusted in Jehovah and was rewarded with the land promised to him.",
    category: "OLD TESTAMENT"
  },

  // Judges
  {
    question: "Who delivered Israel from the Midianites with only 300 men?",
    options: ["Gideon", "Samson", "Deborah", "Ehud"],
    correct: 0,
    reference: "Judges 7:7",
    fact: "Gideon followed Jehovah's instructions and defeated the Midianites.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who killed Sisera, commander of the Canaanite army?",
    options: ["Deborah", "Jael", "Gideon", "Ehud"],
    correct: 1,
    reference: "Judges 4:21",
    fact: "Jael killed Sisera by driving a tent peg through his head.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Which judge had supernatural strength?",
    options: ["Samson", "Gideon", "Jephthah", "Ehud"],
    correct: 0,
    reference: "Judges 16:30",
    fact: "Samson’s strength came from Jehovah as long as he did not cut his hair.",
    category: "OLD TESTAMENT"
  },

  // Ruth
  {
    question: "Who was Naomi's daughter-in-law who stayed with her?",
    options: ["Ruth", "Orpah", "Leah", "Miriam"],
    correct: 0,
    reference: "Ruth 1:16",
    fact: "Ruth loyally stayed with Naomi and eventually married Boaz.",
    category: "OLD TESTAMENT"
  },

  // 1 Samuel
  {
    question: "Who anointed Saul as Israel's first king?",
    options: ["Samuel", "Nathan", "Elijah", "Gideon"],
    correct: 0,
    reference: "1 Samuel 10:1",
    fact: "Samuel, acting by Jehovah’s direction, anointed Saul.",
    category: "OLD TESTAMENT"
  },
  {
    question: "Who defeated Goliath?",
    options: ["Saul", "David", "Jonathan", "Samuel"],
    correct: 1,
    reference: "1 Samuel 17:50",
    fact: "David trusted in Jehovah and killed Goliath with a sling and a stone.",
    category: "OLD TESTAMENT"
  },

  // 2 Samuel
  {
    question: "Who became king after Saul died?",
    options: ["David", "Solomon", "Absalom", "Jonathan"],
    correct: 0,
    reference: "2 Samuel 5:3",
    fact: "David was anointed king over Israel after Saul's death.",
    category: "OLD TESTAMENT"
  },

  // 1 Kings
  {
    question: "Who asked Jehovah for wisdom rather than riches?",
    options: ["Solomon", "David", "Elijah", "Josiah"],
    correct: 0,
    reference: "1 Kings 3:9",
    fact: "Solomon requested wisdom to govern Jehovah’s people.",
    category: "OLD TESTAMENT"
  },

  // 2 Kings
  {
    question: "Who was taken up to heaven in a whirlwind?",
    options: ["Elijah", "Elisha", "Isaiah", "Moses"],
    correct: 0,
    reference: "2 Kings 2:11",
    fact: "Elijah was taken directly to heaven in a whirlwind with a chariot of fire.",
    category: "OLD TESTAMENT"
  },

  // 1 Chronicles
  {
    question: "Who was king and wrote many psalms?",
    options: ["David", "Solomon", "Saul", "Josiah"],
    correct: 0,
    reference: "1 Chronicles 16:7–36",
    fact: "David organized worship and wrote psalms to praise Jehovah.",
    category: "OLD TESTAMENT"
  },

  // 2 Chronicles
  {
    question: "Which king built the temple in Jerusalem?",
    options: ["Hezekiah", "Josiah", "Solomon", "Jehoshaphat"],
    correct: 2,
    reference: "2 Chronicles 3:1",
    fact: "Solomon built the temple on Mount Moriah according to Jehovah’s instructions.",
    category: "OLD TESTAMENT"
  },

  // Ezra
  {
    question: "Who led the exiles back to Jerusalem?",
    options: ["Ezra", "Nehemiah", "Zerubbabel", "Haggai"],
    correct: 2,
    reference: "Ezra 2:1–2",
    fact: "Zerubbabel led the first group of Jews returning from Babylonian exile.",
    category: "OLD TESTAMENT"
  },

  // Nehemiah
  {
    question: "Who supervised the rebuilding of Jerusalem’s walls?",
    options: ["Nehemiah", "Ezra", "Zerubbabel", "Haggai"],
    correct: 0,
    reference: "Nehemiah 2:17",
    fact: "Nehemiah organized the people to rebuild the walls under Jehovah’s guidance.",
    category: "OLD TESTAMENT"
  },

  // Esther
  {
    question: "Who became queen of Persia and saved the Jews?",
    options: ["Esther", "Vashti", "Mordecai", "Abigail"],
    correct: 0,
    reference: "Esther 4:14",
    fact: "Esther risked her life to intercede with the king for her people.",
    category: "OLD TESTAMENT"
  },

  // Job
  {
    question: "Who endured great suffering but remained faithful to Jehovah?",
    options: ["Job", "Eliphaz", "Bildad", "Zophar"],
    correct: 0,
    reference: "Job 1:1–22",
    fact: "Job maintained faith in Jehovah despite severe trials.",
    category: "OLD TESTAMENT"
  },

  // Psalms
  {
    question: "Which psalm begins with 'The earth is Jehovah’s'?",
    options: ["Psalm 24", "Psalm 23", "Psalm 119", "Psalm 1"],
    correct: 0,
    reference: "Psalm 24:1",
    fact: "Psalm 24 emphasizes Jehovah’s ownership of the earth and glory.",
    category: "OLD TESTAMENT"
  },

  // Proverbs
  {
    question: "Where can we find 'Trust in Jehovah with all your heart'?",
    options: ["Proverbs 3:5", "Proverbs 1:7", "Proverbs 16:3", "Proverbs 4:23"],
    correct: 0,
    reference: "Proverbs 3:5",
    fact: "This proverb encourages complete reliance on Jehovah rather than human understanding.",
    category: "OLD TESTAMENT"
  },

  // Ecclesiastes
  {
    question: "Who wrote 'All is meaningless'?",
    options: ["Qoheleth", "Solomon", "David", "Isaiah"],
    correct: 0,
    reference: "Ecclesiastes 1:2",
    fact: "Qoheleth reflects on the vanity of worldly pursuits without Jehovah.",
    category: "OLD TESTAMENT"
  },

  // Song of Solomon
  {
    question: "Which book contains love poems often attributed to Solomon?",
    options: ["Song of Songs", "Psalms", "Proverbs", "Ecclesiastes"],
    correct: 0,
    reference: "Song of Solomon 1:1",
    fact: "This book celebrates love and is attributed to Solomon.",
    category: "OLD TESTAMENT"
  },

  // Isaiah
  {
    question: "Who prophesied about the Messiah coming from Bethlehem?",
    options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    correct: 0,
    reference: "Isaiah 7:14",
    fact: "Isaiah foretold that a virgin would give birth to Immanuel.",
    category: "OLD TESTAMENT"
  },

  // Jeremiah
  {
    question: "Which prophet warned Jerusalem before the Babylonian exile?",
    options: ["Jeremiah", "Isaiah", "Ezekiel", "Daniel"],
    correct: 0,
    reference: "Jeremiah 1:4–10",
    fact: "Jeremiah prophesied about Jerusalem's destruction and urged repentance.",
    category: "OLD TESTAMENT"
  },

  // Lamentations
  {
    question: "Which book laments the fall of Jerusalem?",
    options: ["Lamentations", "Jeremiah", "Ezekiel", "Isaiah"],
    correct: 0,
    reference: "Lamentations 1:1",
    fact: "The book mourns the city’s destruction and exile.",
    category: "OLD TESTAMENT"
  },

  // Ezekiel
  {
    question: "Who saw visions by the river Chebar?",
    options: ["Ezekiel", "Jeremiah", "Isaiah", "Daniel"],
    correct: 0,
    reference: "Ezekiel 1:1–28",
    fact: "Ezekiel witnessed vivid visions while among the exiles in Babylon.",
    category: "OLD TESTAMENT"
  },

  // Daniel
  {
    question: "Who interpreted King Nebuchadnezzar’s dreams?",
    options: ["Daniel", "Shadrach", "Meshach", "Abednego"],
    correct: 0,
    reference: "Daniel 2:24–49",
    fact: "Daniel gave God’s interpretation of the king’s dreams.",
    category: "OLD TESTAMENT"
  },

  // Hosea
  {
    question: "Which prophet was commanded to marry a woman of harlotry?",
    options: ["Hosea", "Joel", "Amos", "Micah"],
    correct: 0,
    reference: "Hosea 1:2",
    fact: "Hosea’s marriage symbolized Israel’s unfaithfulness to Jehovah.",
    category: "OLD TESTAMENT"
  },

  // Joel
  {
    question: "Which prophet spoke about the outpouring of Jehovah’s spirit?",
    options: ["Joel", "Amos", "Hosea", "Obadiah"],
    correct: 0,
    reference: "Joel 2:28",
    fact: "Joel prophesied that Jehovah’s spirit would be poured on all people.",
    category: "OLD TESTAMENT"
  },
  // Amos
{
  question: "Which prophet warned Israel about injustice and false worship?",
  options: ["Amos", "Hosea", "Joel", "Micah"],
  correct: 0,
  reference: "Amos 5:24",
  fact: "Amos called Israel to let justice flow like a river and righteousness like a stream.",
  category: "OLD TESTAMENT"
},

// Obadiah
{
  question: "Which prophet condemned Edom for its pride and cruelty?",
  options: ["Obadiah", "Amos", "Joel", "Micah"],
  correct: 0,
  reference: "Obadiah 1:1–21",
  fact: "Obadiah prophesied against Edom for rejoicing over Israel’s fall.",
  category: "OLD TESTAMENT"
},

// Jonah
{
  question: "Which prophet was sent to preach to Nineveh?",
  options: ["Jonah", "Hosea", "Amos", "Micah"],
  correct: 0,
  reference: "Jonah 1:1–2",
  fact: "Jehovah commanded Jonah to go to Nineveh and proclaim repentance.",
  category: "OLD TESTAMENT"
},

// Micah
{
  question: "Which prophet spoke of Bethlehem as the birthplace of the Messiah?",
  options: ["Micah", "Isaiah", "Jeremiah", "Ezekiel"],
  correct: 0,
  reference: "Micah 5:2",
  fact: "Micah prophesied that the ruler of Israel would come from Bethlehem.",
  category: "OLD TESTAMENT"
},

// Nahum
{
  question: "Which prophet foretold Nineveh’s destruction?",
  options: ["Nahum", "Jonah", "Habakkuk", "Zephaniah"],
  correct: 0,
  reference: "Nahum 1:1–15",
  fact: "Nahum predicted the downfall of Nineveh because of its wickedness.",
  category: "OLD TESTAMENT"
},

// Habakkuk
{
  question: "Which prophet questioned Jehovah about the prosperity of the wicked?",
  options: ["Habakkuk", "Zephaniah", "Haggai", "Malachi"],
  correct: 0,
  reference: "Habakkuk 1:2–4",
  fact: "Habakkuk asked why injustice and violence went unpunished.",
  category: "OLD TESTAMENT"
},

// Zephaniah
{
  question: "Which prophet warned of the coming 'Day of Jehovah'?",
  options: ["Zephaniah", "Haggai", "Malachi", "Habakkuk"],
  correct: 0,
  reference: "Zephaniah 1:14–18",
  fact: "Zephaniah foretold a day of judgment for Judah and the nations.",
  category: "OLD TESTAMENT"
},

// Haggai
{
  question: "Which prophet encouraged the Jews to rebuild Jehovah’s temple?",
  options: ["Haggai", "Zechariah", "Malachi", "Joel"],
  correct: 0,
  reference: "Haggai 1:7–15",
  fact: "Haggai motivated the returned exiles to rebuild the temple in Jerusalem.",
  category: "OLD TESTAMENT"
},

// Zechariah
{
  question: "Which prophet had visions encouraging the temple’s completion?",
  options: ["Zechariah", "Haggai", "Malachi", "Joel"],
  correct: 0,
  reference: "Zechariah 1:7–17",
  fact: "Zechariah’s visions promised Jehovah’s protection and blessings for Jerusalem.",
  category: "OLD TESTAMENT"
},

// Malachi
{
  question: "Which prophet foretold the coming of a messenger before Jehovah’s day?",
  options: ["Malachi", "Zechariah", "Haggai", "Joel"],
  correct: 0,
  reference: "Malachi 3:1",
  fact: "Malachi predicted the arrival of a messenger who would prepare people for Jehovah’s intervention.",
  category: "OLD TESTAMENT"
},


   //======================================
  //NEW TESTAMENT NORMAL [GREEK SCRIPTURE]
  //=============================================

  // Matthew
  {
    question: "Where was Jesus born?",
    options: ["Nazareth", "Bethlehem", "Jerusalem", "Capernaum"],
    correct: 1,
    reference: "Luke 2:4–7",
    fact: "Jesus was born in Bethlehem, fulfilling the prophecy of Micah 5:2.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who baptized Jesus?",
    options: ["Peter", "John the Baptist", "James", "Paul"],
    correct: 1,
    reference: "Matthew 3:13–17",
    fact: "John baptized Jesus in the Jordan River, after which the heavens opened.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did Jesus say is the greatest commandment?",
    options: ["Love God with all your heart", "Love your neighbor", "Do not steal", "Honor your parents"],
    correct: 0,
    reference: "Matthew 22:37–38",
    fact: "Jesus said to love Jehovah with all your heart, soul, and mind is the greatest commandment.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who visited Jesus at his birth?",
    options: ["Shepherds", "Wise men", "John", "Peter"],
    correct: 1,
    reference: "Matthew 2:1–12",
    fact: "Wise men from the east came to worship the newborn King of the Jews.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did Jesus feed with five loaves and two fish?",
    options: ["5000 men", "500 women", "4000 men", "12 disciples"],
    correct: 0,
    reference: "Matthew 14:17–21",
    fact: "Jesus miraculously fed about 5,000 men plus women and children.",
    category: "NEW TESTAMENT"
  },
  

  // Mark
  {
    question: "Who did Jesus raise from the dead?",
    options: ["Lazarus", "Jairus' daughter", "The widow's son", "All of the above"],
    correct: 3,
    reference: "Mark 5:41–42; John 11:43–44",
    fact: "Jesus demonstrated his power over death by raising multiple individuals.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who walked on water to meet Jesus?",
    options: ["Peter", "John", "James", "Matthew"],
    correct: 0,
    reference: "Mark 6:48–49",
    fact: "Peter walked on water toward Jesus but began to sink when he doubted.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did Jesus do for the sick?",
    options: ["He healed them", "He prayed for them", "He ignored them", "He baptized them"],
    correct: 0,
    reference: "Mark 1:34",
    fact: "Jesus healed many who were sick, showing compassion and power.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who recognized Jesus as the Son of God at his baptism?",
    options: ["John", "Peter", "Matthew", "James"],
    correct: 0,
    reference: "Mark 1:11",
    fact: "A voice from heaven declared Jesus as God’s Son.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What parable did Jesus teach about lost sheep?",
    options: ["Parable of the Lost Sheep", "Parable of the Talents", "Parable of the Sower", "Parable of the Good Samaritan"],
    correct: 0,
    reference: "Mark 15:4; Luke 15:4–7",
    fact: "Jesus emphasized that Jehovah rejoices when a sinner repents, like finding a lost sheep.",
    category: "NEW TESTAMENT"
  },

  // Luke
  {
    question: "Who visited Mary to announce Jesus' birth?",
    options: ["Gabriel", "Michael", "Peter", "John the Baptist"],
    correct: 0,
    reference: "Luke 1:26–31",
    fact: "Angel Gabriel told Mary she would conceive Jesus by Jehovah’s power.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did Jesus do in the temple at age 12?",
    options: ["Taught the elders", "Prayed silently", "Observed quietly", "Fled from teachers"],
    correct: 0,
    reference: "Luke 2:46–47",
    fact: "Jesus taught the elders and amazed them with his understanding.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did the angels announce to the shepherds?",
    options: ["Jesus’ birth", "A new king", "The Passover", "Judgment day"],
    correct: 0,
    reference: "Luke 2:10–12",
    fact: "Angels proclaimed the birth of the Savior, Christ the Lord.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What parable taught about the prodigal son?",
    options: ["Parable of the Lost Son", "Parable of the Good Samaritan", "Parable of the Sower", "Parable of the Talents"],
    correct: 0,
    reference: "Luke 15:11–32",
    fact: "Jesus illustrated Jehovah���s forgiveness through the story of the prodigal son.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who prepared the way for Jesus?",
    options: ["John the Baptist", "Peter", "Paul", "James"],
    correct: 0,
    reference: "Luke 3:3",
    fact: "John preached repentance to prepare people for the coming of the Messiah.",
    category: "NEW TESTAMENT"
  },

  // John
  {
    question: "Who did Jesus say he is in John 14:6?",
    options: ["The way, the truth, and the life", "A prophet", "A teacher", "The king of Israel"],
    correct: 0,
    reference: "John 14:6",
    fact: "Jesus declared he is the only way to Jehovah and eternal life.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What miracle did Jesus perform at Cana?",
    options: ["Turned water into wine", "Healed a blind man", "Walked on water", "Fed the 5,000"],
    correct: 0,
    reference: "John 2:1–11",
    fact: "Jesus turned water into wine, showing his glory and power.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What did Jesus say about the bread of life?",
    options: ["He gives eternal life", "He heals physically", "He teaches laws", "He judges"],
    correct: 0,
    reference: "John 6:35",
    fact: "Jesus promised that whoever eats his flesh and drinks his blood will have eternal life.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who did Jesus raise from the dead after four days?",
    options: ["Lazarus", "Jairus’ daughter", "The widow’s son", "Elijah"],
    correct: 0,
    reference: "John 11:43–44",
    fact: "Jesus showed his power over death by raising Lazarus.",
    category: "NEW TESTAMENT"
  },

  // Acts
  {
    question: "Who received the Holy Spirit at Pentecost?",
    options: ["The apostles", "120", "Paul", "3000"],
    correct: 1,
    reference: "Acts 1:15-16",
    fact: "the number of people was altogether about 120",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who preached in the synagogue of Antioch?",
    options: ["Paul", "Peter", "Barnabas", "John"],
    correct: 0,
    reference: "Acts 13:14–16",
    fact: "Paul taught about Jesus as the Messiah in Antioch.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who converted the Ethiopian eunuch?",
    options: ["Philip", "Paul", "Peter", "Barnabas"],
    correct: 0,
    reference: "Acts 8:36–38",
    fact: "Philip baptized the Ethiopian after explaining Isaiah’s prophecy.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who was Saul before he became Paul?",
    options: ["A persecutor of Christians", "A tax collector", "A soldier", "A priest"],
    correct: 0,
    reference: "Acts 9:1–22",
    fact: "Saul persecuted Christians before his conversion on the road to Damascus.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who fell asleep and fell from a window in Acts 20?",
    options: ["Eutychus", "Paul", "Silas", "Timothy"],
    correct: 0,
    reference: "Acts 20:9–10",
    fact: "Eutychus fell asleep during Paul’s long sermon and fell from the third story.",
    category: "NEW TESTAMENT"
  },

  // Romans
  {
    question: "What is the gift of God according to Romans 6:23?",
    options: ["Everlasting life", "Salvation by works", "Wealth", "Healing"],
    correct: 0,
    reference: "Romans 6:23",
    fact: "The gift of God is everlasting life through Jesus Christ.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who justifies the ungodly?",
    options: ["God", "Moses", "Paul", "Peter"],
    correct: 0,
    reference: "Romans 4:5",
    fact: "Jehovah declares the ungodly righteous through faith in Jesus.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who are heirs with Christ?",
    options: ["Those who love God", "The faithful", "The apostles", "The angels"],
    correct: 0,
    reference: "Romans 8:17",
    fact: "Christians who suffer with Christ are also heirs of God’s promises.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What can separate us from God’s love?",
    options: ["Nothing", "Suffering", "Persecution", "Trials"],
    correct: 0,
    reference: "Romans 8:38–39",
    fact: "Neither death, life, angels, nor powers can separate us from Jehovah’s love.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What does faith produce according to Romans 5:1–2?",
    options: ["Peace and hope", "Wealth", "Fame", "Knowledge"],
    correct: 0,
    reference: "Romans 5:1–2",
    fact: "Faith brings peace with God and hope in His promises.",
    category: "NEW TESTAMENT"
  },

  // 1 Corinthians
  {
    question: "Who is the head of the congreation?",
    options: ["Christ", "Peter", "Paul", "John"],
    correct: 0,
    reference: "1 Corinthians 11:3",
    fact: "Christ is the head of every Christian congregation.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What is the greatest virtue according to 1 Corinthians 13?",
    options: ["Love", "Faith", "Hope", "Wisdom"],
    correct: 0,
    reference: "1 Corinthians 13:13",
    fact: "Love is the greatest of all spiritual virtues.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What is the body of Christ compared to in 1 Corinthians 12?",
    options: ["One body with many parts", "A temple", "A kingdom", "A family"],
    correct: 0,
    reference: "1 Corinthians 12:12",
    fact: "The congregation functions like a body with many members working together.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who will raise the dead in glory?",
    options: ["Jesus", "Paul", "Peter", "John"],
    correct: 0,
    reference: "1 Corinthians 15:52–53",
    fact: "Jesus will transform the dead into an immortal, glorious form at his coming.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What gift is greater than prophecy or knowledge?",
    options: ["Love", "Faith", "Healing", "Wisdom"],
    correct: 0,
    reference: "1 Corinthians 13:1–2",
    fact: "Even if one has knowledge or prophecy, without love it profits nothing.",
    category: "NEW TESTAMENT"
  },

  // Revelation
    {
    question: "Who is declared worthy to receive glory and honor?",
    options: ["Jesus", "Peter", "Jehovah our God", "Moses"],
    correct: 2,
    reference: "Revelation 4:11",
    fact: "Jehovah our God is declared worthy to receive glory and honor.",
    category: "NEW TESTAMENT"
  },
  {
    question: "Who will judge the living and the dead?",
    options: ["Jesus Christ", "Peter", "Paul", "Michael"],
    correct: 0,
    reference: "Revelation 22:12–13",
    fact: "Jesus Christ will return to judge all people.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What is the reward for those who overcome?",
    options: ["Eternal life in paradise", "Wealth", "Power", "Fame"],
    correct: 0,
    reference: "Revelation 2:7",
    fact: "Those who overcome will eat from the tree of life and live forever.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What is the first thing John saw in Revelation?",
    options: ["A vision of Christ", "The throne of God", "Angels", "The 144,000"],
    correct: 0,
    reference: "Revelation 1:12–16",
    fact: "John saw Jesus Christ standing among seven golden lampstands.",
    category: "NEW TESTAMENT"
  },
  {
    question: "How many congreation  did Jesus address in Revelation 2–3?",
    options: ["7", "12", "10", "5"],
    correct: 0,
    reference: "Revelation 2:1–3:22",
    fact: "Jesus sent letters to seven congregations in Asia.",
    category: "NEW TESTAMENT"
  },

  /*-----------------------
         HARD
  ------------------------*/
  
  //======================================
  //OLD TESTAMENT HARD [HEBREW SCRIPTURES]
  //================================================

  {
    question: "How old was Methuselah when he died?",
    options: ["969", "930", "912", "950"],
    correct: 0,
    reference: "Genesis 5:27",
    fact: "Methuselah lived 969 years, making him the oldest person recorded in the Bible.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many cubits long, wide, and high was Noah's Ark?",
    options: ["300x50x30", "250x40x20", "200x40x30", "350x60x30"],
    correct: 0,
    reference: "Genesis 6:15",
    fact: "Noah's Ark was 300 cubits long, 50 cubits wide, and 30 cubits high.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who said, “Am I my brother’s keeper?”",
    options: ["Abel", "Cain", "Seth", "Noah"],
    correct: 1,
    reference: "Genesis 4:9",
    fact: "Cain said this after God asked him about Abel, whom he had killed.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What were the seven plagues of Egypt that came before the death of the firstborn?",
    options: ["Water to blood, frogs, lice, flies, livestock, boils, hail", "Frogs, lice, flies, livestock, boils, hail, locusts", "Water to blood, frogs, locusts, darkness, boils, hail, flies", "Water to blood, frogs, lice, locusts, livestock, hail, darkness"],
    correct: 0,
    reference: "Exodus 7–9",
    fact: "The first seven plagues were: water turning to blood, frogs, lice, flies, livestock disease, boils, and hail.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many spies did Moses send into Canaan?",
    options: ["10", "12", "14", "15"],
    correct: 1,
    reference: "Numbers 13:1–2",
    fact: "Moses sent twelve men, one from each tribe, to spy out the land of Canaan.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many stones did David take to fight Goliath?",
    options: ["3", "5", "7", "10"],
    correct: 1,
    reference: "1 Samuel 17:40",
    fact: "David selected five smooth stones from the brook before facing Goliath.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who interpreted Pharaoh's dreams?",
    options: ["Joseph", "Moses", "Aaron", "Daniel"],
    correct: 0,
    reference: "Genesis 41:14–16",
    fact: "Joseph interpreted Pharaoh's dreams and predicted seven years of plenty followed by seven years of famine.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many years did the Israelites wander in the wilderness?",
    options: ["20", "30", "40", "50"],
    correct: 2,
    reference: "Numbers 14:33–34",
    fact: "Because of their lack of faith, the Israelites wandered 40 years before entering Canaan.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "From which tribe was the first king of Israel, Saul?",
    options: ["Judah", "Benjamin", "Levi", "Ephraim"],
    correct: 1,
    reference: "1 Samuel 9:1–2",
    fact: "Saul was from the tribe of Benjamin.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many books are in the Old Testament?",
    options: ["35", "36", "39", "40"],
    correct: 2,
    reference: "NWT Old Testament",
    fact: "The Old Testament contains 39 books in the New World Translation.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many people were true worshippers of Jehovah when Elijah wanted to give up?",
    options: ["700", "7000", "77,000", "70,000"],
    correct: 1,
    reference: "1 Kings 19:18",
    fact: "Elijah was encouraged by God that 7,000 in Israel had not worshiped Baal.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who was the prophet that prophesied the fall of Nineveh?",
    options: ["Jonah", "Nahum", "Hosea", "Amos"],
    correct: 1,
    reference: "Nahum 1:1",
    fact: "Nahum delivered God's message about Nineveh's coming destruction.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who was the prophet that saw a vision of a valley of dry bones?",
    options: ["Ezekiel", "Isaiah", "Jeremiah", "Daniel"],
    correct: 0,
    reference: "Ezekiel 37:1–14",
    fact: "Ezekiel saw a vision where God caused dry bones to come to life, symbolizing Israel's restoration.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
{
  question: "What did God create on the fourth day of creation?",
  options: ["Sun, moon, and stars", "Land animals", "Birds", "Fish"],
  correct: 0,
  reference: "Genesis 1:14-19",
  fact: "On the fourth day, God created the sun to rule the day, the moon to rule the night, and the stars.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "How many prophetesses are  mentioned in the Bible?",
  options: ["3", "5", "7", "9"],
  correct: 1,
  reference: "Exodus 15:20; Judges 4:4; 2 Kings 22:14; Nehemiah 6:14; Luke 2:36",
  fact: "The Bible names five prophetesses: Miriam, Deborah, Huldah, Noadiah, and Anna.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was Jacob's 4th son?",
  options: ["Reuben", "Simeon", "Levi", "Judah"],
  correct: 3,
  reference: "Genesis 29:35; 30:1–5",
  fact: "Judah was Jacob's fourth son, born to Leah.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the first to know the meaning of Jehovah's name according to the Bible?",
  options: ["Moses", "Abraham", "Noah", "Adam"],
  correct: 0,
  reference: "Exodus 3:13-14",
  fact: "So God said to Moses: 'I Will Become What I Choose to Become.'",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "For how many pieces of silver was Joseph sold by his brothers to the merchants?",
  options: ["10", "20", "30", "40"],
  correct: 1,
  reference: "Genesis 37:28",
  fact: "Joseph’s brothers sold him to the Ishmaelites for 20 pieces of silver, leading to his journey into Egypt.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the last king of Judah before Babylon conquered Jerusalem?",
  options: ["Jehoiakim", "Hezekiah", "Zedekiah", "Manasseh"],
  correct: 2,
  reference: "2 Kings 25:7",
  fact: "Zedekiah was the last king of Judah before Jerusalem was destroyed by the Babylonians in 607 B.C.E.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "What was the name of the prophet from Judah disobeyed Jehovah and was killed by a lion on his way back.?",
  options: ["Elijah", "Amos", "Nahum", "None of the above"],
  correct: 3,
  reference: "1 Kings 13:20-24",
  fact: "The Bible never mentions his name; it only calls him 'the man of the true God from Judah.'",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
    question: "Who was the only woman to rule as queen over Judah?",
    options: ["Deborah", "Athaliah", "Jezebel", "Esther"],
    correct: 1,
    reference: "2 Kings 11:1-3",
    fact: "Athaliah seized power after her son Ahaziah died, making her the only woman to rule Judah.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Which prophet lay on his left side for 390 days and on his right side for 40 days to represent Israel’s sins?",
    options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    correct: 2,
    reference: "Ezekiel 4:4-6",
    fact: "Jehovah instructed Ezekiel to lie on each side to represent the years of Israel and Judah’s error.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Which judge of Israel made a rash vow that led to the sacrifice of his daughter?",
    options: ["Samson", "Jephthah", "Gideon", "Abimelech"],
    correct: 1,
    reference: "Judges 11:30-40",
    fact: "Jephthah vowed to offer up whatever came out of his house if Jehovah gave him victory, and it was his daughter.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who killed King Ahab’s seventy sons and put their heads in baskets at Jezreel?",
    options: ["Jehu", "Jehoiada", "Jehoiakim", "Hoshea"],
    correct: 0,
    reference: "2 Kings 10:6-7",
    fact: "Jehu carried out Jehovah’s judgment against Ahab’s house by ordering the execution of his 70 sons.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What was the name of the king who saw the hand writing on the wall?",
    options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
    correct: 1,
    reference: "Daniel 5:1, 22-28",
    fact: "Belshazzar saw the hand write a message of judgment on the wall during a feast.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What was the name of the prophet who confronted David about his sin with Bath-sheba?",
    options: ["Gad", "Samuel", "Nathan", "Elijah"],
    correct: 2,
    reference: "2 Samuel 12:1-7",
    fact: "Nathan boldly confronted David with a parable about a rich man and a poor man’s lamb, exposing his sin.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who fasted for 40 days and nights at Mount Horeb before receiving a vision of Jehovah?",
    options: ["Moses", "Elijah", "Elisha", "Isaiah"],
    correct: 1,
    reference: "1 Kings 19:8-12",
    fact: "Elijah traveled to Mount Horeb and fasted 40 days before Jehovah revealed Himself in a calm, low voice.",
    category: "OLD TESTAMENT",
    difficulty: "HARD"
  },
  {
  question: "Who was the youngest king in the bible?",
  options: ["Josiah", "Manasseh", "Jehoash", "Hezekiah"],
  correct: 2,
  reference: "2 Kings 11:21",
  fact: "Jehoash (also called Joash) became king at 7 years old, making him the youngest king recorded in the Bible.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who did Elisha raise from the dead?",
  options: ["The widow’s son at Zarephath", "The Shunammite woman’s son", "The widow’s son at Nain", "The centurion’s servant"],
  correct: 1,
  reference: "2 Kings 4:32-35",
  fact: "Elisha raised the Shunammite woman’s son at Shunem after praying and stretching himself over the child.",
  category: "OLD TESTAMENT",
  difficulty: "HARD"
},

//====================================
//NEW TESTAMENT HARD [GREEK SCRIPTURES]
//===============================================

{
  question: "Who was the second disciple called by Jesus?",
  options: ["Peter", "Andrew", "John", "Philip"],
  correct: 1,
  reference: "Matthew 10:2",
  fact: "Andrew, Simon Peter’s brother, was the second disciple to follow Jesus.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the last disciple chosen by Jesus among the twelve apostles?",
  options: ["Matthias", "Thomas", "Judas Iscariot", "Bartholomew"],
  correct: 2,
  reference: "Matthew 10:2-4; Luke 6:13-16",
  fact: "Judas Iscariot is always listed last among the twelve apostles and was the one who later betrayed Jesus.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
    question: "Who said, 'Truly this man was the Son of God' at Jesus' execution on the stake?",
    options: ["Centurion", "Peter", "Mary Magdalene", "John"],
    correct: 0,
    reference: "Mark 15:39",
    fact: "A Roman centurion recognized Jesus as the Son of God when He died on the stake.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who was the first Christian martyr?",
    options: ["Stephen", "James", "Peter", "Paul"],
    correct: 0,
    reference: "Acts 7:54–60",
    fact: "Stephen was stoned to death for his faith, becoming the first Christian martyr.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many people were on the road to Emmaus when Jesus joined them after His resurrection?",
    options: ["2", "3", "5", "7"],
    correct: 0,
    reference: "Luke 24:13–31",
    fact: "Two disciples were walking to Emmaus when Jesus appeared to them and explained the Scriptures.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who was the Pharisee that came to Jesus by night to inquire about the Kingdom of God?",
    options: ["Nicodemus", "Joseph of Arimathea", "Gamaliel", "Caiaphas"],
    correct: 0,
    reference: "John 3:1–21",
    fact: "Nicodemus visited Jesus at night because he was a respected Pharisee curious about His teachings.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many resurrections did Jesus perform during His ministry?",
    options: ["3", "2", "1", "4"],
    correct: 0,
    reference: "Luke 7:11–17; John 11:1–44; Matthew 9:18–26",
    fact: "Jesus raised at least three people: the widow's son at Nain, Jairus' daughter, and Lazarus.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How many people were baptized on the day of Pentecost?",
    options: ["3,000", "1,200", "5,000", "2,000"],
    correct: 0,
    reference: "Acts 2:41",
    fact: "After Peter's speech, about 3,000 people were baptized and became followers of Christ.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who said, 'Lord, show us the Father, and it is enough for us'?",
    options: ["Philip", "Thomas", "Peter", "John"],
    correct: 0,
    reference: "John 14:8",
    fact: "Philip requested Jesus to reveal the Father more clearly to the disciples.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who said, 'I am not worthy that you should enter under my roof'?",
    options: ["Centurion", "Peter", "John", "Matthew"],
    correct: 0,
    reference: "Matthew 8:8",
    fact: "A Roman centurion showed humility when asking Jesus to heal his servant.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "For how many days was Jesus seen by His disciples after His resurrection?",
    options: ["40", "30", "50", "20"],
    correct: 0,
    reference: "Acts 1:3",
    fact: "Jesus was seen by His disciples throughout 40 days, speaking about the Kingdom of God.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
},

  {
    question: "What did Jesus say about himself in relation to Abraham’s existence?",
    options: ["I am", "Before Abraham came into existence, I have been", "I existed after Abraham", "I am the Son of Abraham"],
    correct: 1,
    reference: "John 8:58",
    fact: "Jesus said, 'Before Abraham came into existence, I have been.'",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who is said to teach everyone as written in the prophets?",
    options: ["Jesus", "Moses", "Jehovah", "Peter"],
    correct: 2,
    reference: "John 6:45",
    fact: "Jehovah is the one who teaches everyone, fulfilling what the prophets wrote.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What did the king command to be done to those who did not want him to reign over them?",
    options: ["Exile them", "Bring them here and kill them before me", "Ignore them", "Imprison them"],
    correct: 1,
    reference: "Luke 19:27",
    fact: "The king commanded to bring them and kill them before him.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What document was nailed to the stake?",
    options: ["The law of Moses", "The certificate of debt", "The scroll of prophets", "The commandments"],
    correct: 1,
    reference: "Colossians 2:14",
    fact: "The certificate of debt (handwriting of requirements) that was against us was nailed to the stake.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What four things were Gentile Christians told to abstain from?",
    options: ["Blood, things strangled, sexual immorality, things polluted by idols", "Only blood, things strangled", "Idols, altars, temples, sacrifices", "Meat, wine, oil, grain"],
    correct: 0,
    reference: "Acts 15:20",
    fact: "Gentiles were instructed to abstain from blood, things strangled, sexual immorality, and things polluted by idols.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How did the women react after visiting Jesus’ tomb?",
    options: ["They rejoiced and told everyone", "They fled trembling and said nothing", "They prayed silently", "They waited for the apostles"],
    correct: 1,
    reference: "Mark 16:8",
    fact: "They fled trembling and overwhelmed with emotion, and they said nothing because they were afraid.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "What does Ephesians 2:8  say about how we have been saved?",
    options: ["Through works", "By God’s undeserved kindness through faith", "By following the law", "By baptism only"],
    correct: 1,
    reference: "Ephesians 2:8",
    fact: "We are saved by God’s undeserved kindness through faith; it is God’s gift.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "How did the little scroll taste and what happened after John swallowed it?",
    options: ["Bitter first, then sweet", "Sweet as honey but bitter in stomach", "Only sweet", "Only bitter"],
    correct: 1,
    reference: "Revelation 10:10",
    fact: "The little scroll tasted sweet as honey but became bitter in his stomach.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Why did Jesus not do many miracles in his hometown?",
    options: ["Because of their unbelief", "Because of lack of power", "Because it was a small town", "Because he was tired"],
    correct: 0,
    reference: "Mark 6:5",
    fact: "Jesus could do only a few miracles because of their unbelief.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "According to Acts 4:12 , by what name must we be saved?",
    options: ["Jesus Christ", "Jehovah", "Peter", "Paul"],
    correct: 0,
    reference: "Acts 4:12",
    fact: "Salvation is only through the name of Jesus Christ.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "In Revelation 1:8 , how does the Jehovah describe himself?",
    options: ["Alpha and Omega, beginning and end", "Mighty God, everlasting Father", "Lord of Hosts", "Prince of Peace"],
    correct: 0,
    reference: "Revelation 1:8",
    fact: "The Lord describes himself as 'The Alpha and the Omega, the beginning and the end.'",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Revelation 19:16 describes a name on Jesus’ robe and thigh. What is this name?",
    options: ["King of kings and Lord of lords", "Prince of Peace", "Son of God", "Messiah"],
    correct: 0,
    reference: "Revelation 19:16",
    fact: "The name on Jesus’ robe and thigh is 'King of kings and Lord of lords.'",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
{
  question: "Who was the high priest that questioned Jesus during his trial?",
  options: ["Annas", "Caiaphas", "Pilate", "Herod"],
  correct: 1,
  reference: "Matthew 26:57",
  fact: "Caiaphas was the high priest who led the questioning of Jesus before the Sanhedrin.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
    question: "Which woman was the first to see Jesus after his resurrection?",
    options: ["Martha", "Mary Magdalene", "Salome", "Joanna"],
    correct: 1,
    reference: "John 20:14-16",
    fact: "Mary Magdalene was the first to see Jesus alive after his resurrection near the tomb.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Which couple died for lying to the apostles about the price of their land?",
    options: ["Priscilla and Aquila", "Ananias and Sapphira", "Zechariah and Elizabeth", "None of the above"],
    correct: 1,
    reference: "Acts 5:1-10",
    fact: "Ananias and Sapphira lied about the proceeds from their land sale and were struck dead.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
  },
  {
    question: "Who carried Jesus’ torture stake when he could no longer bear it?",
    options: ["Peter", "John", "Simon of Cyrene", "Joseph of Arimathea"],
    correct: 2,
    reference: "Matthew 27:32",
    fact: "Simon of Cyrene was compelled by Roman soldiers to carry Jesus’ torture stake.",
    category: "NEW TESTAMENT",
    difficulty: "HARD"
},
{
  question: "Who climbed a sycamore tree to see Jesus as he passed by?",
  options: ["Nicodemus", "Zacchaeus", "Caiaphas", "Joseph of Arimathea"],
  correct: 1,
  reference: "Luke 19:1-4",
  fact: "Zacchaeus, a wealthy tax collector, climbed the tree because he was short and couldn’t see over the crowd.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Whose shadow was said to heal the sick when it passed over them?",
  options: ["John", "Peter", "Paul", "Stephen"],
  correct: 1,
  reference: "Acts 5:15",
  fact: "People carried the sick into the streets so that Peter’s shadow might fall on them and heal them.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Which sorcerer tried to buy the power of the holy spirit with money?",
  options: ["Elymas", "Simon Magus", "Bar-Jesus", "Demetrius"],
  correct: 1,
  reference: "Acts 8:18-20",
  fact: "Simon Magus offered the apostles money to give him the ability to impart holy spirit.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Paul was shipwrecked on an island where he was bitten by a viper but suffered no harm. What was the name of the island?",
  options: ["Patmos", "Cyprus", "Malta", "Crete"],
  correct: 2,
  reference: "Acts 28:1-6",
  fact: "Paul was shipwrecked on Malta, where the islanders showed unusual kindness and witnessed the miracle.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "During Paul’s trial, which Roman governor trembled when Paul spoke about righteousness, self-control, and judgment?",
  options: ["Festus", "Felix", "Agrippa", "Gallio"],
  correct: 1,
  reference: "Acts 24:25",
  fact: "Governor Felix trembled at Paul’s words but postponed making a decision about him.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "In Revelation, how many seals were on the scroll that no one could open except the Lamb?",
  options: ["Four", "Seven", "Twelve", "Ten"],
  correct: 1,
  reference: "Revelation 5:1-5",
  fact: "Only Jesus, the Lamb, was found worthy to open the seven seals of the scroll.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the young man that accompanied Paul and Barnabas but abandoned them on their first missionary journey?",
  options: ["Timothy", "John Mark", "Silas", "Tychicus"],
  correct: 1,
  reference: "Acts 13:13; 15:37-38",
  fact: "John Mark abandoned Paul and Barnabas, causing a later dispute between the two apostles.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "In Acts, who was struck blind for opposing Paul and Barnabas?",
  options: ["Ananias", "Elymas", "Simon Magus", "Demetrius"],
  correct: 1,
  reference: "Acts 13:8-11",
  fact: "Elymas the sorcerer was struck blind for trying to turn the proconsul away from the faith.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Which apostle was exiled to the island of Patmos?",
  options: ["Peter", "Paul", "John", "James"],
  correct: 2,
  reference: "Revelation 1:9",
  fact: "The apostle John was exiled to Patmos, where he received the visions recorded in Revelation.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the first Gentile household to receive the holy spirit?",
  options: ["Cornelius", "Lydia", "Sergius Paulus", "The Philippian Jailer"],
  correct: 0,
  reference: "Acts 10:44-48",
  fact: "Cornelius, a Roman centurion, and his household were the first Gentiles to receive the holy spirit.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Which king had John the Baptist beheaded?",
  options: ["Herod Antipas", "Herod the Great", "Pontius Pilate", "Caesar Tiberius"],
  correct: 0,
  reference: "Mark 6:16-28",
  fact: "Herod Antipas ordered John the Baptist beheaded after being manipulated by Herodias’ daughter.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Which Pharisee defended the apostles before the Sanhedrin, suggesting their work might be from God?",
  options: ["Nicodemus", "Gamaliel", "Caiaphas", "Annas"],
  correct: 1,
  reference: "Acts 5:34-39",
  fact: "Gamaliel, a respected Pharisee and teacher of the Law, advised the Sanhedrin to be cautious in opposing the apostles.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "In which city were Jesus’ followers first called 'Christians'?",
  options: ["Jerusalem", "Corinth", "Antioch", "Ephesus"],
  correct: 2,
  reference: "Acts 11:26",
  fact: "It was in Antioch that the disciples were first given the name 'Christians.'",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Who was the first convert baptized in Europe?",
  options: ["Lydia", "Phoebe", "Priscilla", "Dorcas"],
  correct: 0,
  reference: "Acts 16:14-15",
  fact: "Lydia, a seller of purple cloth from Thyatira, became the first recorded convert in Europe.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "When Paul appealed his case, to which Roman Caesar did he appeal?",
  options: ["Augustus", "Nero", "Tiberius", "Claudius"],
  correct: 1,
  reference: "Acts 25:11-12",
  fact: "Paul appealed to Caesar Nero during his trial under Governor Festus.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "Which disciple did Jesus call 'a true Israelite, in whom there is no deceit'?",
  options: ["Bartholomew", "Nathanael", "Philip", "Thomas"],
  correct: 1,
  reference: "John 1:47",
  fact: "Jesus gave this compliment to Nathanael when he approached Him after Philip’s invitation.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},
{
  question: "What was the name of the young disciple whom Paul circumcised because of the Jews in those regions?",
  options: ["Silas", "Timothy", "Titus", "Mark"],
  correct: 1,
  reference: "Acts 16:1-3",
  fact: "Paul circumcised Timothy, whose mother was Jewish and father was Greek, to avoid hindrance among Jews.",
  category: "NEW TESTAMENT",
  difficulty: "HARD"
},

,
  {
  "question": "What did the Isaac do when he was the Angel",
  "options": [
    "Made Eba for him",
    "On Gen for him",
    "Took him to kitchen 54",
    "Fought with him"
  ],
  "correct": 3,
  "reference": "Genesis ",
  "fact": "He wanted a blessing for his potatoes to grow on Friday ",
  "category": "Old Testament"
}
]