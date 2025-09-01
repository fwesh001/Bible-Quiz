// Bible Quiz Questions
// Add more objects to the array to extend the quiz.
// Fields: question, options[4], correct (index), reference, fact, category

const bibleQuestions = [
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
    question: "What did Jehovah use to part the Red Sea?",
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
    question: "What was the purpose of the Day of Atonement?",
    options: ["To celebrate the harvest", "To confess sins", "To remember the Exodus", "To honor the priesthood"],
    correct: 1,
    reference: "Leviticus 16:29–34",
    fact: "The Day of Atonement was established for making atonement for the sins of the people.",
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
    question: "Which king rebuilt the temple in Jerusalem?",
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

//NEW TESTAMENT

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
    question: "Who was Jesus’ first disciple called by John the Baptist?",
    options: ["Andrew", "Peter", "Philip", "Nathaniel"],
    correct: 0,
    reference: "John 1:40–41",
    fact: "Andrew, Simon Peter’s brother, followed Jesus after John’s testimony.",
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
    options: ["The apostles", "Peter", "Paul", "John"],
    correct: 0,
    reference: "Acts 2:1–4",
    fact: "The apostles were filled with Jehovah’s spirit and spoke in tongues.",
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
    question: "What city is described as coming down from heaven?",
    options: ["New Jerusalem", "Bethlehem", "Nazareth", "Capernaum"],
    correct: 0,
    reference: "Revelation 21:2",
    fact: "The holy city of God will descend from heaven, adorned like a bride.",
    category: "NEW TESTAMENT"
  },
  {
    question: "What is the first thing John saw in Revelation?",
    options: ["A vision of Christ", "The throne of God", "Angels", "The seven churches"],
    correct: 0,
    reference: "Revelation 1:12–16",
    fact: "John saw Christ standing among seven golden lampstands.",
    category: "NEW TESTAMENT"
  },
  {
    question: "How many churches did Jesus address in Revelation 2–3?",
    options: ["7", "12", "10", "5"],
    correct: 0,
    reference: "Revelation 2:1–3:22",
    fact: "Jesus sent letters to seven congregations in Asia.",
    category: "NEW TESTAMENT"
  }
];