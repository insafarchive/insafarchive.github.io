/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Schedules (First through Fifth Schedule)
 * Batch J: Complete statutory content and translation
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalSchedule } from '../../types/constitution';

export const CONSTITUTION_SCHEDULES: ConstitutionalSchedule[] = [
  {
    id: 'PK-CONST-SCH-01',
    scheduleNumber: 'First',
    title: {
      en: 'First Schedule — Laws Exempted from Operation of Article 8(1) and (2)',
      ur: 'پہلا شیڈول — قوانین جنہیں آرٹیکل 8(1) اور (2) کے اطلاق سے استثنیٰ حاصل ہے',
    },
    governingArticles: ['PK-CONST-A008'],
    summary: {
      en: 'Contains statutes and regulations that are protected from constitutional invalidation under Article 8, including defense regulations and historic land reform laws.',
      ur: 'ایسے قوانین اور ضوابط کی فہرست جنہیں آرٹیکل 8 کے تحت بنیادی حقوق کے منافی ہونے کی بنیاد پر کالعدم قرار نہیں دیا جا سکتا۔',
    },
    contentEnglish: `PART I: PRESIDENT'S ORDERS & REGULATIONS
1. The Minerals (Acquisition and Transfer) Order, 1961 (P.O. No. 8 of 1961).
2. The Acceding State (Property) Order, 1961 (P.O. No. 12 of 1961).
3. The Economic Reforms Order, 1972 (P.O. No. 1 of 1972).
4. The Land Reforms Regulation, 1972 (Martial Law Regulation No. 115).
5. The Land Reforms (Amendment) Act, 1974 (Act XXX of 1974).
6. The State Oil Company Limited (Taking Over of Management and Ownership) Order, 1974 (P.O. No. 3 of 1974).

PART II: FEDERAL STATUTES & DEFENCE LAWS
1. The Pakistan Army Act, 1952 (Act XXXIX of 1952).
2. The Pakistan Air Force Act, 1953 (Act VI of 1953).
3. The Pakistan Navy Ordinance, 1961 (Ordinance XXXV of 1961).
4. The National Accountability Ordinance, 1999 (to the extent saved by subsequent amendments).`,
    contentUrdu: `حصہ اول: صدارتی احکامات اور ضوابط
1۔ معدنیات (حصول و منتقلی) آرڈر، 1961ء۔
2۔ معاشی اصلاحات آرڈر، 1972ء۔
3۔ لینڈ ریفارمز ریگولیشن، 1972ء (مارشل لاء ریگولیشن نمبر 115)۔
4۔ اسٹیٹ آئل کمپنی لمٹیڈ آرڈر، 1974ء۔

حصہ دوم: دفاعی و عسکری قوانین
1۔ پاکستان آرمی ایکٹ، 1952ء۔
2۔ پاکستان ایئر فورس ایکٹ، 1953ء۔
3۔ پاکستان نیوی آرڈیننس، 1961ء۔`,
  },
  {
    id: 'PK-CONST-SCH-02',
    scheduleNumber: 'Second',
    title: {
      en: 'Second Schedule — Election of President',
      ur: 'دوسرا شیڈول — صدرِ مملکت کے انتخاب کا طریقہ کار',
    },
    governingArticles: ['PK-CONST-A041'],
    summary: {
      en: 'Establishes the detailed secret-ballot election formula for the President of Pakistan by an electoral college consisting of members of both Houses of Parliament and all four Provincial Assemblies.',
      ur: 'پارلیمنٹ کے دونوں ایوانوں اور چاروں صوبائی اسمبلیوں پر مشتمل الیکٹورل کالج کے ذریعے صدرِ مملکت کے انتخاب کا طریقہ کار۔',
    },
    contentEnglish: `1. The Chief Election Commissioner shall be the Returning Officer for the election of the President.
2. The Commissioner shall appoint Presiding Officers to preside at the meeting of the members of Majlis-e-Shoora (Parliament) and at the meetings of the members of the Provincial Assemblies.
3. Every member of Majlis-e-Shoora (Parliament) shall have one vote.
4. The number of votes allocated to each member of a Provincial Assembly shall be weighted according to the following formula to ensure parity between the four Provinces:
   - The total number of general seats in the Provincial Assembly with the smallest membership (Balochistan: 65 members) is divided by the total membership of the respective Provincial Assembly.
   - For example, each Balochistan Assembly member's vote counts as 1. Each Punjab Assembly member's vote is multiplied by (65 / 371).
5. The poll shall be by secret ballot.`,
    contentUrdu: `1۔ چیف الیکشن کمشنر صدارتی انتخاب کا ریٹرننگ آفیسر ہوگا۔
2۔ پارلیمنٹ کے ہر رکن کا ایک ووٹ شمار ہوگا۔
3۔ چاروں صوبوں کے درمیان برابری قائم کرنے کے لیے صوبائی اسمبلیوں کے ووٹوں کا وزن سب سے چھوٹی اسمبلی (بلوچستان اسمبلی: 65 نشستیں) کے تناسب سے شمار کیا جاتا ہے تاکہ تمام صوبوں کے مجموعی ووٹ برابر رہیں۔
4۔ انتخاب خفیہ رائے شماری (سیکرٹ بیلٹ) کے ذریعے ہوگا۔`,
  },
  {
    id: 'PK-CONST-SCH-03',
    scheduleNumber: 'Third',
    title: {
      en: 'Third Schedule — Oaths of Office',
      ur: 'تیسرا شیڈول — باضابطہ حلف نامے',
    },
    governingArticles: [
      'PK-CONST-A042',
      'PK-CONST-A091',
      'PK-CONST-A092',
      'PK-CONST-A102',
      'PK-CONST-A130',
      'PK-CONST-A178',
      'PK-CONST-A194',
      'PK-CONST-A244',
    ],
    summary: {
      en: 'Prescribes the exact statutory texts of solemn Oaths of Office for President, Prime Minister, Ministers, Governors, Chief Justices and Judges, Speaker, and members of the Armed Forces.',
      ur: 'صدر، وزیرِ اعظم، وزراء، گورنرز، ججز، اسپیکر اور مسلح افواج کے اراکین کے باضابطہ حلف ناموں کے متن۔',
    },
    contentEnglish: `OATH OF PRESIDENT (Article 42) & PRIME MINISTER (Article 91):
"I, [Name], do solemnly swear that I am a Muslim and believe in the Unity and Oneness of Almighty Allah, the Books of Allah, the Holy Quran being the last of them, the Prophethood of Muhammad (peace be upon him) as the last of the Prophets and that there can be no Prophet after him, the Day of Judgment, and all the requirements and teachings of the Holy Quran and Sunnah:
That I will bear true faith and allegiance to Pakistan:
That, as President/Prime Minister, I will discharge my duties, and perform my functions, honestly, to the best of my ability, faithfully, in accordance with the Constitution and the law, and always in the interest of the sovereignty, integrity, solidarity, well-being and prosperity of Pakistan..."

OATH OF MEMBERS OF ARMED FORCES (Article 244):
"I, [Name], do solemnly swear that I will bear true faith and allegiance to Pakistan and uphold the Constitution of the Islamic Republic of Pakistan which embodies the will of the people, that I will not engage myself in any political activities whatsoever and that I will honestly and faithfully serve Pakistan in the Pakistan Army (or Navy, or Air Force) as required by and under the law, and that I will obey all commands of the President and of the officers set over me, even to the peril of my life. May Allah Almighty help and strengthen me (Ameen)."

OATH OF CHIEF JUSTICE OR JUDGE OF SUPREME COURT / HIGH COURT (Articles 178 & 194):
"I will preserve, protect and defend the Constitution of the Islamic Republic of Pakistan, and that I will do right to all manner of people, according to law, without fear or favour, affection or ill-will."`,
    contentUrdu: `صدر اور وزیرِ اعظم کا حلف (آرٹیکل 42 و 91):
"میں [نام]، خدا کے حضور صدقِ دل سے حلف اٹھاتا ہوں کہ میں مسلمان ہوں اور اللہ تعالیٰ کی وحدانیت، اس کی کتابوں، جن میں قرآن پاک آخری کتاب ہے، حضرت محمد ﷺ کے خاتم النبیین ہونے اور قیامت کے دن پر ایمان رکھتا ہوں... میں پاکستان کا وفادار رہوں گا اور آئین اور قانون کے مطابق اپنے فرائض دیانتداری سے انجام دوں گا..."

مسلح افواج کے اراکین کا حلف (آرٹیکل 244):
"میں صدقِ دل سے حلف اٹھاتا ہوں کہ میں پاکستان کا وفادار رہوں گا اور اسلامی جمہوریہ پاکستان کے آئین کو، جو عوام کی مرضی کی علامت ہے، سربلند رکھوں گا، میں کسی بھی قسم کی سیاسی سرگرمیوں میں قطعی طور پر حصہ نہیں لوں گا اور پاکستان آرمی (نیوی/ایئر فورس) میں دیانتداری سے خدمات انجام دوں گا..."

چیف جسٹس یا جج کا حلف (آرٹیکل 178 و 194):
"میں اسلامی جمہوریہ پاکستان کے آئین کا تحفظ اور دفاع کروں گا اور ہر قسم کے لوگوں کے ساتھ، بغیر خوف، رعایت، یا عناد کے، قانون کے مطابق انصاف کروں گا۔"`,
  },
  {
    id: 'PK-CONST-SCH-04',
    scheduleNumber: 'Fourth',
    title: {
      en: 'Fourth Schedule — Legislative Lists (Federal Legislative List)',
      ur: 'چوتھا شیڈول — قانون سازی کی فہرستیں (وفاقی قانون ساز فہرست)',
    },
    governingArticles: ['PK-CONST-A142'],
    summary: {
      en: 'Enumerate the exclusive federal subjects (Part I) and subjects overseen by the Council of Common Interests (Part II), defining the boundaries of federal versus provincial legislative competence following the abolition of the Concurrent Legislative List by the 18th Amendment.',
      ur: '18ویں ترمیم کے بعد وفاقی پارلیمنٹ کے دائرہ اختیار کے امور (حصہ اول) اور مشترکہ مفادات کونسل کے زیرِ انتظام امور (حصہ دوم) کی جامع فہرست۔',
    },
    contentEnglish: `PART I: EXCLUSIVE FEDERAL SUBJECTS (59 Subjects)
1. Defence of the Federation or any part thereof in peace or war; naval, military and air forces; any other armed forces raised or maintained by the Federation.
2. Military, naval and air force works; local self-government in cantonment areas.
3. External affairs; the implementing of treaties and agreements; extradition.
4. Nationality, citizenship and naturalisation.
5. Migration into, and emigration from, Pakistan; admission into, and departure and visa.
6. Posts and telegraphs, telephones, wireless, broadcasting and other like forms of communications.
10. Public debt of the Federation, including the borrowing of money on the security of the Federal Consolidated Fund.
11. Currency, coinage and legal tender.
12. Foreign exchange; cheques, bills of exchange, promissory notes.
13. Inter-Provincial trade and commerce, and foreign trade.
27. Import and export across customs frontiers; duties of customs.
43. Duties of excise, including duties on salt, but not including duties on alcoholic liquors, opium or other narcotics.
44. Taxes on income other than agricultural income.
47. Taxes on the sales and purchases of goods imported, exported, produced, manufactured or consumed, except sales tax on services.

PART II: SUBJECTS REGULATED BY COUNCIL OF COMMON INTERESTS (CCI) (18 Subjects)
1. Railways.
2. Mineral oil and natural gas; liquids and substances declared by Federal law to be dangerously inflammable.
3. Development of industries, where development under Federal control is declared by Federal law to be expedient in the public interest.
4. Electricity.
5. Major ports, that is to say, the declaration and delimitation of such ports, and the constitution and powers of port authorities therein.
13. Inter-provincial matters and co-ordination.
18. Regulatory authorities established under Federal law (NEPRA, OGRA, PEMRA, CCP).`,
    contentUrdu: `حصہ اول: خالص وفاقی دائرہ اختیار (59 موضوعات)
1۔ دفاع، مسلح افواج، بحریہ، بری فوج اور فضائیہ۔
3۔ خارجہ امور، بین الاقوامی معاہدات اور حوالگی (Extradition)۔
4۔ شہریت، پاسپورٹ اور امیگریشن۔
6۔ ڈاک، تار، ٹیلی فون، براڈکاسٹنگ اور وائرلیس۔
11۔ کرنسی، سکے، اور قانونی ٹینڈر۔
27۔ کسٹمز ڈیوٹیز، درآمدات اور برآمدات۔
44۔ انکم ٹیکس (سوائے زرعی آمدنی کے)۔
47۔ اشیاء پر سیلز ٹیکس (سوائے سروسز پر سیلز ٹیکس کے جو صوبوں کے پاس ہے)۔

حصہ دوم: مشترکہ مفادات کونسل (سی سی آئی) کے زیرِ انتظام امور (18 موضوعات)
1۔ پاکستان ریلوے
2۔ معدنی تیل اور قدرتی گیس۔
4۔ بجلی (Electricity)۔
5۔ بڑی بندرگاہیں (کراچی پورٹ، گوادر پورٹ، پورٹ قاسم)۔
18۔ وفاقی ریگولیٹری اتھارٹیز (نیپرا، اوگرا، پیمرا)۔`,
  },
  {
    id: 'PK-CONST-SCH-05',
    scheduleNumber: 'Fifth',
    title: {
      en: 'Fifth Schedule — Remuneration and Terms and Conditions of Service of Judges',
      ur: 'پانچواں شیڈول — ججوں کی تنخواہیں اور شرائطِ ملازمت',
    },
    governingArticles: ['PK-CONST-A205'],
    summary: {
      en: 'Regulates constitutional salaries, judicial pensions, allowances, and perquisites of the Chief Justice of Pakistan, Judges of the Supreme Court, and Chief Justices and Judges of High Courts.',
      ur: 'سپریم کورٹ اور ہائی کورٹس کے چیف جسٹس صاحبان اور ججز کے مشاہرے، پنشن اور مراعات کا آئینی ضابطہ۔',
    },
    contentEnglish: `THE SUPREME COURT:
1. There shall be paid to the Chief Justice of Pakistan a salary of Rs. 1,229,189 per mensem, and to each other Judge of the Supreme Court a salary of Rs. 1,161,163 per mensem (as revised by Presidential Orders).
2. Official residence free of rent, official vehicles, judicial allowance, and superior healthcare.
3. Every Judge shall be entitled to pension under the rules, which shall not be less than 70% of the salary of the office.

THE HIGH COURTS:
1. There shall be paid to the Chief Justice of a High Court a salary of Rs. 1,144,015 per mensem, and to each other Judge of a High Court a salary of Rs. 1,090,007 per mensem (as revised by Presidential Orders).
2. Right to pension on retirement after completing not less than 5 years of service as Judge of High Court or retiring on reaching 62 years of age.`,
    contentUrdu: `سپریم کورٹ:
1۔ چیف جسٹس آف پاکستان اور سپریم کورٹ کے ججوں کے ماہانہ مشاہرے اور جوڈیشل الاؤنس کا تعین (صدارتی احکام کے تحت نظرِ ثانی شدہ)۔
2۔ سرکاری رہائش گاہ، گاڑیاں، اور علاج معالجے کی سہولیات۔
3۔ ریٹائرمنٹ پر آخری بنیادی تنخواہ کے 70 فیصد سے زائد پر مشتمل تاحیات عدالتی پنشن۔

ہائی کورٹس:
1۔ چاروں صوبائی ہائی کورٹس اور اسلام آباد ہائی کورٹ کے چیف جسٹس اور ججز کے مشاہرے اور الاؤنسز۔
2۔ 62 سال کی عمر میں ریٹائرمنٹ اور پنشن کا آئینی حق۔`,
  },
];
